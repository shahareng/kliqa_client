import { FiCalendar, FiFileText, FiMapPin, FiTag } from "react-icons/fi"
import UserInfoField from "../../../components/UserInfoField"
import style from "./style.module.css"
import { useState } from "react"
import EditBtn from "../../../components/EditBtn"
import useApi from "../../../hooks/useApi"
import { useNavigate } from "react-router-dom"

const formLabels = [
    {
        title: "Event Name",
        icon: <FiTag />,
        name: "event_name",
        type: "text"
    },
    {
        title: "Event Type",
        icon: <FiFileText />,
        name: "event_type",
        type: "select"
    },
    {
        title: "Location",
        icon: <FiMapPin />,
        name: "location",
        type: "text"
    },
    {
        title: "Date",
        icon: <FiCalendar />,
        name: "event_date",
        type: "date"
    }
]

function NewEvent() {

    const [isEditing, setIsEditing] = useState(true)
    const [eventObj, setEventObj] = useState(
        {
            id: Math.floor(Math.random() * 900) + 100,
            event_name: "",
            event_type: "",
            location: "",
            event_date: ""
        })

    const {
        callApi: saveEvent,
    } = useApi(`/events/add`, "POST", eventObj);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setEventObj(values => ({ ...values, [name]: value }))
    }

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const res = await saveEvent();
            console.log("הנתונים נשמרו בהצלחה", res);
            setIsEditing(!isEditing)
            navigate('/admin/events')
            alert("The event was created successfully")
        } catch (err) {
            console.error("update error", err);
            alert(`Error: ${err.response.data}`)
        }
    }

    return <div className={style.new_event}>
        <h1>New Event</h1>
        {!isEditing && <EditBtn isEditing={isEditing} setIsEditing={setIsEditing} type={"button"} />}
        <form onSubmit={handleSave} className={style.form}>
            {isEditing && <EditBtn isEditing={isEditing} setIsEditing={setIsEditing} type={"submit"} />}
            <div className={style.fileds}>
                {formLabels.map((label, i) => <UserInfoField
                    title={label.title} data={eventObj[label.name]} icon={label.icon} isEditing={isEditing} name={label.name} handleChange={handleChange} type={label.type} />)}
            </div>
        </form>
    </div>
}

export default NewEvent