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

  const {
    callApi: saveUser,
  } = useApi(`/users/update/105`, "PUT", user);

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
      const res = await saveUser();
      console.log("הנתונים נשמרו בהצלחה", res);
      setIsEditing(!isEditing)
    } catch (err) {
      console.error("update error", err);
    }
  };

  return (
    <div className={style.profile}>
      {!isEditing && <EditBtn isEditing={isEditing} setIsEditing={setIsEditing} type={"button"} />}

      {user?.JobsHistories ?
        isEditing ?
          <form onSubmit={handleSave} className={style.edit_details}>
            <EditBtn isEditing={isEditing} setIsEditing={setIsEditing} type={"submit"} />
            <div className={style.jobs}>
              {user.JobsHistories.map((job, i) => <div className={style.job} key={i}>
                <JobComp job={job} form={true} handleChange={handleChange}/></div>)}
            </div>
          </form>
          :
          <div className={style.jobs}>
            {user.JobsHistories.map((job, i) => <div className={style.job} key={i}>
              <JobComp job={job} form={false} />
            </div>)}
          </div>
        : "No jobs to display"}
    </div>
  )
}

export default Jobs

function JobComp({ job, form, handleChange }) {

  return <>
    <h4><i><MdWorkOutline /></i>{job.company_id}</h4>
    <h5>{job.job_title}</h5>
    {form ?
      <>
        <UserInfoField title={"from"} data={job.start_date} isEditing={isEditing} name={`JobsHistories[${i}].start_date`} handleChange={handleChange} type={"date"} />
        <UserInfoField title={"to"} data={job.end_date} isEditing={isEditing} name={`JobsHistories[${i}].end_date`} handleChange={handleChange} type={"date"} />
      </>
      :
      <>
        <UserInfoField title={"from"} data={job.start_date} icon={<CiCalendarDate />} />
        <UserInfoField title={"to"} data={job.end_date == null ? "today" : job.end_date} icon={<CiCalendarDate />} />
      </>
    }
  </>
}