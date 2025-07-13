import { Outlet } from "react-router-dom"
import style from "./style.module.css"

function MemberDashboard() {

  return (<>
    <h1>hi from MemberDashboard</h1>
    <Outlet />
  </>
  )
}

export default MemberDashboard