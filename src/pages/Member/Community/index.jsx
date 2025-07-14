import { useContext, useState } from "react";
import style from "./style.module.css"
import EditBtn from "../../../components/EditBtn";
import UserContext from "../../../context/userContext";

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

  return (
    <div className={style.profile}>
      <h1>Community</h1>
      <EditBtn isEditing={isEditing} setIsEditing={setIsEditing} />

      {user?.full_name ?
        isEditing ?
          <form onSubmit={() => setIsEditing(!isEditing)} className={style.edit_details}>
            <div>
              <h4>Groups</h4>
              {user.groups.map((g, i) => <div className={style.group} key={i}>
                <p>{g.name}</p>
              </div>)}
            </div>
            <label>
              <strong>Value from the community</strong>
              <textarea name="community_value" value={user.community_value} onChange={handleChange} />
            </label>
            <div>
              <h4>Community Contribution</h4>
              {user.contributions.map((c, i) => <div className={style.con} key={i}>
                <p>{c.type}</p>
              </div>)}
            </div>
            <label>
              <strong>Wants updates</strong>
              <input type="checkbox" name="wants_updates" checked={user.wants_updates} onChange={handleChange} />
            </label>
          </form>
          :
          <div className={style.details}>
            <div>
              <h4>Groups</h4>
              {user.groups.map((g, i) => <div className={style.group} key={i}>
                <p>{g.name}</p>
              </div>)}
            </div>
            <p><strong>Value from the community:</strong> {user.community_value}</p>
            <div>
              <h4>Community Contribution</h4>
              {user.contributions.map((c, i) => <div className={style.con} key={i}>
                <p>{c.type}</p>
              </div>)}
            </div>
            <p><strong>Wants updates:</strong> {user.wants_updates == true ? "yes" : "no"}</p>
          </div>
        : "loading..."}
    </div>
  )
}

export default Community