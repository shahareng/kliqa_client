import { NavLink, useParams } from "react-router-dom"
import style from "./style.module.css"
import useApi from "../../../hooks/useApi"
import { useEffect } from "react"
import { FiAtSign, FiCalendar, FiCheckCircle, FiExternalLink, FiMapPin, FiPhone, FiUser, FiUsers } from "react-icons/fi"
import { MdWorkOutline } from "react-icons/md"

function Event() {

    const { id } = useParams()

    let { data, loading, error, callApi: fetchEvent } = useApi(`/events/${id}`)
    let { data: event_user, loading: loadEventUsers, error: errEU, callApi: fetchEventUser } = useApi(`/event_users/event/${id}`)

    useEffect(() => {
        fetchEvent()
            .catch(err => console.error("get event error", err));
        fetchEventUser()
            .catch(err => console.error("get event_user error", err));
    }, []);

    if (loading || loadEventUsers) return <div>Loading...</div>
    if (error || errEU) return error

    return <div className={style.event_page}>
        <div>
            <div className={style.links}>
                <NavLink to={`/events/register/${id}`} target="_blank" className={style.external_link}>
                    <i><FiExternalLink /></i>
                    View Event Registration Page
                </NavLink>
                <NavLink to={`/events/arrived_to/${id}`} target="_blank" className={style.external_link}>
                    <i><FiExternalLink /></i>
                    View Event Arrive Page
                </NavLink>
            </div>
            <div className={style.details}>
                <h1>{data.event_name}</h1>
                <h3><i><FiCalendar /></i>{data.event_date}</h3>
                <h3><i><FiMapPin /></i>{data.location}</h3>
                <h3><i><FiUsers /></i>Total registrants: {event_user.length}</h3>
            </div>
        </div>
        {event_user.length != 0 ?
            <div className={style.user_table}>
                <div className={`${style.row} ${style.header}`}>
                    <h3><i><FiUser /></i>Full Name</h3>
                    <h3><i><FiPhone /></i>Phone</h3>
                    <h3><i><FiAtSign /></i>Email</h3>
                    <h3><i><FiMapPin /></i>City</h3>
                    <h3><i><MdWorkOutline /></i>Experience</h3>
                    <h3><i><FiCheckCircle /></i>Status</h3>
                </div>
                {event_user.map((eventUser, i) => {
                    const u = eventUser.User;
                    return (
                        <div className={style.row} key={i}>
                            <h4>{u.first_name} {u.last_name}</h4>
                            <h4>{u.phone}</h4>
                            <h4>{u.email}</h4>
                            <h4>{u.city}</h4>
                            <h4>{u.years_of_experience} years</h4>
                            {i != 3 ? <h4 className={style.status_a}>Arrived</h4> : <h4 className={style.status_r}>Registered</h4>}
                        </div>
                    )
                })}
            </div>
            : 'No people registered'}
    </div>
}

export default Event