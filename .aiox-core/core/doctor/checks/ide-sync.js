/**
 * Doctor Check: IDE Sync
 *
 * Validates that enabled ideSync targets under core-config.yaml have agent
 * outputs present and counts match the canonical `.aiox-core/development/agents/` source.
 *
 * @module aiox-core/doctor/checks/ide-sync
 * @story INS-4.1
 */

const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');

const name = 'ide-sync';

function countAgentFiles(agentDir) {
  if (!fs.existsSync(agentDir)) {
    return -1;
  }
  try {
    return fs.readdirSync(agentDir).filter((f) => f.endsWith('.md')).length;
  } catch (_err) {
    return -1;
  }
}

async function run(context) {
  const agentsSourceDir = path.join(context.projectRoot, '.aiox-core', 'development', 'agents');
  const configPath = path.join(context.projectRoot, '.aiox-core', 'core-config.yaml');

  if (!fs.existsSync(agentsSourceDir)) {
    return {
      check: name,
      status: 'FAIL',
      message: 'Source agents directory not found',
      fixCommand: 'npx aiox-core install --force',
    };
  }

  let sourceAgents;
  try {
    sourceAgents = fs
      .readdirSync(agentsSourceDir)
      .filter((f) => f.endsWith('.md'))
      .map((f) => f.replace('.md', ''));
  } catch (_err) {
    return {
      check: name,
      status: 'FAIL',
      message: 'Cannot read source agents directory',
      fixCommand: 'npx aiox-core install --force',
    };
  }

  const sourceCount = sourceAgents.length;

  if (!fs.existsSync(configPath)) {
    return {
      check: name,
      status: 'WARN',
      message: 'core-config.yaml not found — cannot validate IDE targets',
      fixCommand: 'npm run sync:ide',
    };
  }

  let config;
  try {
    config = yaml.load(fs.readFileSync(configPath, 'utf8'));
  } catch (_err) {
    return {
      check: name,
      status: 'WARN',
      message: 'Could not parse core-config.yaml',
      fixCommand: 'npm run sync:ide',
    };
  }

  const ideSync = config.ideSync || {};
  const targets = ideSync.targets || {};
  const redirectCount = Object.keys(ideSync.redirects || {}).length;
  const expectedIdeCount = sourceCount + redirectCount;

  const issues = [];
  let checked = 0;

  for (const [ideName, t] of Object.entries(targets)) {
    if (!t.enabled || !t.path) {
      continue;
    }
    checked++;
    const agentDir = path.join(context.projectRoot, t.path);
    const ideCount = countAgentFiles(agentDir);

    if (ideCount < 0) {
      issues.push(`${ideName}: missing directory (${t.path})`);
      continue;
    }

    if (ideCount !== expectedIdeCount) {
      issues.push(`${ideName}: ${ideCount} files in ${t.path}, expected ${expectedIdeCount}`);
    }
  }

  if (checked === 0) {
    return {
      check: name,
      status: 'WARN',
      message: 'No enabled ideSync targets in core-config.yaml',
      fixCommand: 'npm run sync:ide',
    };
  }

  if (issues.length === 0) {
    return {
      check: name,
      status: 'PASS',
      message: `${checked} IDE agent target(s) in sync (${sourceCount} source agents)`,
      fixCommand: null,
    };
  }

  return {
    check: name,
    status: 'WARN',
    message: issues.join('; '),
    fixCommand: 'npm run sync:ide',
  };
}

module.exports = { name, run };
