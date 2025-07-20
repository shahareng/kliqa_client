import { NavLink, useParams } from "react-router-dom"
import style from "./style.module.css"
import useApi from "../../../hooks/useApi"
import { useEffect } from "react"
import { FiAtSign, FiCalendar, FiCheckCircle, FiExternalLink, FiMapPin, FiPhone, FiUser, FiUsers } from "react-icons/fi"
import { MdWorkOutline } from "react-icons/md"

const externalLinks = [
    {
        to: `register`,
        icon: <FiExternalLink />,
        content: "View Event Registration Page"
    },
    {
        to: `arrived_to`,
        icon: <FiExternalLink />,
        content: "View Event Arrive Page"
    }
]

const eventTitle = [
    {
        icon: <FiCalendar />,
        data: "event_date",
    },
    {
        icon: <FiMapPin />,
        data: "location"
    },
    {
        icon: <FiUsers />,
        content: "Total registrants: ",
        data: "event_user.length"
    }
]

const userTableColumns = [
    {
        icon: <FiUser />,
        title: "Full Name"
    },
    {
        icon: <FiPhone />,
        title: "Phone"
    },
    {
        icon: <FiAtSign />,
        title: "Email"
    },
    {
        icon: <FiMapPin />,
        title: "City"
    },
    {
        icon: <MdWorkOutline />,
        title: "Experience"
    },
    {
        icon: <FiCheckCircle />,
        title: "Status"
    }
]

const userTableRows = ["phone", "email", "city", "years_of_experience"]

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
                {externalLinks.map((link, i) => <NavLink
                    key={i}
                    to={`/events/${link.to}/${id}`}
                    target="_blank"
                    className={style.external_link}>
                    <i>{link.icon}</i>
                    {link.content}
                </NavLink>)}
            </div>
            <div className={style.details}>
                <h1>{data.event_name}</h1>
                {eventTitle.map((title, i) => <h3 key={i}>
                    <i>{title.icon}</i>
                    {title.content}{title.content ? event_user.length : data[title.data]}
                </h3>)}
            </div>
        </div>
        {event_user.length != 0 ?
            <div className={style.user_table}>
                <div className={`${style.row} ${style.header}`}>
                    {userTableColumns.map((title, i) => <h3 key={i}>
                        <i>{title.icon}</i>
                        {title.title}
                    </h3>)}
                </div>
                {event_user.map((eventUser, i) => {
                    const u = eventUser.User;
                    return (
                        <div className={style.row} key={i}>
                            <h4>{u.first_name} {u.last_name}</h4>
                            {userTableRows.map((row,i) => <h4 key={i}>
                                {u[row]}
                            </h4>)}
                            {i != 3 ? <h4 className={style.status_a}>Arrived</h4> : <h4 className={style.status_r}>Registered</h4>}
                        </div>
                    )
                })}
            </div>
            : 'No people registered'}
    </div>
}

export default Event