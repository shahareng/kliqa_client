import React, { useState } from 'react';
import styles from './style.module.css';

function UploadExcelButton({ onFileSelect }) {
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
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];

    if (!allowedTypes.includes(file.type)) {
      setMessage('Only Excel files (.xls or .xlsx) are allowed.');
      setFileName('');
      return;
    }

    setMessage('File uploaded successfully.');
    setFileName(file.name);
    onFileSelect(file);
  };

  return (
    <div className={styles.uploadWrapper}>
      <label htmlFor="excel-upload" className={styles.uploadButton}>
        Upload Excel File
      </label>
      <input
        id="excel-upload"
        type="file"
        accept=".xls,.xlsx"
        onChange={handleFileChange}
        className={styles.hiddenInput}
      />
      {message && <p className={styles.uploadMessage}>{message}</p>}
      {fileName && <p className={styles.fileName}>{fileName}</p>}
    </div>
  );
}

export default UploadExcelButton;
