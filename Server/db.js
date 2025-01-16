const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Produto = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

const mongoURI = "mongodb://127.0.0.1:27017/Ofertas";
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB conectado!"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

app.get("/api/produtos", async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
});
