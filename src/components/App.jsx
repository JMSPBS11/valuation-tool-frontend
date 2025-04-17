import React, { useState } from 'react';

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedOEM, setSelectedOEM] = useState('Nissan');
  const [fields, setFields] = useState({});
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleOEMChange = (e) => {
    setSelectedOEM(e.target.value);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('oem', selectedOEM);

    try {
      const response = await fetch('https://valuation-tool-backend.onrender.com/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setMessage('Upload successful.');
      setFields(data.data || {});
    } catch (err) {
      setMessage('Upload failed. Check backend status.');
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Dealership Valuation Tool</h1>

      <label>
        Select OEM:&nbsp;
        <select value={selectedOEM} onChange={handleOEMChange}>
          <option value="Nissan">Nissan</option>
          <option value="CDJR">CDJR</option>
          <option value="GM">GM</option>
          <option value="Ford">Ford</option>
        </select>
      </label>

      <div style={{ marginTop: '1rem' }}>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload} style={{ marginLeft: '1rem' }}>Upload</button>
      </div>

      <p style={{ marginTop: '1rem' }}>{message}</p>

      {Object.keys(fields).length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Extracted Fields:</h3>
          <ul>
            {Object.entries(fields).map(([key, value]) => (
              <li key={key}><strong>{key}:</strong> {value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
