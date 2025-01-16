import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function Home() {
  const [produtos, setProdutos] = useState([]);
  const navigate = useNavigate();

  const imagens = [
    require("./imagens/foto1.jpg"),
    require("./imagens/foto2.jpg"),
    require("./imagens/foto3.jpg"),
  ];

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/produtos');
        console.log('Produtos recebidos:', response.data);
        setProdutos(response.data);
      } catch (error) {
        console.log('Erro ao buscar produtos:', error);
      }
    };

    fetchProdutos();
  }, []);

  const handleCardClick = (produto, imagem) => {
    navigate("/Ofertas", { state: { produto, imagem } }); 
  };

  return (
    <>
      <html lang="pt-br">
        <body style= {{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', padding: '20px' }}>
          <h1><p>Produtos em Promoção</p></h1>
          <div style={{ display: 'flex', gap: '100px' }}>
            {produtos.map((produto, i) => (
            <div className="card" style={{ width: '18rem', cursor: 'pointer' }} onClick={() => handleCardClick(produto, imagens[i])}>
              <img src={imagens[i]} className="card-img-top" alt={produto.nome} />
                <div key={produto._id} className="card-body">
                  <h2>{produto.nome}</h2>
                  <p>{produto.descricao}</p>
                  <p>Preço: R${produto.preco}</p>
                </div>
            </div>
            ))}
          </div>
        </body>
      </html>
    </>
  );
}
