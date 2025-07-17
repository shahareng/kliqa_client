import React, { useState } from 'react';
import UploadExcelButton from '../UploadExcelButton';
import UploadCVButton from '../UploadCVButton';
//mport FilesPreview from './FilesPreview';
//import SubmitButton from './SubmitButton';

function AdminImportSection() {
  const [excelFile, setExcelFile] = useState(null);
  const [cvFile, setCVFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleExcelUpload = (file) => {
    setExcelFile(file);

  
    const formData = new FormData();
    formData.append('file', file);

    fetch('http://localhost:2500/upload/excel', {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        console.log(' Upload response:', data);
        setUploadStatus(' קובץ הועלה בהצלחה!');
      })
      .catch(err => {
        console.error(' Upload error:', err);
        setUploadStatus('שגיאה בהעלאת הקובץ');
      });
  };
  


  return (
    <div>
     <h4>Upload Members</h4>

      {/* הכפתור מקבל את הפונקציה ששולחת לשרת */}
      <UploadExcelButton onFileSelect={handleExcelUpload} />

      {/* תצוגת הודעה */}
      {/* {uploadStatus && <p>{uploadStatus}</p>} */}

      {/* נשאיר את CV לשלב הבא */}
      <UploadCVButton onFileSelect={setCVFile} />

      {/* בהמשך נוסיף את זה */}
      {/* 
        <FilesPreview excelFile={excelFile} cvFile={cvFile} />
        <SubmitButton excelFile={excelFile} cvFile={cvFile} />
      */}
    </div>
  );
}

export default AdminImportSection;
