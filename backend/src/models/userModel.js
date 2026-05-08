const pool = require("../db/connection").pool;

/**
 * @param {string} email
 * @returns {Promise<import('pg').QueryResultRow | null>}
 */
async function findByEmail(email) {
  const normalized = email.trim().toLowerCase();
  const result = await pool.query(
    `SELECT id, name, email, password_hash, created_at
     FROM users
     WHERE LOWER(email) = $1
     LIMIT 1`,
    [normalized]
  );
  return result.rows[0] ?? null;
}

/**
 * @param {{ name: string; email: string; passwordHash: string }} data
 * @returns {Promise<import('pg').QueryResultRow>}
 */
async function createUser(data) {
  const email = data.email.trim().toLowerCase();
  const result = await pool.query(
    `INSERT INTO users (name, email, password_hash)
     VALUES ($1, $2, $3)
     RETURNING id, name, email, created_at`,
    [data.name.trim(), email, data.passwordHash]
  );
  return result.rows[0];
}

module.exports = { findByEmail, createUser };
