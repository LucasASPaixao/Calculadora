/**
 * Squad Installer — Install squads with validation and rollback.
 *
 * @module pro/squads/squad-installer
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { validateSquad } = require('./squad-validator');
const { loadRegistry, saveRegistry, getSquadsDir, listInstalled } = require('./squad-registry');

async function installSquad(projectRoot, squadName, options = {}) {
  const { dryRun = false } = options;
  const squadsDir = getSquadsDir(projectRoot);
  const squadPath = path.join(squadsDir, squadName);

  if (!fs.existsSync(squadPath)) {
    throw new Error(`Squad not found: ${squadName} (expected at squads/${squadName})`);
  }

  const result = validateSquad(squadPath);
  if (!result.valid) {
    throw new Error(`Invalid squad: ${result.errors.join('; ')}`);
  }

  if (dryRun) {
    return { success: true, dryRun: true, message: `Would install ${squadName}` };
  }

  const registry = loadRegistry(projectRoot);
  const installed = registry.installed || [];
  const existing = installed.find((s) => s.name === squadName);
  if (existing) {
    return { success: true, message: `${squadName} already installed` };
  }

  const manifest = result.manifest;
  const entry = {
    name: squadName,
    version: manifest.version || '1.0.0',
    domain: manifest.domain || 'general',
    installedAt: new Date().toISOString().slice(0, 10),
    path: `squads/${squadName}/`,
    agents: (manifest.components?.agents || []).map((a) => a.replace(/\.md$/, '')),
  };

  installed.push(entry);
  registry.installed = installed;
  saveRegistry(projectRoot, registry);

  return { success: true, message: `Installed ${squadName} v${entry.version}` };
}

async function removeSquad(projectRoot, squadName, options = {}) {
  const { dryRun = false } = options;
  const registry = loadRegistry(projectRoot);
  const installed = registry.installed || [];

  const idx = installed.findIndex((s) => s.name === squadName);
  if (idx < 0) {
    throw new Error(`Squad not installed: ${squadName}`);
  }

  if (dryRun) {
    return { success: true, dryRun: true, message: `Would remove ${squadName}` };
  }

  installed.splice(idx, 1);
  registry.installed = installed;
  saveRegistry(projectRoot, registry);

  return { success: true, message: `Removed ${squadName}` };
}

async function updateSquad(projectRoot, squadName) {
  const squadsDir = getSquadsDir(projectRoot);
  const squadPath = path.join(squadsDir, squadName);
  if (!fs.existsSync(squadPath)) {
    throw new Error(`Squad not found: ${squadName}`);
  }
  const result = validateSquad(squadPath);
  if (!result.valid) {
    throw new Error(`Invalid squad: ${result.errors.join('; ')}`);
  }
  const registry = loadRegistry(projectRoot);
  const installed = registry.installed || [];
  const entry = installed.find((s) => s.name === squadName);
  if (entry) {
    entry.version = result.manifest.version || '1.0.0';
    entry.agents = (result.manifest.components?.agents || []).map((a) => a.replace(/\.md$/, ''));
    saveRegistry(projectRoot, registry);
  }
  return { success: true, message: `Updated ${squadName} to v${entry?.version || '?'}` };
}

module.exports = { installSquad, removeSquad, updateSquad };
