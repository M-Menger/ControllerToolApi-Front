import React from 'react';
import { CardData } from '../interfaces/CardData';

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
      <div className="card-header">
        <h3>Placa: {data.placa}</h3>
        <span className={`status-badge ${data.status.toLowerCase()}`}>
          {data.status}
        </span>
      </div>
      
      <div className="card-body">
        <div className="card-row">
          <span className="label">Tipo de Atendimento:</span>
          <span className="value">{data.atendimento}</span>
        </div>
        
        <div className="card-row">
          <span className="label">Data:</span>
          <span className="value">{formatarData(data.data)}</span>
        </div>
        
        <div className="card-row">
          <span className="label">Cliente:</span>
          <span className="value">{data.razao_social}</span>
        </div>
        
        <div className="card-row">
          <span className="label">CNPJ:</span>
          <span className="value">{formatarCnpj(data.cnpj)}</span>
        </div>
        
        <div className="card-row">
          <span className="label">Telefone:</span>
          <span className="value">{data.telefone}</span>
        </div>
        
        <div className="card-row">
          <span className="label">Localização:</span>
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
      
      <style jsx>{`
        .card {
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 16px;
          margin: 16px 0;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          background-color: white;
        }
        
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
          border-bottom: 1px solid #eee;
          padding-bottom: 8px;
        }
        
        .status-badge {
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: bold;
          text-transform: uppercase;
        }
        
        .status-badge.encerrada {
          background-color: #d4edda;
          color: #155724;
        }
        
        .status-badge.em_andamento {
          background-color: #fff3cd;
          color: #856404;
        }
        
        .status-badge.pendente {
          background-color: #f8d7da;
          color: #721c24;
        }
        
        .card-row {
          display: flex;
          margin: 8px 0;
        }
        
        .label {
          font-weight: bold;
          width: 120px;
          color: #555;
        }
        
        .value {
          flex: 1;
        }
        
        .link {
          color: #0066cc;
          text-decoration: none;
        }
        
        .link:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

// Função auxiliar para formatar CNPJ
function formatarCnpj(cnpj: string): string {
  return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
}

export default Card;