import { useContext, useEffect, useState } from "react";
import style from "./style.module.css"
import EditBtn from "../../../components/EditBtn";
import UserContext from "../../../context/userContext";

import SelectOptions from "../../../components/SelectOptions";
import UserInfoField from "../../../components/UserInfoField";
import { FiBell, FiBellOff, FiUsers } from "react-icons/fi";
import SelectedItem from "../../../components/SelectedItem";
import useApi from "../../../hooks/useApi";

// const groupsOptions = [
//   { label: "Junior Developers", value: "junior_developers" },
//   { label: "Senior Developers", value: "senior_developers" },
//   { label: "Full‑Stack Developers", value: "fullstack_developers" },
//   { label: "Frontend Developers", value: "frontend_developers" },
//   { label: "Backend Developers", value: "backend_developers" },
//   { label: "DevOps Engineers", value: "devops_engineers" },
//   { label: "UX/UI Designers", value: "ux_ui_designers" },
//   { label: "Tech Job Seekers", value: "job_seekers" },
//   { label: "Mentors & Educators", value: "mentors_educators" },
//   { label: "Open‑Source Contributors", value: "open_source_contributors" },
//   { label: "Women in Tech", value: "women_in_tech" },
//   { label: "Remote Developers", value: "remote_developers" }
// ];

// const contributionsOptions = [
//   { label: "Public Speaking (Meetups, Conferences)", value: "public_speaking" },
//   { label: "Workshop & Webinar Hosting", value: "workshop_webinar" },
//   { label: "Open‑Source Contributions", value: "open_source" },
//   { label: "Technical Articles & Blog Writing", value: "writing_articles" },
//   { label: "Mentoring / Coaching", value: "mentoring" },
//   { label: "Meetup / Event Organization", value: "event_organization" },
//   { label: "Volunteer (e.g. hackathons, code clubs)", value: "volunteering" },
//   { label: "Sponsorship / Funding Support", value: "sponsorship" }
// ];

function Community() {

  const { user, setUser } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);

  let { data: contributionsOptions, loading, error, callApi: fetchCommunityValues } = useApi(`/community_values`)

  const {
    callApi: saveUser,
  } = useApi(`/users/update/105`, "PUT", user);

  useEffect(() => {
    fetchCommunityValues()
      .catch(err => console.error("get event error", err));
  }, []);

  // const handleChange = (event) => {
  //   const { name, type, checked, value } = event.target;
  //   const newValue = type === 'checkbox' ? checked : value;
  //   const nestedMatch = name.match(/^(\w+)\[(\d+)\]\.(\w+)$/);
  //   if (nestedMatch) {
  //     const [, arrName, idx, field] = nestedMatch;
  //     setUser(prev => ({
  //       ...prev,
  //       [arrName]: prev[arrName].map((item, i) =>
  //         i === +idx ? { ...item, [field]: newValue } : item
  //       )
  //     }));
  //   } else {
  //     setUser(prev => ({ ...prev, [name]: newValue }));
  //   }
  // };

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setUser(prev => ({ ...prev, [name]: val }));
  };

  const handleSelect = (selected) => {
    setUser(prev => ({
      ...prev,
      CommunityValue: selected,
    }));
  };

  // const handleSelect = (name, selected) => {
  //   setUser(prev => ({
  //     ...prev,
  //     [name]: selected.map(s => s.id)
  //   }));
  //   // setUser(prev => ({ ...prev, [name]: selected }));
  // };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await saveUser();
      console.log("הנתונים נשמרו בהצלחה", res);
      setIsEditing(!isEditing)
    } catch (err) {
      console.error("update error", err);
    }
  };

  if (loading) return <div>Loading...</div>
  if (error) return error

  // const selectedContributions = contributionsOptions.filter(o =>
  //   user.CommunityValue?.some(c => c.name === o.name)
  // );

  const options = contributionsOptions.map(o => ({
    value: o.id,
    label: o.name,
  }));

  // not work so well. need to fix
  const selected = Array.isArray(user.CommunityValue)
    ? user.CommunityValue.map(c => ({
      value: c.id,
      label: c.name,
    }))
    : [];

  return (
    <div className={style.profile}>
      {user?.first_name ?
        <>
          {!isEditing && <EditBtn isEditing={isEditing} setIsEditing={setIsEditing} type={"button"} />}

          {isEditing ?
            <form onSubmit={handleSave} className={style.details}>
              <EditBtn isEditing={isEditing} setIsEditing={setIsEditing} type={"submit"} />
              <UserInfoField title={"Value from the community"} data={user.need_from_community} icon={<FiUsers />} isEditing={isEditing} name={"need_from_community"} handleChange={handleChange} type={"textArea"} />
              <div>
                <strong>Community Contribution</strong>
                <SelectOptions name={"CommunityValue"} options={options} handleSelect={handleSelect} selected={selected} />
              </div>
              <label className={style.updates}>
                <strong>Wants updates</strong>
                <input type="checkbox" name="wants_updates" checked={user.wants_updates} onChange={handleChange} />
              </label>
            </form>
            :
            <div className={style.details}>
              <UserInfoField title={"Value from the community"} data={user.need_from_community} icon={<FiUsers />} />
              <strong>Community Contribution</strong>
              <div className={style.groups}>
                {user.CommunityValue?.length ?
                  user.CommunityValue.map((c, i) => <div key={i}>
                    <SelectedItem data={c.name} />
                  </div>)
                  : <div>No results</div>}
              </div>
              <p className={style.updates}><strong>Wants updates</strong> <i>{user.wants_updates ? <FiBell /> : <FiBellOff />}</i></p>
            </div>
          }
        </>
        : "loading..."}
    </div>
  )
}

export default Community