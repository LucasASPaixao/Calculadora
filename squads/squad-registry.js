/**
 * Squad Registry — Catalog of installed and available squads.
 *
 * @module pro/squads/squad-registry
 */

'use strict';

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { validateSquad } = require('./squad-validator');

function getRegistryPath(projectRoot = process.cwd()) {
  return path.join(projectRoot, '.aios', 'squads-registry.yaml');
}

function getSquadsDir(projectRoot = process.cwd()) {
  return path.join(projectRoot, 'squads');
}

function loadRegistry(projectRoot) {
  const regPath = getRegistryPath(projectRoot);
  if (!fs.existsSync(regPath)) {
    return { installed: [], available: [] };
  }
  try {
    return yaml.load(fs.readFileSync(regPath, 'utf8')) || { installed: [], available: [] };
  } catch {
    return { installed: [], available: [] };
  }
}

function saveRegistry(projectRoot, registry) {
  const dir = path.dirname(getRegistryPath(projectRoot));
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(getRegistryPath(projectRoot), yaml.dump(registry), 'utf8');
}

function scanLocalSquads(projectRoot) {
  const squadsDir = getSquadsDir(projectRoot);
  const available = [];
  if (!fs.existsSync(squadsDir)) return available;

  const entries = fs.readdirSync(squadsDir, { withFileTypes: true });
  for (const e of entries) {
    if (!e.isDirectory()) continue;
    const squadPath = path.join(squadsDir, e.name);
    const result = validateSquad(squadPath);
    if (result.valid && result.manifest) {
      available.push({
        name: e.name,
        version: result.manifest.version || '1.0.0',
        domain: result.manifest.domain || 'general',
        source: 'local',
        path: squadPath,
      });
    }
  }
  return available;
}

function listInstalled(projectRoot) {
  const registry = loadRegistry(projectRoot);
  return registry.installed || [];
}

function listAvailable(projectRoot) {
  const local = scanLocalSquads(projectRoot);
  const registry = loadRegistry(projectRoot);
  const remote = registry.available || [];
  const byName = new Map();
  for (const s of local) byName.set(s.name, { ...s, source: 'local' });
  for (const s of remote) {
    if (!byName.has(s.name)) byName.set(s.name, { ...s, source: 'remote' });
  }
  return Array.from(byName.values());
}

module.exports = {
  loadRegistry,
  saveRegistry,
  listInstalled,
  listAvailable,
  scanLocalSquads,
  getRegistryPath,
  getSquadsDir,
};
