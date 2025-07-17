import React, { useState } from 'react';
import styles from './style.module.css';
import UploadCVButton from '../UploadCVButton';

function AdminImportSection() {
  const [cvStatus, setCVStatus] = useState('');
  const [cvFileName, setCVFileName] = useState('');

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

  return (
    <div className={styles.importSectionWrapper}>
      <h1 className={styles.mainTitle}>User Management System</h1>
      <h2 className={styles.subTitle}>Admin Import Section</h2>
      <div className={styles.uploadSection}>
        <UploadCVButton onFileSelect={handleCVSelect} />
        {cvStatus && <div className={styles.statusMessage}>{cvStatus}</div>}
        {cvFileName && <div className={styles.fileName}>{cvFileName}</div>}
      </div>
    </div>
  );
}

export default AdminImportSection;
