/**
 * License Cache — Local storage for license validation state.
 *
 * @module pro/license/license-cache
 */

'use strict';

const fs = require('fs');
const path = require('path');

function getAiosDir(projectRoot = process.cwd()) {
  return path.join(projectRoot, '.aios');
}

function getCachePath(projectRoot = process.cwd()) {
  return path.join(getAiosDir(projectRoot), 'license-cache.json');
}

function writeLicenseCache(cache, projectRoot = process.cwd()) {
  const dir = getAiosDir(projectRoot);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(getCachePath(projectRoot), JSON.stringify(cache, null, 2), 'utf8');
}

function readLicenseCache(projectRoot = process.cwd()) {
  const p = getCachePath(projectRoot);
  if (!fs.existsSync(p)) return null;
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch {
    return null;
  }
}

function deleteLicenseCache(projectRoot = process.cwd()) {
  const p = getCachePath(projectRoot);
  if (fs.existsSync(p)) fs.unlinkSync(p);
}

function hasPendingDeactivation() {
  return false;
}

function setPendingDeactivation() {}
function clearPendingDeactivation() {}

function getLicenseState(projectRoot = process.cwd()) {
  const cache = readLicenseCache(projectRoot);
  if (!cache) return 'Not Activated';
  if (cache.expiresAt && new Date(cache.expiresAt) < new Date()) return 'Expired';
  return 'Active';
}

module.exports = {
  writeLicenseCache,
  readLicenseCache,
  deleteLicenseCache,
  getCachePath,
  getAiosDir,
  hasPendingDeactivation,
  setPendingDeactivation,
  clearPendingDeactivation,
  getLicenseState,
};
