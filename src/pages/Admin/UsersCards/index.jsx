// src/pages/Admin/UsersCards/index.jsx
import { useEffect, useState } from "react";
import styles from "./style.module.css";
import UserCard from "../../../components/userCardComp/UserCard";
import SearchInput from "../../../components/SearchInput/index";
import useApi from "../../../hooks/useApi";
import SearchComp from "../../../components/SearchComp";

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
  const [selectedGroups, setSelectedGroups] = useState([]);

  let { data, loading, error, callApi: fetchUser } = useApi(`/users`)
  let { data: groups, loading: loadGroups, error: errorgroups, callApi: fetchgroups } = useApi(`/groups`)

  useEffect(() => {
    fetchUser()
      .catch(err => console.error("get users error", err));

    fetchgroups()
      .catch(err => console.error("get groups error", err));

  }, []);

  if (loading || loadGroups) return <div>Loading...</div>
  if (error) return error

  const groupsNames = groups.map(u => ({ value: u.name, label: u.name }));

  const filteredUsers = data.filter((user) =>
    `${user.first_name} ${user.last_name} ${user.JobsHistories[0]?.job_title || "looking for job"} ${user.additional_info}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // const handleSelect = (option) => {
  //   setSelectedGroups(option);
  //   console.log("נבחר:", option);
  // };

  const handleSelect = (name, selected) => {
    console.log("selected", selected);
    // setSelectedGroups(selected.map(s => s.value))
    // groupsNames.filter(o =>
    //   selectedGroups?.some(g => g.name === o.value));
    setSelectedGroups(prev => [...prev, selected[0].value])
    console.log("sel1 ", selected.map(s => s.value));
    console.log("sel ", selectedGroups);
  };

  // const handleSelect = (name, selected) => {
  // setSelectedGroups(prev => ({
  //   ...prev,
  //   [name]: selected.map(s =>
  //     name === 'groups'
  //       ? { group_id: s.value, name: s.value }
  //       : { contribution_id: s.value, type: s.value }
  //   )
  // }));
  // setSelectedGroups.push()
  // };

  // const selectedGroups = groupsNames.filter(o =>
  //   user.groups.some(g => g.name === o.value)
  // );

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.pageTitle}>All Members</h1>
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
      {loadGroups ? 'loading...' :
        <SearchComp
          search={search} setSearch={setSearch} placeholder={"Search users..."}
          name={"Groups"} options={groupsNames} handleSelect={handleSelect} selected={selectedGroups} />}
    </div>
  );
}

export default UsersCards;
