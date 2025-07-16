import React, { useState } from 'react';
import UploadExcelButton from '../UploadExcelButton';
import UploadCVButton from '../UploadCVButton';
//mport FilesPreview from './FilesPreview';
//import SubmitButton from './SubmitButton';

function AdminImportSection() {
  const [excelFile, setExcelFile] = useState(null);
  const [cvFile, setCVFile] = useState(null);

  return (
    <div>
      <h2>Admin Import Section</h2>
      <UploadExcelButton onFileSelect={setExcelFile} />
      <UploadCVButton onFileSelect={setCVFile} />
            {/* בהמשך נעלה גם את החלקים הבאים 
      <FilesPreview excelFile={excelFile} cvFile={cvFile} />
      <SubmitButton excelFile={excelFile} cvFile={cvFile} />
      */}
    </div>
  );
}

export default AdminImportSection;
