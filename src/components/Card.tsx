import React from 'react';
import { CardData } from '../interfaces/CardData';
import './Card.css'

interface CardProps {
  data: CardData;
}

const Card: React.FC<CardProps> = ({ data }) => {
  // Função para formatar a data (ajuste conforme seu formato)
  const formatarData = (excelDate: string) => {
    // Implemente a conversão da data do Excel para formato legível
    // Esta é uma implementação básica - ajuste conforme necessário
    return new Date(parseInt(excelDate) * 24 * 60 * 60 * 1000).toLocaleDateString();
  };

  return (
    <div className="card">
      <div className="card-row">
        <h3>{data.placa}</h3>
        <span>Status: </span>
        <span className={`status-badge ${data.status.toLowerCase()}`}>
          {data.status}
        </span>
      </div>
      
        <div className="card-row">
            <span className="label">Tipo de Atendimento: </span>
            <span className="value">{data.atendimento}</span>
        </div>
        
        <div className="card-row">
            <span className="label">Data: </span>
            <span className="value">{formatarData(data.data)}</span>
        </div>
        
        <div className="card-row">
            <span className="label">Oficina: </span>
            <span className="value">{data.razao_social}</span>
        </div>
        
        <div className="card-row">
            <span className="label">CNPJ: </span>
            <span className="value">{formatarCnpj(data.cnpj)}</span>
        </div>
        
        <div className="card-row">
            <span className="label">Telefone: </span>
            <span className="value">{data.telefone}</span>
        </div>
        
        <div className="card-row">
            <span className="label">Localização: </span>
            <a 
            href={`https://www.google.com/maps?q=${data.local}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="value link"
            >
            Ver no mapa
            </a>
        </div>
    </div>
  );
};

// Função auxiliar para formatar CNPJ
function formatarCnpj(cnpj: string): string {
  return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
}

export default Card;