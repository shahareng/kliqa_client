import Layout from "./Layout";
import LinkedInPage from "./pages/LinkedinPage/linkedInPage.jsx";
import AdminImportSection from "./components/UploadExcelCV/AdminImportSection";


function App() {

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
        {/*<Layout />*/}
        {/*<LinkedInPage />*/}
       <h1>מערכת ניהול משתמשים</h1>
        <AdminImportSection />
    </div>
  );
};

export default App;