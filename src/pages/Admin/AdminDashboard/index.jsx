import { Outlet } from "react-router-dom"
import style from "./style.module.css"

function AdminDashboard() {

  return (<>
    <h1>hi from AdminDashboard</h1>
    <Outlet />
  </>
  )
}

export default AdminDashboard