
import React, { useState } from 'react';

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch(import.meta.env.VITE_API_BASE_URL + '/upload', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      setMessage('Upload successful. Check console for response.');
      console.log(data);
    } catch (err) {
      setMessage('Upload failed. Check backend status.');
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Dealership Valuation Tool</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} style={{ marginLeft: '1rem' }}>Upload</button>
      <p>{message}</p>
    </div>
  );
};

export default App;
