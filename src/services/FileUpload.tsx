import React, { useState } from 'react';
import axios from 'axios';

const FileUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [jsonResult, setJsonResult] = useState<string>('');

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
      
      // Substitua a URL pela correta da sua API
      const response = await axios.post('http://localhost:8080/services/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploadStatus('Arquivo processado com sucesso!');
      setJsonResult(JSON.stringify(response.data, null, 2));
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
    <div>
      <h2>Upload de Arquivo Excel</h2>
      <div>
        <input type="file" accept=".xlsx" onChange={handleFileChange} />
        <button onClick={handleUpload} disabled={!selectedFile}>
          Enviar Arquivo
        </button>
      </div>
      {uploadStatus && <p>{uploadStatus}</p>}
      {jsonResult && (
        <div>
          <h3>Resultado:</h3>
          <pre>{jsonResult}</pre>
        </div>
      )}
    </div>
  );
};

export default FileUpload;