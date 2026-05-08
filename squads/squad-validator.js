/**
 * Squad Validator — Validates squad structure and integrity.
 *
 * @module pro/squads/squad-validator
 */

'use strict';

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

function validateSquad(squadPath) {
  const errors = [];
  const squadYamlPath = path.join(squadPath, 'squad.yaml');

  if (!fs.existsSync(squadYamlPath)) {
    errors.push('squad.yaml not found');
    return { valid: false, errors };
  }

  let manifest;
  try {
    manifest = yaml.load(fs.readFileSync(squadYamlPath, 'utf8'));
  } catch (err) {
    errors.push(`Invalid squad.yaml: ${err.message}`);
    return { valid: false, errors };
  }

  if (!manifest.name) errors.push('squad.yaml: missing name');
  if (!manifest.version) errors.push('squad.yaml: missing version');
  if (!manifest.components) errors.push('squad.yaml: missing components');

  const components = manifest.components || {};
  const agents = components.agents || [];
  const agentsDir = path.join(squadPath, 'agents');
  if (agents.length > 0 && fs.existsSync(agentsDir)) {
    for (const a of agents) {
      const agentPath = path.join(agentsDir, a);
      if (!fs.existsSync(agentPath)) {
        errors.push(`Agent ${a} not found at agents/${a}`);
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    manifest,
  };
}

module.exports = { validateSquad };
