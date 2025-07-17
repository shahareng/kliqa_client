import { FiCalendar, FiLink, FiLogOut, FiUser } from "react-icons/fi";
import style from "./style.module.css"
import { Outlet, NavLink } from 'react-router-dom';
import GPTUserCreate from "../gpt";

import AdminImportSection from "../../../components/UploadExcelCV/AdminImportSection";

const navs = [
  {
    to: '/admin/users',
    title: "All Members",
    icon: <FiUser />
  },
  {
    to: '/admin/events',
    title: "Events",
    icon: <FiCalendar />
  },
  {
    to: '/admin/connections',
    title: "Connections",
    icon: <FiLink />
  },
  {
    to: '/',
    title: "LogOut",
    icon: <FiLogOut />
  },
  {
  to: '/admin/gpt',
  title: "Add via GPT",
  icon: <FiUser />
}

]

function AdminDashboard() {

  return (
    <div className={style.adminDashboard}>
      <div className={style.menu}>
        <h2 className={style.header}>
          Welcome To
          <img className={style.logo} src="kliqaImg.png" alt="kliqa_logo" />
          <GPTUserCreate/>
        </h2>
        <div className={style.line}></div>
        <nav className={style.admin_nav}>
          {navs.map((nav, i) => <NavLink className={({ isActive }) => (isActive ? style.active : '')} to={nav.to} key={i}>
            {nav.title}
            <i>{nav.icon}</i>
          </NavLink>)}
          <div className={style.upload}>
            <AdminImportSection />
          </div>
        </nav>
      </div>
      <Outlet />
    </div>
  );
}

export default AdminDashboard