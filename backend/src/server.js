const express = require("express");
const cors = require("cors");
const { env } = require("./config/env");
const authRoutes = require("./routes/auth");

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  const message = err.message || "Erro interno";
  res.status(500).json({ error: message });
});

app.listen(env.port, () => {
  console.log(`API em http://localhost:${env.port}`);
});
