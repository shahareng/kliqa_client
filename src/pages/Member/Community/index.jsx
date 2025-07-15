import { useContext, useState } from "react";
import style from "./style.module.css"
import EditBtn from "../../../components/EditBtn";
import UserContext from "../../../context/userContext";

import SelectOptions from "../../../components/SelectOptions";
import UserInfoField from "../../../components/UserInfoField";
import { FiBell, FiBellOff, FiUsers } from "react-icons/fi";
import SelectedItem from "../../../components/SelectedItem";

const groupsOptions = [
  { label: "Junior Developers", value: "junior_developers" },
  { label: "Senior Developers", value: "senior_developers" },
  { label: "Full‑Stack Developers", value: "fullstack_developers" },
  { label: "Frontend Developers", value: "frontend_developers" },
  { label: "Backend Developers", value: "backend_developers" },
  { label: "DevOps Engineers", value: "devops_engineers" },
  { label: "UX/UI Designers", value: "ux_ui_designers" },
  { label: "Tech Job Seekers", value: "job_seekers" },
  { label: "Mentors & Educators", value: "mentors_educators" },
  { label: "Open‑Source Contributors", value: "open_source_contributors" },
  { label: "Women in Tech", value: "women_in_tech" },
  { label: "Remote Developers", value: "remote_developers" }
];

const contributionsOptions = [
  { label: "Public Speaking (Meetups, Conferences)", value: "public_speaking" },
  { label: "Workshop & Webinar Hosting", value: "workshop_webinar" },
  { label: "Open‑Source Contributions", value: "open_source" },
  { label: "Technical Articles & Blog Writing", value: "writing_articles" },
  { label: "Mentoring / Coaching", value: "mentoring" },
  { label: "Meetup / Event Organization", value: "event_organization" },
  { label: "Volunteer (e.g. hackathons, code clubs)", value: "volunteering" },
  { label: "Sponsorship / Funding Support", value: "sponsorship" }
];

function Community() {

  const { user, setUser } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (event) => {
    const { name, type, checked, value } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    const nestedMatch = name.match(/^(\w+)\[(\d+)\]\.(\w+)$/);
    if (nestedMatch) {
      const [, arrName, idx, field] = nestedMatch;
      setUser(prev => ({
        ...prev,
        [arrName]: prev[arrName].map((item, i) =>
          i === +idx ? { ...item, [field]: newValue } : item
        )
      }));
    } else {
      setUser(prev => ({ ...prev, [name]: newValue }));
    }
  };

  const handleSelect = (name, selected) => {
    setUser(prev => ({
      ...prev,
      [name]: selected.map(s =>
        name === 'groups'
          ? { group_id: s.value, name: s.value }
          : { contribution_id: s.value, type: s.value }
      )
    }));
  };

  const selectedGroups = groupsOptions.filter(o =>
    user.groups.some(g => g.name === o.value)
  );
  const selectedContributions = contributionsOptions.filter(o =>
    user.contributions.some(c => c.type === o.value)
  );

  return (
    <div className={style.profile}>
      <EditBtn isEditing={isEditing} setIsEditing={setIsEditing} />

      {user?.groups ?
        isEditing ?
          <form onSubmit={() => setIsEditing(!isEditing)} className={style.details}>
            <strong>Groups</strong>
            <SelectOptions name={"groups"} options={groupsOptions} handleSelect={handleSelect} selected={selectedGroups} />
            <UserInfoField title={"Value from the community"} data={user.community_value} icon={<FiUsers />} isEditing={isEditing} name={"community_value"} handleChange={handleChange} type={"textArea"} />
            <div>
              <strong>Community Contribution</strong>
              <SelectOptions name={"contributions"} options={contributionsOptions} handleSelect={handleSelect} selected={selectedContributions} />
            </div>
            <label className={style.updates}>
              <strong>Wants updates</strong>
              <input type="checkbox" name="wants_updates" value={user.wants_updates} onChange={handleChange}/>
            </label>
            {/* <UserInfoField title={"Wants updates"} data={user.wants_updates} isEditing={isEditing} name={"wants_updates"} handleChange={handleChange} type={"checkbox"} /> */}
          </form>
          :
          <div className={style.details}>
            <strong>Groups</strong>
            <div className={style.groups}>
              {user.groups.map((g, i) => <div key={i}>
                <SelectedItem data={g.name} />
              </div>)}
            </div>
            <UserInfoField title={"Value from the community"} data={user.community_value} icon={<FiUsers />} />
            <strong>Community Contribution</strong>
            <div className={style.groups}>
              {user.contributions.map((c, i) => <div key={i}>
                <SelectedItem data={c.type} />
              </div>)}
            </div>
            <p className={style.updates}><strong>Wants updates</strong> <i>{user.wants_updates ? <FiBell /> : <FiBellOff />}</i></p>
            {/* <UserInfoField title={"Wants updates"} icon={user.wants_updates ? <FiBell /> : <FiBellOff />} /> */}
          </div>
        : "loading..."}
    </div>
  )
}

export default Community