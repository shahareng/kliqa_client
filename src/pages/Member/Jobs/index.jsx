import { useContext, useState } from "react";
import style from "./style.module.css"
import EditBtn from "../../../components/EditBtn";
import UserContext from "../../../context/userContext";
import UserInfoField from "../../../components/UserInfoField";
import { MdWorkOutline } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";

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
      {/* <h1>Jobs</h1> */}
      <EditBtn isEditing={isEditing} setIsEditing={setIsEditing} />

      {user?.jobs_history ?
        isEditing ?
          <form onSubmit={() => setIsEditing(!isEditing)} className={style.edit_details}>
            <div className={style.jobs}>
              {user.jobs_history.map((job, i) => <div className={style.job} key={i}>
                <h4>{job.company}</h4>
                <UserInfoField title={"from"} data={job.from} isEditing={isEditing} name={`jobs_history[${i}].from`} handleChange={handleChange} type={"date"} />
                <UserInfoField title={"to"} data={job.to} isEditing={isEditing} name={`jobs_history[${i}].to`} handleChange={handleChange} type={"date"} />
              </div>)}
            </div>
          </form>
          :
          <div className={style.jobs}>
            {user.jobs_history.map((job, i) => <div className={style.job} key={i}>
              <h4>{job.company}</h4>
              <UserInfoField title={"from"} data={job.from} icon={<CiCalendarDate />} />
              <UserInfoField title={"to"} data={job.to == null ? "today" : job.to} icon={<CiCalendarDate />} />
            </div>)}
          </div>
        : "loading..."}
    </div>
  )
}

export default Jobs