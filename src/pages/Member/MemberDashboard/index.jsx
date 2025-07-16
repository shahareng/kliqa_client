import { NavLink, Outlet } from "react-router-dom"
import style from "./style.module.css"
import { useEffect, useState } from "react";
import UserContext from "../../../context/userContext";
import useApi from "../../../hooks/useApi";

const userA = {
  // "profile_picture": "https://randomuser.me/api/portraits/men/32.jpg",
  "profile_picture": "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg",
  "id": "c793a2e1-4b5f-4d23-9f18-0b8c1e7f2a1b",
  "first_name": "David",
  "last_name": "Levi",
  "english_name": "David Levi",
  "phone": "+1-202-555-0123",
  "email": "david.levi@example.com",
  "city": "Tel Aviv",
  "jobs_history": [
    { "job_id": 201, "company": "ACME Ltd", "from": "2018-01-01", "to": "2020-12-01" },
    { "job_id": 202, "company": "TechX", "from": "2021-01-01", "to": null }
  ],
  "groups": [
    { "group_id": 301, "name": "junior_developers" },
    { "group_id": 302, "name": "job_seekers" }
  ],
  "years_of_experience": 7,
  "linkedin_url": "https://www.linkedin.com/in/davidlevi",
  "facebook_url": "https://www.facebook.com/david.levi",
  "community_value": "A strong contributor to community projects",
  "contributions": [
    { "contribution_id": 401, "type": "volunteering", "year": 2022 },
    { "contribution_id": 402, "type": "sponsorship", "year": 2023 }
  ],
  "internal_tags": ["mentor", "speaker"],
  "additional_info": "Leads React workshops and contributes to open-source projects.",
  "wants_updates": false,
  "admin_notes": "Interested in education-related projects. Consider for leadership roles."
}

function MemberDashboard() {

  const [user, setUser] = useState(null);
  // const [user, setUser] = useState(userA);

  let { data, loading, error, callApi: fetchUser } = useApi(`/users/105`)

  useEffect(() => {
    fetchUser()
      .then(res => setUser(res))
      .catch(err => console.error("שגיאה ב‑GET משתמש:", err));
  }, []);

  if (loading) return <div>Loading...</div>
  if (error) return error

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className={style.page}>
        <nav className={style.member_nav}>
          {/* <NavLink to="profile">My Profile</NavLink>
      <NavLink to="myConnections">My Connections</NavLink> */}
          <NavLink to="general" className={({ isActive }) => (isActive ? style.active : '')}>General</NavLink>
          <NavLink to="jobs" className={({ isActive }) => (isActive ? style.active : '')}>Jobs</NavLink>
          <NavLink to="community" className={({ isActive }) => (isActive ? style.active : '')}>Community</NavLink>
        </nav>
        <Outlet />
      </div>
    </UserContext.Provider>
  )
}

export default MemberDashboard