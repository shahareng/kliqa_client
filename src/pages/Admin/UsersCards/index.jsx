// src/pages/Admin/UsersCards/index.jsx
import { useEffect, useState } from "react";
import styles from "./style.module.css";
import UserCard from "../../../components/userCardComp/UserCard";
import SearchInput from "../../../components/SearchInput/index";
import useApi from "../../../hooks/useApi";

const img = "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg";

// const users = [
//   {
//     id: 91,
//     name: "David Levi",
//     occupation: "Full Stack Developer",
//     imageUrl: img,
//     additionalInfo: "Specializes in user research and prototyping"
//   },
//   {
//     id: 23,
//     name: "John Doe",
//     occupation: "Full Stack Developer",
//     imageUrl: img,
//     additionalInfo: "Experienced in building scalable web apps."
//   },
//   {
//     id: 56,
//     name: "Dan Cohen",
//     occupation: "Product Manager",
//     imageUrl: img,
//     additionalInfo: "Leads cross-functional teams and drives strategy."
//   },
//   {
//     id: 72,
//     name: "Sara Levi",
//     occupation: "UX Designer",
//     imageUrl: img,
//     additionalInfo: "Specializes in user research and prototyping."
//   },
//   {
//     id: 81,
//     name: "Dan Cohen",
//     occupation: "Product Manager",
//     imageUrl: img,
//     additionalInfo: "Leads cross-functional teams and drives strategy."
//   },
//   {
//     id: 53,
//     name: "Sara Levi",
//     occupation: "UX Designer",
//     imageUrl: img,
//     additionalInfo: "Specializes in user research and prototyping."
//   },
//   {
//     id: 92,
//     name: "Sara Levi",
//     occupation: "UX Designer",
//     imageUrl: img,
//     additionalInfo: "Specializes in user research and prototyping."
//   }
// ];

function UsersCards() {
  const [search, setSearch] = useState("");

  let { data, loading, error, callApi: fetchUser } = useApi(`/users`)

  useEffect(() => {
    fetchUser()
      // .then(res => setUser(res))
      .catch(err => console.error("שגיאה ב‑GET משתמשים:", err));
  }, []);

  if (loading) return <div>Loading...</div>
  if (error) return error

  const filteredUsers = data.filter((user) =>
    `${user.first_name} ${user.last_name} ${user.JobsHistories[0]?.job_title || "looking for job"} ${user.additional_info}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.titles}>
        <h1 className={styles.pageTitle}>All Members</h1>
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search users..."
        />
      </div>

      <div className={styles.grid}>
        {filteredUsers.map((user, idx) => (
          <UserCard
            key={idx}
            id={user.id}
            name={`${user.first_name} ${user.last_name}`}
            occupation={user.JobsHistories[0]?.job_title || "looking for job"}
            imageUrl={img || user.profile_picture}
            additionalInfo={user.additional_info}
          />
        ))}
      </div>
    </div>
  );
}

export default UsersCards;
