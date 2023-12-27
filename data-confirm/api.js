const express = require("express");
const app = express();
const path = require("path");
const http = require("http");

const server = http.createServer(app);

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://konsist.com.br");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Servir arquivos estáticos da aplicação React
app.use(express.static("build")); // Diretório onde os arquivos estáticos do React são gerados
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Iniciar o servidor
server.listen(4000, () => {
  console.log("Servidor Node.js rodando na porta 4000");
});
