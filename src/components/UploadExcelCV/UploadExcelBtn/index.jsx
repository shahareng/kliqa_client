import React, { useRef } from 'react';

function UploadExcelBtn({ onFileSelect }) {
  const inputRef = useRef(null);

  // פותח את דיאלוג בחירת הקובץ
  const handleButtonClick = () => {
    inputRef.current.click();
  };

  // ברגע שנבחר קובץ
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (
      file &&
      (
        file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "application/vnd.ms-excel"
      )
    ) {
      onFileSelect(file); // מדווח להורה
    } else {
      alert("נא לבחור קובץ אקסל בלבד (xls, xlsx)");
      event.target.value = null;
    }
  };

  return (
    <div>
      <button type="button" onClick={handleButtonClick}>
        העלאת קובץ אקסל
      </button>
      <input
        type="file"
        accept=".xlsx,.xls"
        ref={inputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  );
}

export default UploadExcelBtn;
