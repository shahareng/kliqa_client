import { useEffect } from "react";
import useApi from "../../../hooks/useApi";
import style from "./style.module.css"
import { NavLink } from "react-router-dom";

const evetData = ["location", "event_date"]

function Events() {

    let { data, loading, error, callApi: fetchEvents } = useApi(`/events`)

    useEffect(() => {
        fetchEvents()
            .catch(err => console.error("get events error", err));
    }, []);

    if (loading) return <div>Loading...</div>
    if (error) return error

    return <div className={style.page}>
        <h1>Events</h1>
        <NavLink className={style.new_event_btn} to={'new'}>Add New Event</NavLink>
        <div className={style.events}>
            {data.sort((a, b) => new Date(a.event_date) - new Date(b.event_date)).map((event, i) => <NavLink key={i} className={style.event} to={`${event.id}`}>
                <h3>{event.event_name}</h3>
                {evetData.map(d => <h4>{event[d]}</h4>)}
            </NavLink>)}
        </div>
    </div>
}

export default Events