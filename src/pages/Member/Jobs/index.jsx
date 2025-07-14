import { useContext, useState } from "react";
import style from "./style.module.css"
import EditBtn from "../../../components/EditBtn";
import UserContext from "../../../context/userContext";

function Jobs() {

  const { user, setUser } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);

  // const handleChange = (event) => {
  //   const name = event.target.name;
  //   const value = event.target.value;
  //   setUser(values => ({ ...values, [name]: value }))
  // }

  const handleChange = event => {
    const { name, value } = event.target;
    const nestedMatch = name.match(/^(\w+)\[(\d+)\]\.(\w+)$/);

    if (nestedMatch) {
      const [, arrName, idx, field] = nestedMatch;
      setUser(prev => ({
        ...prev,
        [arrName]: prev[arrName].map((item, i) =>
          i === +idx ? { ...item, [field]: value } : item
        )
      }));
    } else {
      setUser(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className={style.profile}>
      <h1>Jobs</h1>
      <EditBtn isEditing={isEditing} setIsEditing={setIsEditing} />

      {user?.jobs_history ?
        isEditing ?
          <form onSubmit={() => setIsEditing(!isEditing)} className={style.edit_details}>
            <div>
              {user.jobs_history.map((job, i) => <div className={style.job} key={i}>
                <label>
                  <strong>Company</strong>
                  <input name={`jobs_history[${i}].company`} value={job.company} onChange={handleChange} />
                  <input type="date" name={`jobs_history[${i}].from`} value={job.from} onChange={handleChange} />
                  <input type="date" name={`jobs_history[${i}].to`} value={job.to == null ? (new Date().toISOString().split('T')[0]) : job.to} onChange={handleChange} />
                </label>
              </div>)}
            </div>
          </form>
          :
          <div>
            {user.jobs_history.map((job, i) => <div className={style.job} key={i}>
              <p>{job.company}&emsp;&emsp; {job.from} - {job.to == null ? "today" : job.to}</p>
            </div>)}
          </div>
        : "loading..."}
    </div>
  )
}

export default Jobs