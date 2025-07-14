// src/pages/Admin/UsersCards/index.jsx
import { useState } from "react";
import styles from "./style.module.css";
import UserCard from "../../../components/userCardComp/UserCard";
import SearchInput from "../../../components/SearchInput/index";

const img = "https://randomuser.me/api/portraits/men/32.jpg";

const users = [
  {
    name: "John Doe",
    occupation: "Full Stack Developer",
    imageUrl: img,
    additionalInfo: "Experienced in building scalable web apps."
  },
  {
    name: "Dan Cohen",
    occupation: "Product Manager",
    imageUrl: img,
    additionalInfo: "Leads cross-functional teams and drives strategy."
  },
  {
    name: "Sara Levi",
    occupation: "UX Designer",
    imageUrl: img,
    additionalInfo: "Specializes in user research and prototyping."
  }
];

function UsersCards() {
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.occupation} ${user.additionalInfo}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Professional Network</h1>
      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder="Search users..."
      />

      <div className={styles.grid}>
        {filteredUsers.map((user, idx) => (
          <UserCard
            key={idx}
            name={user.name}
            occupation={user.occupation}
            imageUrl={user.imageUrl}
            additionalInfo={user.additionalInfo}
          />
        ))}
      </div>
    </div>
  );
}

export default UsersCards;
