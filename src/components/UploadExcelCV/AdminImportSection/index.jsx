import React, { useState } from 'react';
import styles from './style.module.css';
import UploadCVButton from '../UploadCVButton';
import UploadExcelButton from '../UploadExcelButton';

function AdminImportSection() {
  // CV states
  const [cvStatus, setCVStatus] = useState('');
  const [cvFileName, setCVFileName] = useState('');

  // Excel states
  const [excelStatus, setExcelStatus] = useState('');
  const [excelFileName, setExcelFileName] = useState('');

  // Handle CV upload
  const handleCVSelect = async (file) => {
    setCVStatus('Uploading...');
    setCVFileName('');
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload/cv', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setCVStatus('CV uploaded and processed successfully.');
        setCVFileName(file.name);
      } else {
        const data = await response.json();
        setCVStatus(data.error || 'Failed to upload CV.');
      }
    } catch (err) {
      setCVStatus('Error uploading CV.');
    }
  };

  // Handle Excel upload
  const handleExcelSelect = async (file) => {
    setExcelStatus('Uploading...');
    setExcelFileName('');
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload/excel', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setExcelStatus('Excel uploaded and processed successfully.');
        setExcelFileName(file.name);
      } else {
        const data = await response.json();
        setExcelStatus(data.error || 'Failed to upload Excel.');
      }
    } catch (err) {
      setExcelStatus('Error uploading Excel.');
    }
  };

  return (
    <div className={styles.importSectionWrapper}>
      <h1 className={styles.mainTitle}>User Management System</h1>
      <h2 className={styles.subTitle}>Admin Import Section</h2>
      <div className={styles.uploadSection}>
        <div className={styles.uploadBlock}>
          <UploadCVButton onFileSelect={handleCVSelect} />
          {cvStatus && <div className={styles.statusMessage}>{cvStatus}</div>}
          {cvFileName && <div className={styles.fileName}>{cvFileName}</div>}
        </div>
        <div className={styles.uploadBlock}>
          <UploadExcelButton onFileSelect={handleExcelSelect} />
          {excelStatus && <div className={styles.statusMessage}>{excelStatus}</div>}
          {excelFileName && <div className={styles.fileName}>{excelFileName}</div>}
        </div>
      </div>
    </div>
  );
}

export default AdminImportSection;
