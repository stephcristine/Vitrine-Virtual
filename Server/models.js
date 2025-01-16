const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String, required: true },
  preco: { type: Number, required: true },
  fabricante: { type: String, required: true },
  especificacoes: [{
    contem: { type: String, required: true },
    embalagem: { type: String, required: true },
    tamanho: { type: String, required: true }
  }],
});

const Produto = mongoose.model('Produto', produtoSchema, 'Produtos');

module.exports = Produto;
