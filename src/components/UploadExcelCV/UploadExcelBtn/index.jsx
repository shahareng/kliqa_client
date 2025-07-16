import React, { useRef } from 'react';

// props:
// onFileSelect: פונקציה שהורה מעביר, שמופעלת כשנבחר קובץ
function UploadExcelBtn({ onFileSelect }) {
  const inputRef = useRef(null);

  // פותח דיאלוג קבצים
  const handleButtonClick = () => {
    inputRef.current.click();
  };

  // נבחר קובץ
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.type === "application/vnd.ms-excel")) {
      onFileSelect(file); // מעביר להורה
    } else {
      alert("יש לבחור קובץ אקסל בלבד (xls, xlsx)");
      event.target.value = null;
    }
  };

  return (
    <div>
      <button type="button" onClick={handleButtonClick}>
        העלה קובץ אקסל
      </button>
      <input
        type="file"
        accept=".xlsx,.xls"
        style={{ display: "none" }}
        ref={inputRef}
        onChange={handleFileChange}
      />
    </div>
  );
}

export default UploadExcelBtn;
