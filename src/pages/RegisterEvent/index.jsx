import { useParams } from "react-router-dom"
import style from "./style.module.css"
import useApi from "../../hooks/useApi";
import { useEffect, useState } from "react";
import UserInfoField from "../../components/UserInfoField";
import { FiAtSign, FiCalendar, FiMapPin, FiPhone, FiUser } from "react-icons/fi";
import LinkedInPage from "../LinkedinPage/linkedInPage";

const img = "https://images.unsplash.com/photo-1733222765056-b0790217baa9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

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

function RegisterEvent() {

    const { id } = useParams()
    const [isEditing, setIsEditing] = useState(true)
    const [registed, setRegisted] = useState(false)
    const [user, setUser] = useState(
        {
            id: Math.floor(Math.random() * 900) + 100,
            first_name: "",
            last_name: "",
            phone: "",
            email: "",

        }
    )

    let { data, loading, error, callApi: fetchEvent } = useApi(`/events/${id}`)
    const {
        callApi: saveUser,
    } = useApi(`/users/add`, "POST", user);
    // TO-DO: After create user, we need to creat event_user

    useEffect(() => {
        fetchEvent()
            .catch(err => console.error("get event error", err));
    }, []);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser(values => ({ ...values, [name]: value }))
    }

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const res = saveUser();
            console.log("הנתונים נשמרו בהצלחה", res);
            setIsEditing(!isEditing)
            setRegisted(true)
        } catch (err) {
            console.error("update error", err);
            alert(`Error: ${err.response.data}`)
        }
    }

    if (loading) return <div>Loading...</div>
    if (error) return error

    return <div className={style.register_page}>
        <div className={style.details}>
            <img src={img} alt="event_img" className={style.event_img} />
            <div className={style.description}>
                <h1>{data.event_name}</h1>
                <h3><i><FiCalendar /></i>{data.event_date}</h3>
                <h3><i><FiMapPin /></i>{data.location}</h3>
                <p>
                    Join us for an inspiring evening of community connection and knowledge sharing. Whether you're looking to expand your network, learn something new, or simply enjoy great conversations, this event offers:
                </p>
                <ul>
                    <li>Engaging Talks: Hear from industry experts on [insert topics].</li>
                    <li>Networking Opportunities: Meet like-minded individuals and expand your professional circle.</li>
                    <li>Interactive Discussions: Participate in open forums and Q&amp;A sessions.</li>
                </ul>
                <p>Why Attend?</p>
                <ul>
                    <li>Expand Your Knowledge: Gain insights into [insert topics].</li>
                    <li>Build Connections: Meet professionals and enthusiasts in your field.</li>
                    <li>Enjoy a Relaxed Atmosphere: Unwind and engage in meaningful conversations.</li>
                    <li>Limited spots available! Reserve your seat now and be part of this enriching experience.</li>
                </ul>
            </div>
        </div>
        {new Date(data.event_date) > new Date() ?
            <div className={style.register}>
                {!registed ?
                    <>
                        <h4>Register Now:</h4>
                        <LinkedInPage />
                        <h4>---- OR ----</h4>
                        <form onSubmit={handleSave} className={style.form_register}>
                            <div className={style.fileds}>
                                {formLabels.map((label, i) => <UserInfoField
                                    title={label.title} data={user[label.name]} icon={label.icon} isEditing={isEditing} name={label.name} handleChange={handleChange} type={label.type} />)}
                            </div>
                            <button type="submit" className={style.register_btn}>Register</button>
                        </form>
                    </>
                    :
                    <div>You have successfully registered!</div>
                }
            </div>
            :
            <div className={style.register}>The event has concluded—thank you for your interest. We look forward to welcoming you at future events</div>}
    </div>

}

export default RegisterEvent