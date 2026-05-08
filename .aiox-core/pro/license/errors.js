/**
 * Pro License Errors
 *
 * @module pro/license/errors
 */

'use strict';

class ProFeatureError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ProFeatureError';
  }
}

class LicenseActivationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'LicenseActivationError';
  }
}

class LicenseValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'LicenseValidationError';
  }
}

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthError';
  }
}

class BuyerValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BuyerValidationError';
  }
}

module.exports = {
  ProFeatureError,
  LicenseActivationError,
  LicenseValidationError,
  AuthError,
  BuyerValidationError,
};
