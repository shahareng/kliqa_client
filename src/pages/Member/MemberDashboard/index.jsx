import { Link, Outlet } from "react-router-dom"
import style from "./style.module.css"
import { useState } from "react";
import UserContext from "../../../context/userContext";

const userA = {
  "img" : "https://randomuser.me/api/portraits/men/32.jpg",
  "id": "c793a2e1-4b5f-4d23-9f18-0b8c1e7f2a1b",
  "full_name": "דוד לוי",
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
  "wants_updates": true,
  "admin_notes": "Interested in education-related projects. Consider for leadership roles."
}

function MemberDashboard() {

  const [user, setUser] = useState(userA);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className={style.page}>
        <nav className={style.nav}>
          {/* <Link to="profile">My Profile</Link>
      <Link to="myConnections">My Connections</Link> */}
          <Link to="general">General</Link>
          <Link to="jobs">Jobs</Link>
          <Link to="community">Community</Link>
        </nav>
        <Outlet />
      </div>
    </UserContext.Provider>
  )
}

export default MemberDashboard