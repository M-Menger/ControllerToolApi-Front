import React, { useState } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import { CardData } from '../interfaces/CardData';

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
        'http://localhost:8080/services/upload', 
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

  return (
    <div className="container">
      <h2>Upload de Arquivo Excel</h2>
      <div className="upload-section">
        <input type="file" accept=".xlsx" onChange={handleFileChange} />
        <button onClick={handleUpload} disabled={!selectedFile}>
          Enviar Arquivo
        </button>
      </div>
      
      {uploadStatus && <p className="status-message">{uploadStatus}</p>}
      
      <div className="cards-container">
        {atendimentos.map((atendimento, index) => (
          <Card key={`${atendimento.placa}-${index}`} data={atendimento} />
        ))}
      </div>
      
      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        
        .upload-section {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }
        
        .status-message {
          margin: 10px 0;
          padding: 8px;
          background-color: #f8f9fa;
          border-radius: 4px;
        }
        
        .cards-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
      `}</style>
    </div>
  );
};

export default FileUpload;