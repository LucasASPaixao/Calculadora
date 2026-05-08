/**
 * Windsurf Transformer — Cascade rules with YAML frontmatter
 * @story IDE — Windsurf support
 *
 * Format: Same condensed body as Cursor, wrapped with Windsurf frontmatter.
 * Target: .windsurf/rules/AIOX/agents/*.md
 */

const cursorTransformer = require('./cursor');

/**
 * One-line description for model_decision (YAML-safe via JSON.stringify in frontmatter).
 * @param {object} agentData - Parsed agent data from agent-parser
 * @returns {string}
 */
function buildModelDescription(agentData) {
  const agent = agentData.agent || {};
  const name = agent.name || agentData.id;
  const title = agent.title || 'AIOX Agent';
  const whenToUse = typeof agent.whenToUse === 'string' ? agent.whenToUse : '';
  const collapsed = whenToUse.replace(/\s+/g, ' ').trim();
  if (collapsed.length > 0) {
    return collapsed;
  }
  return `${name} (${title}) — AIOX agent`;
}

/**
 * Transform agent data to Windsurf format
 * @param {object} agentData - Parsed agent data from agent-parser
 * @returns {string} - Transformed content
 */
function transform(agentData) {
  const body = cursorTransformer.transform(agentData);
  const description = buildModelDescription(agentData);
  const descScalar = JSON.stringify(description);

  return `---
trigger: model_decision
description: ${descScalar}
---

${body}`;
}

/**
 * Get the target filename for this agent
 * @param {object} agentData - Parsed agent data
 * @returns {string} - Target filename
 */
function getFilename(agentData) {
  return agentData.filename;
}

module.exports = {
  transform,
  getFilename,
  format: 'windsurf',
};
