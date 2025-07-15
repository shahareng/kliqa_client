import { NavLink } from "react-router-dom"
import LinkedInPage from "../LinkedinPage/linkedInPage"
import style from "./style.module.css"

function Login() {

  return (<div className={style.login}>
    <h1>Welcome to</h1>
    <img className={style.logo} src="kliqaImg.png" alt="kliqa_logo" />
    <LinkedInPage />
    <NavLink to={'/admin'} className={style.admin}>Sign in as admin</NavLink>
  </div>
  )
}

export default Login