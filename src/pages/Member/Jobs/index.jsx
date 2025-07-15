import { useContext, useState } from "react";
import style from "./style.module.css"
import EditBtn from "../../../components/EditBtn";
import UserContext from "../../../context/userContext";
import UserInfoField from "../../../components/UserInfoField";
import { MdWorkOutline } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";
import useApi from "../../../hooks/useApi";

function Jobs() {

  const { user, setUser } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);

  const { data, loading, error, put } = useApi();

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

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const updated = await put("users/update/11", {
        body: user,
        enableLogging: true,
      });
      setIsEditing(!isEditing)
    } catch (err) {
      console.error("update error", err);
    }
  };

  return (
    <div className={style.profile}>
      {!isEditing && <EditBtn isEditing={isEditing} setIsEditing={setIsEditing} type={"button"} />}

      {user?.jobs_history ?
        isEditing ?
          <form onSubmit={() => setIsEditing(!isEditing)} className={style.edit_details}>
            <EditBtn isEditing={isEditing} setIsEditing={setIsEditing} type={"submit"} />
            <div className={style.jobs}>
              {user.JobsHistories.map((job, i) => <div className={style.job} key={i}>
                <h4>{job.company_id}</h4>
                <h5>{job.job_title}</h5>
                <UserInfoField title={"from"} data={job.start_date} isEditing={isEditing} name={`JobsHistories[${i}].start_date`} handleChange={handleChange} type={"date"} />
                <UserInfoField title={"to"} data={job.end_date} isEditing={isEditing} name={`JobsHistories[${i}].end_date`} handleChange={handleChange} type={"date"} />
              </div>)}
            </div>
          </form>
          :
          <div className={style.jobs}>
            {user.JobsHistories.map((job, i) => <div className={style.job} key={i}>
              <h4>{job.company_id}</h4>
              <h5>{job.job_title}</h5>
              <UserInfoField title={"from"} data={job.start_date} icon={<CiCalendarDate />} />
              <UserInfoField title={"to"} data={job.end_date == null ? "today" : job.end_date} icon={<CiCalendarDate />} />
            </div>)}
          </div>
        : "loading..."}
    </div>
  )
}

export default Jobs