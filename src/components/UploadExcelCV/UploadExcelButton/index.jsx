import React, { useState } from 'react';
import styles from './style.module.css';

function UploadExcelButton({ onFileSelect }) {
  const [message, setMessage] = useState('');
  const [fileName, setFileName] = useState('');
  const [errors, setErrors] = useState([]);   

  const handleFileChange = async (event) => {
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

    const formData = new FormData();
    formData.append('file', file);

    
    try {
      const res = await fetch('http://localhost:2500/upload/excel', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();

      if (!res.ok) {
        // שגיאות ולידציה מהשרת
        if (data.errors) {
          setErrors(data.errors);
          setMessage('היו שגיאות בקובץ.');
        } else {
          setMessage('שגיאה בלתי צפויה.');
        }
      } else {
        setErrors([]);
        setMessage('✅ קובץ הועלה בהצלחה!');
        console.log('Excel Data:', data.data); // נתונים מהשרת
      }
    } catch (error) {
      setMessage('שגיאה בשליחה לשרת');
    }

  };
    

  return (
    <div className={styles.uploadWrapper}>
       <label htmlFor="excel-upload" className={styles.uploadButton}>
        העלאת קובץ Excel
      </label>
      <input
        id="excel-upload"
        type="file"
        accept=".xls,.xlsx"
        onChange={handleFileChange}
        className={styles.hiddenInput}
      />
      {message && <p className={styles.uploadMessage}>{message}</p>}
      {fileName && <p className={styles.fileName}>📄 {fileName}</p>}
      {errors.length > 0 && (
        <ul className={styles.errorList}>
          {errors.map((err, i) => <li key={i} style={{ color: 'red' }}>{err}</li>)}
        </ul>
      )}
    </div>
  );
}

export default UploadExcelButton;
