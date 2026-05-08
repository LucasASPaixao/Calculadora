/**
 * Doctor Check: Rules Files
 *
 * Validates canonical governance rules in `.aiox-core/rules/` and that synced
 * copies exist under `.claude/rules/` after `npm run sync:ide`.
 *
 * @module aiox-core/doctor/checks/rules-files
 * @story INS-4.1
 */

const path = require('path');
const fs = require('fs');

const name = 'rules-files';

/** Canonical neutral rules (IDE-agnostic source under .aiox-core/rules/) */
const CANONICAL_RULES = [
  'agent-authority.md',
  'agent-handoff.md',
  'agent-signature.md',
  'coderabbit-integration.md',
  'git-commit-ptbr.md',
  'ids-principles.md',
  'mcp-usage.md',
  'no-any-typescript.md',
  'story-lifecycle.md',
  'workflow-execution.md',
];

async function run(context) {
  const canonicalDir = path.join(context.projectRoot, '.aiox-core', 'rules');
  const claudeRulesDir = path.join(context.projectRoot, '.claude', 'rules');

  if (!fs.existsSync(canonicalDir)) {
    return {
      check: name,
      status: 'FAIL',
      message: `Canonical rules directory missing (expected ${CANONICAL_RULES.length} files under .aiox-core/rules/)`,
      fixCommand: 'npm run sync:ide',
    };
  }

  const missingCanonical = CANONICAL_RULES.filter(
    (file) => !fs.existsSync(path.join(canonicalDir, file)),
  );

  if (missingCanonical.length > 0) {
    return {
      check: name,
      status: 'FAIL',
      message: `Missing ${missingCanonical.length} canonical rule(s): ${missingCanonical.join(', ')}`,
      fixCommand: 'npm run sync:ide',
    };
  }

  if (!fs.existsSync(claudeRulesDir)) {
    return {
      check: name,
      status: 'WARN',
      message: 'All canonical rules present; .claude/rules/ not found (run sync for IDE copies)',
      fixCommand: 'npm run sync:ide',
    };
  }

  const missingClaude = CANONICAL_RULES.filter(
    (file) => !fs.existsSync(path.join(claudeRulesDir, file)),
  );

  if (missingClaude.length > 0) {
    return {
      check: name,
      status: 'WARN',
      message: `Canonical OK; ${missingClaude.length} rule(s) missing from .claude/rules/ after sync: ${missingClaude.join(', ')}`,
      fixCommand: 'npm run sync:ide',
    };
  }

  return {
    check: name,
    status: 'PASS',
    message: `All ${CANONICAL_RULES.length} canonical rules present and synced to .claude/rules/`,
    fixCommand: null,
  };
}

module.exports = { name, run, EXPECTED_RULES: CANONICAL_RULES };
