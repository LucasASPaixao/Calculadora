/**
 * License Crypto — Machine ID and key derivation helpers.
 *
 * @module pro/license/license-crypto
 */

'use strict';

const crypto = require('crypto');
const os = require('os');

function generateMachineId() {
  const data = [os.hostname(), os.platform(), os.arch()].join('-');
  return crypto.createHash('sha256').update(data).digest('hex').slice(0, 32);
}

function generateSalt() {
  return crypto.randomBytes(16).toString('hex');
}

function deriveCacheKey(machineId, salt) {
  return crypto.createHash('sha256').update(`${machineId}:${salt}`).digest('hex').slice(0, 32);
}

function validateKeyFormat(key) {
  return typeof key === 'string' && /^PRO-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/i.test(key);
}

function maskKey(key) {
  if (!key || typeof key !== 'string') return '****';
  const parts = key.split('-');
  return parts.map((p, i) => (i < 2 ? p : '****')).join('-');
}

module.exports = {
  generateMachineId,
  generateSalt,
  deriveCacheKey,
  validateKeyFormat,
  maskKey,
};
