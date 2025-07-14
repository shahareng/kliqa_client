import { Link, Outlet } from "react-router-dom"
import style from "./style.module.css"

function MemberDashboard() {

  return (<div className={style.page}>
    <nav className={style.nav}>
      <Link to="profile">My Profile</Link>
      <Link to="myConnections">My Connections</Link>
    </nav>
    <Outlet />
  </div>
  )
}

export default MemberDashboard