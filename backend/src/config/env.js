require("dotenv").config({ path: require("path").join(__dirname, "..", "..", ".env") });

const env = {
  port: Number(process.env.PORT) || 3001,
  db: {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    name: process.env.DB_NAME || "calculadora_db",
    user: process.env.DB_USER || "calculadora_user",
    password: process.env.DB_PASSWORD || "",
  },
  jwt: {
    secret: process.env.JWT_SECRET || "troque_em_producao",
    expiresIn: process.env.JWT_EXPIRES_IN || "1h",
  },
};

if (!process.env.JWT_SECRET || process.env.JWT_SECRET === "troque_por_segredo_forte") {
  if (process.env.NODE_ENV === "production") {
    throw new Error("Defina JWT_SECRET seguro em produção");
  }
}

module.exports = { env };
