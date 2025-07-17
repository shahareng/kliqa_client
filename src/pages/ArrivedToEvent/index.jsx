import { FiAtSign, FiCalendar, FiMapPin, FiPhone, FiSmile, FiUser } from "react-icons/fi"
import style from "./style.module.css"
import useApi from "../../hooks/useApi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserInfoField from "../../components/UserInfoField";

const formLabels = [
    {
        title: "First Name",
        icon: <FiUser />,
        name: "first_name"
    },
    {
        title: "Last Name",
        icon: <FiUser />,
        name: "last_name"
    },
    {
        title: "Phone",
        icon: <FiPhone />,
        name: "phone"
    },
    {
        title: "Email",
        icon: <FiAtSign />,
        name: "email"
    }
]

function ArrivedToEvent() {

    const { id } = useParams()
    const [isEditing, setIsEditing] = useState(true)

    let { data, loading, error, callApi: fetchEvent } = useApi(`/events/${id}`)
    // const {
    //     callApi: saveUser,
    // } = useApi(`/users/add`, "POST", user);

    useEffect(() => {
        fetchEvent()
            .catch(err => console.error("get event error", err));
    }, []);

    if (loading) return <div>Loading...</div>
    if (error) return error

    return <div className={style.arrived_page}>
        <div className={style.description}>
            <h1>{data.event_name}</h1>
            <h3><i><FiCalendar /></i>{data.event_date}</h3>
            <h3><i><FiMapPin /></i>{data.location}</h3>
        </div>
        <form onSubmit={() => alert("Thanks!")} className={style.form_register}>
            <div className={style.fileds}>
                {formLabels.map((label, i) => <UserInfoField
                    title={label.title} data={""} icon={label.icon} isEditing={isEditing} name={label.name} type={label.type} />)}
            </div>
            <button type="submit" className={style.here}>I Am Here <i><FiSmile /></i></button>
        </form>
        {/* To-Do: 
        1. save user values
        2. get user Id by email or phone
        3. update status of specific event_user to "Arrived*/}
    </div>

}

export default ArrivedToEvent