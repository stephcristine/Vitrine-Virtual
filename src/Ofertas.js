import React, { useState } from 'react';
import api from './api';
import { useLocation } from "react-router-dom";
import { toast } from 'react-toastify';

export default function Ofertas() {
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});
  const location = useLocation();
  const { produto, imagem } = location.state || {};

  async function handleSearch() {
    if (input === '') {
      toast.error("Preencha um CEP!");
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
    } catch {
      toast.error("Ops, erro ao buscar o CEP.");
      setCep('');
    }
  }

  function doNothing() {
    return toast.success("Compra realizada com sucesso!");
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1 style={{ marginBottom: '20px' }}>{produto.nome}</h1>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '40px' }}>
        <img src={imagem} alt={produto.nome} style={{ width: '300px', borderRadius: '10px' }} />

        <div style={{ textAlign: 'left', maxWidth: '500px' }}>
          <p>{produto.descricao}</p>
          <p><strong>Preço:</strong> R${produto.preco}</p>
          <p><strong>Fabricante:</strong> {produto.fabricante}</p>
          <p><strong>Especificações:</strong></p>
          <ul>
            {produto.especificacoes.map((especificacao, index) => (
              <li key={index}>
                <p>Contém: {especificacao.contem}</p>
                <p>Embalagem: {especificacao.embalagem}kg</p>
                <p>Tamanho: {especificacao.tamanho}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div style={{ marginTop: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '50px' }}>
          <input
            type="text"
            placeholder="Digite seu CEP..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ padding: '10px', fontSize: '16px', width: '200px', borderRadius: '5px', border: '1px solid #ccc' }}
          />

          <button
            onClick={handleSearch}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              borderRadius: '5px',
              border: '1px solid #ccc',
              backgroundColor: 'black',
              color: 'white'
            }}
          >
            Buscar
          </button>

          <button
            onClick={ doNothing }
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              borderRadius: '5px',
              border: '1px solid #ccc',
              backgroundColor: '#4CAF50',
              color: 'white'
            }}
          >
            Comprar
          </button>
        </div>

        {Object.keys(cep).length > 0 && (
          <div style={{ marginTop: '20px', textAlign: 'left', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <h3>Informações de Entrega</h3>
            <p><strong>CEP:</strong> {cep.cep}</p>
            <p><strong>Rua:</strong> {cep.logradouro}</p>
            <p>{cep.complemento}</p>
            <p><strong>Bairro:</strong> {cep.bairro}</p>
            <p><strong>Cidade:</strong> {cep.localidade} - {cep.uf}</p>
          </div>
        )}
      </div>
    </div>
  );
}
