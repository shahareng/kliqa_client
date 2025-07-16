import { FiLink, FiLogOut, FiUser } from "react-icons/fi";
import style from "./style.module.css"
import { Outlet, NavLink } from 'react-router-dom';

const navs = [
  {
    to: '/admin/users',
    title: "All Members",
    icon: <FiUser />
  },
  {
    to: '/admin/connections',
    title: "Connections",
    icon: <FiLink />
  },
  {
    to: '/logout',
    title: "LogOut",
    icon: <FiLogOut />
  }
]

function AdminDashboard() {

  return (
    <div className={style.adminDashboard}>
      <div className={style.menu}>
        <h1>Welcome!</h1>
        <nav className={style.admin_nav}>
          {navs.map((nav, i) => <NavLink className={({ isActive }) => (isActive ? style.active : '')} to={nav.to} key={i}>
            {nav.title}
            <i>{nav.icon}</i>
          </NavLink>)}
        </nav>
      </div>
      <Outlet />
    </div>
  );
}

export default AdminDashboard