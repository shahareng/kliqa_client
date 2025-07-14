import style from "./style.module.css"
import { useNavigate,  Outlet } from 'react-router-dom';

function AdminDashboard() {

  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className={style.adminDashboard}>
      <h1>ברוך הבא, אדמין 👋</h1>
      <div className={style.buttonGrid}>
        <button   className={style.adminButton} onClick={() => handleNavigate('/admin/events')}>📅 ניהול אירועים</button>
        <button   className={style.adminButton} onClick={() => handleNavigate('/admin/users')}>👤 חיפוש משתמשים</button>
        <button   className={style.adminButton} onClick={() => handleNavigate('/admin/connections')}>🔗 קשרים בין משתמשים</button>
        <button   className={style.adminButton} onClick={() => handleNavigate('/logout')}>🚪 יציאה מהמערכת</button>
      </div>
      <Outlet />
    </div>
  );
}

export default AdminDashboard