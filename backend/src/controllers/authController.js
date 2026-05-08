const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { env } = require("../config/env");
const userModel = require("../models/userModel");

const SALT_ROUNDS = 10;

function jsonError(res, status, message) {
  return res.status(status).json({ error: message });
}

async function register(req, res) {
  const { name, email, password } = req.body ?? {};

  if (typeof name !== "string" || !name.trim()) {
    return jsonError(res, 400, "Nome é obrigatório");
  }
  if (typeof email !== "string" || !email.trim()) {
    return jsonError(res, 400, "E-mail é obrigatório");
  }
  if (typeof password !== "string" || password.length < 6) {
    return jsonError(res, 400, "Senha deve ter pelo menos 6 caracteres");
  }

  const existing = await userModel.findByEmail(email);
  if (existing) {
    return jsonError(res, 409, "E-mail já cadastrado");
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await userModel.createUser({ name, email, passwordHash });
  const token = jwt.sign(
    { sub: String(user.id), email: user.email },
    env.jwt.secret,
    { expiresIn: env.jwt.expiresIn }
  );

  return res.status(201).json({
    token,
    user: { id: user.id, name: user.name, email: user.email },
  });
}

async function login(req, res) {
  const { email, password } = req.body ?? {};

  if (typeof email !== "string" || !email.trim()) {
    return jsonError(res, 400, "E-mail é obrigatório");
  }
  if (typeof password !== "string" || !password) {
    return jsonError(res, 400, "Senha é obrigatória");
  }

  const user = await userModel.findByEmail(email);
  if (!user) {
    return jsonError(res, 401, "Credenciais inválidas");
  }

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) {
    return jsonError(res, 401, "Credenciais inválidas");
  }

  const token = jwt.sign(
    { sub: String(user.id), email: user.email },
    env.jwt.secret,
    { expiresIn: env.jwt.expiresIn }
  );

  return res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email },
  });
}

async function me(req, res) {
  const userId = req.auth?.sub;
  if (!userId) {
    return jsonError(res, 401, "Não autorizado");
  }

  const pool = require("../db/connection").pool;
  const result = await pool.query(
    `SELECT id, name, email, created_at FROM users WHERE id = $1 LIMIT 1`,
    [userId]
  );
  const row = result.rows[0];
  if (!row) {
    return jsonError(res, 404, "Usuário não encontrado");
  }

  return res.json({
    user: {
      id: row.id,
      name: row.name,
      email: row.email,
      created_at: row.created_at,
    },
  });
}

module.exports = { register, login, me };
