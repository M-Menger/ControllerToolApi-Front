import React, { useState } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import { CardData } from '../interfaces/CardData';
import './FileUpload.css'

const FileUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [atendimentos, setAtendimentos] = useState<CardData[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('Por favor, selecione um arquivo primeiro.');
      return;
    }

    if (!selectedFile.name.endsWith('.xlsx')) {
      setUploadStatus('Apenas arquivos .xlsx são suportados.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      setUploadStatus('Enviando arquivo...');
      setAtendimentos([]);
      
      const response = await axios.post<CardData[]>(
        'https://controllertoolapi.onrender.com/services/upload', 
        formData, 
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setUploadStatus(`Sucesso! ${response.data.length} atendimentos encontrados.`);
      setAtendimentos(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setUploadStatus(`Erro ao enviar arquivo: ${error.response?.data || error.message}`);
      } else {
        setUploadStatus('Erro desconhecido ao enviar arquivo');
      }
      console.error('Upload error:', error);
    }
  };

  // Agrupar atendimentos por status
  const atendimentosPorStatus = {
    encerrada: atendimentos.filter(a => a.status.toLowerCase() === 'veículo pronto' || a.status.toLowerCase() === 'encerrada'),
    em_andamento: atendimentos.filter(a => a.status.toLowerCase() === 'aprovada' || a.status.toLowerCase() === 'em elaboração de orcamento'),
    pendente: atendimentos.filter(a => a.status.toLowerCase() === 'aberto'),
  };

  return (
    <div className="container">
        
      <div className="upload-section">
        <h2>Upload de Arquivo Excel</h2>
        <input type="file" accept=".xlsx" onChange={handleFileChange} />
        <button onClick={handleUpload} disabled={!selectedFile}>
          Enviar Arquivo
        </button>
        {uploadStatus && <p className="status-message">{uploadStatus}</p>}
      </div>

      <div className="columns-container">
        {/* Coluna Encerrada */}
        <div className="status-column">
          <h3 className="column-title encerrada">Encerrada ({atendimentosPorStatus.encerrada.length})</h3>
          <div className="cards-column">
            {atendimentosPorStatus.encerrada.map((atendimento, index) => (
              <Card key={`encerrada-${atendimento.placa}-${index}`} data={atendimento} />
            ))}
          </div>
        </div>
        
        {/* Coluna Em Andamento */}
        <div className="status-column">
          <h3 className="column-title em_andamento">Em Andamento ({atendimentosPorStatus.em_andamento.length})</h3>
          <div className="cards-column">
            {atendimentosPorStatus.em_andamento.map((atendimento, index) => (
              <Card key={`andamento-${atendimento.placa}-${index}`} data={atendimento} />
            ))}
          </div>
        </div>
        
        {/* Coluna Pendente */}
        <div className="status-column">
          <h3 className="column-title pendente">Aberto ({atendimentosPorStatus.pendente.length})</h3>
          <div className="cards-column">
            {atendimentosPorStatus.pendente.map((atendimento, index) => (
              <Card key={`pendente-${atendimento.placa}-${index}`} data={atendimento} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
