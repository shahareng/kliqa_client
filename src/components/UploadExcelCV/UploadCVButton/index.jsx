import React, { useState } from 'react';
import styles from './style.module.css';

function UploadCVButton({ onFileSelect }) {
  const [message, setMessage] = useState('');
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setMessage('');
      setFileName('');
      return;
    }

    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (!allowedTypes.includes(file.type)) {
      setMessage('Only PDF or Word files are allowed.');
      setFileName('');
      return;
    }

    setMessage('File uploaded successfully.');
    setFileName(file.name);
    onFileSelect(file);
  };

  return (
    <div className={styles.uploadWrapper}>
      <label htmlFor="cv-upload" className={styles.uploadButton}>
        CV File
      </label>
      <input
        id="cv-upload"
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        className={styles.hiddenInput}
      />
      {message && <p className={styles.uploadMessage}>{message}</p>}
      {fileName && <p className={styles.fileName}>{fileName}</p>}
    </div>
  );
}

export default UploadCVButton;
