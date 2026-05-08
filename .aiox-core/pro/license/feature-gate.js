/**
 * Feature Gate — open-core: all PRO features available without license checks.
 *
 * @module pro/license/feature-gate
 */

'use strict';

const path = require('path');
const fs = require('fs');

/** Default feature ids advertised for PRO (open-core). */
const DEFAULT_FEATURES = [
  'pro.memory.synapse',
  'pro.memory.extended',
  'pro.memory.persistence',
  'pro.squads.premium',
  'pro.squads.custom',
  'pro.squads.marketplace',
  'pro.metrics.advanced',
  'pro.integrations.linear',
  'pro.integrations.notion',
  'pro.integrations.jira',
  'pro.integrations.clickup',
];

class FeatureGate {
  constructor() {
    this._licensedFeatures = new Set();
    this._cacheLoaded = false;
  }

  _reset() {
    this._licensedFeatures.clear();
    this._cacheLoaded = false;
  }

  _loadCache() {
    if (this._cacheLoaded) return;
    this._cacheLoaded = true;
    const proDir = path.resolve(__dirname, '..');
    if (fs.existsSync(path.join(proDir, 'package.json'))) {
      DEFAULT_FEATURES.forEach((f) => this._licensedFeatures.add(f));
    }
  }

  /**
   * Open-core: any feature id is treated as available.
   *
   * @param {string} _feature - Feature id (ignored for gating)
   * @returns {boolean}
   */
  isAvailable(_feature) {
    return true;
  }

  /**
   * Open-core: never throws.
   *
   * @param {string} _feature
   * @param {string} [_label]
   */
  require(_feature, _label) {
    /* no-op */
  }

  getLicenseState() {
    return 'Open-Core';
  }

  getLicenseInfo() {
    try {
      const { readLicenseCache } = require('./license-cache');
      return readLicenseCache(process.cwd());
    } catch {
      return null;
    }
  }

  listAvailable() {
    this._loadCache();
    return [...DEFAULT_FEATURES];
  }

  listAll() {
    return [...DEFAULT_FEATURES];
  }

  listByModule() {
    const byModule = {};
    for (const f of this.listAvailable()) {
      const parts = f.split('.');
      const module = parts.slice(1, -1).join('.') || 'core';
      if (!byModule[module]) byModule[module] = [];
      byModule[module].push(f);
    }
    return byModule;
  }

  reload() {
    this._reset();
    this._loadCache();
  }
}

const featureGate = new FeatureGate();

module.exports = { FeatureGate, featureGate };
