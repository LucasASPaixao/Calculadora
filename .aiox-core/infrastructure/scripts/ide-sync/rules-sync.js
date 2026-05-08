/**
 * Rules sync — distribute canonical rules from .aiox-core/rules to IDE-specific paths
 */

const fs = require('fs-extra');
const path = require('path');
const yaml = require('js-yaml');

/**
 * Per-rule activation for Cursor (.mdc) and GitHub Copilot (.instructions.md).
 * Rules without an entry default to always-on (alwaysApply: true / applyTo: "**").
 */
const RULE_CONFIGS = {
  'agent-authority': { alwaysApply: true },
  'agent-handoff': { alwaysApply: true },
  'agent-signature': { alwaysApply: true },
  'coderabbit-integration': { alwaysApply: true },
  'ids-principles': { alwaysApply: true },
  'no-any-typescript': { alwaysApply: true },
  'story-lifecycle': { alwaysApply: true },
  'workflow-execution': { alwaysApply: true },
  'git-commit-ptbr': {
    alwaysApply: false,
    globs: [
      '**/*.{ts,tsx,js,jsx,vue,py,go,java,css,scss,html,md,json,yaml,yml}',
    ],
  },
  'mcp-usage': {
    alwaysApply: false,
    globs: ['.mcp/**', '.aiox-core/infrastructure/**', '**/mcp*.{json,yaml,yml}'],
  },
};

/**
 * @param {string} ruleBase
 * @returns {{ alwaysApply: boolean, globs?: string[] }}
 */
function getRuleConfig(ruleBase) {
  return RULE_CONFIGS[ruleBase] ?? { alwaysApply: true };
}

/**
 * Frontmatter for Cursor .mdc rules
 * @param {string} ruleBase
 * @returns {string}
 */
function buildCursorMdcFrontmatter(ruleBase) {
  const cfg = getRuleConfig(ruleBase);
  if (cfg.alwaysApply) {
    return '---\nalwaysApply: true\n---\n\n';
  }
  const header = { alwaysApply: false, globs: cfg.globs ?? [] };
  return `---\n${yaml.dump(header, { lineWidth: -1 }).trim()}\n---\n\n`;
}

/**
 * Frontmatter for GitHub Copilot .instructions.md
 * @param {string} ruleBase
 * @returns {string}
 */
function buildGithubInstructionsFrontmatter(ruleBase) {
  const cfg = getRuleConfig(ruleBase);
  if (cfg.alwaysApply) {
    return '---\napplyTo: "**"\n---\n\n';
  }
  const applyTo = cfg.globs ?? ['**'];
  const header = { applyTo };
  return `---\n${yaml.dump(header, { lineWidth: -1 }).trim()}\n---\n\n`;
}

/**
 * Read all neutral rule files from the canonical rules directory
 * @param {string} rulesDir - Absolute path to .aiox-core/rules
 * @returns {Array<{ base: string, body: string }>}
 */
function parseAllRules(rulesDir) {
  const rules = [];
  if (!fs.existsSync(rulesDir)) {
    return rules;
  }
  for (const file of fs.readdirSync(rulesDir)) {
    if (!file.endsWith('.md')) continue;
    const base = path.basename(file, '.md');
    const body = fs.readFileSync(path.join(rulesDir, file), 'utf8');
    rules.push({ base, body });
  }
  return rules.sort((a, b) => a.base.localeCompare(b.base));
}

/**
 * Build output filename and content for a rule in a given IDE format
 * @param {{ base: string, body: string }} rule
 * @param {string} rulesFormat - cursor-mdc | plain-md | github-instructions
 * @returns {{ filename: string, content: string }}
 */
function buildRuleOutput(rule, rulesFormat) {
  const body = rule.body.replace(/\s*$/, '') + '\n';
  switch (rulesFormat) {
    case 'cursor-mdc':
      return {
        filename: `${rule.base}.mdc`,
        content: buildCursorMdcFrontmatter(rule.base) + body,
      };
    case 'github-instructions':
      return {
        filename: `${rule.base}.instructions.md`,
        content: buildGithubInstructionsFrontmatter(rule.base) + body,
      };
    case 'plain-md':
    default:
      return {
        filename: `${rule.base}.md`,
        content: body,
      };
  }
}

/**
 * Sync canonical rules to one IDE target directory
 * @param {Array} rules - Parsed rules from parseAllRules
 * @param {string} projectRoot
 * @param {object} ideConfig - Target config (must include rulesPath, rulesFormat when rules sync enabled)
 * @param {object} options - { dryRun }
 * @returns {{ files: Array, errors: Array }}
 */
function syncRulesToTarget(rules, projectRoot, ideConfig, options) {
  const result = { files: [], errors: [] };
  if (!ideConfig.rulesPath || !ideConfig.rulesFormat) {
    return result;
  }
  const targetDir = path.join(projectRoot, ideConfig.rulesPath);
  if (!options.dryRun) {
    fs.ensureDirSync(targetDir);
  }
  for (const rule of rules) {
    try {
      const { filename, content } = buildRuleOutput(rule, ideConfig.rulesFormat);
      const targetPath = path.join(targetDir, filename);
      if (!options.dryRun) {
        fs.writeFileSync(targetPath, content, 'utf8');
      }
      result.files.push({ filename, path: targetPath });
    } catch (err) {
      result.errors.push({ rule: rule.base, error: err.message });
    }
  }
  return result;
}

/**
 * Build expected rule files for validation (same transforms as sync)
 * @param {Array} rules
 * @param {object} ideConfig
 * @returns {Array<{ filename: string, content: string }>}
 */
function buildExpectedRuleFiles(rules, ideConfig) {
  if (!ideConfig.rulesPath || !ideConfig.rulesFormat) {
    return [];
  }
  const expected = [];
  for (const rule of rules) {
    const { filename, content } = buildRuleOutput(rule, ideConfig.rulesFormat);
    expected.push({ filename, content });
  }
  return expected;
}

/**
 * Parse description from SKILL.md frontmatter (first YAML block)
 * @param {string} skillMd - Full SKILL.md content
 * @returns {{ description: string, bodyWithoutFrontmatter: string }}
 */
function parseSkillMdForPrompt(skillMd) {
  const m = skillMd.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) {
    return { description: '', bodyWithoutFrontmatter: skillMd };
  }
  let description = '';
  try {
    const meta = yaml.load(m[1]);
    if (meta && typeof meta.description === 'string') {
      description = meta.description;
    }
  } catch (_e) {
    /* ignore */
  }
  return { description, bodyWithoutFrontmatter: m[2] };
}

/**
 * Build GitHub Copilot .prompt.md content from a SKILL.md file
 * @param {string} skillName - Folder name (e.g. architect-first)
 * @param {string} skillMd - Full SKILL.md content
 * @returns {string}
 */
function buildGithubPromptFile(skillName, skillMd) {
  const { description, bodyWithoutFrontmatter } = parseSkillMdForPrompt(skillMd);
  const header = `---\nmode: agent\ndescription: ${description}\n---\n\n`;
  return header + bodyWithoutFrontmatter.replace(/^\s*/, '');
}

module.exports = {
  RULE_CONFIGS,
  getRuleConfig,
  parseAllRules,
  buildRuleOutput,
  syncRulesToTarget,
  buildExpectedRuleFiles,
  parseSkillMdForPrompt,
  buildGithubPromptFile,
};
