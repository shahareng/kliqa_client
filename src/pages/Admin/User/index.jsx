import { useParams } from "react-router-dom";
import style from "./style.module.css"
import { useEffect, useState } from "react";
import EditBtn from "../../../components/EditBtn";
import UserInfoField from "../../../components/UserInfoField";
import { CiCalendarDate } from "react-icons/ci";
import { FiAtSign, FiBell, FiBellOff, FiFacebook, FiInfo, FiLinkedin, FiMapPin, FiPhone, FiUser, FiUsers } from "react-icons/fi";
import SelectOptions from "../../../components/SelectOptions";
import SelectedItem from "../../../components/SelectedItem";
import useApi from "../../../hooks/useApi";

const user1 = {
    id: 1,
    profile_picture: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg",
    first_name: "David",
    last_name: "Levi",
    need_from_community: null,
    phone: "0501234567",
    email: "david@example.com",
    city: "Tel Aviv",
    years_of_experience: 3,
    linkedin_Id: "davidlevi",
    facebook_url: "https://facebook.com/david.levi",
    linkedin_url: "https://linkedin.com/in/davidlevi",
    community_value: 5,
    additional_info: "Looking to connect with tech communities",
    wants_updates: true,
    admin_notes: "First user in system",
    created_at: "2025-07-14",
    JobsHistories: [
        {
            id: 1,
            company_id: 1,
            start_date: "2022-01-01",
            end_date: "2023-06-30",
            user_id: 1,
            job_title: "Backend Developer"
        }
    ],
    initiatedConnections: [
        {
            id: 2,
            user_id1: 1,
            user_id2: 2,
            connection_date: "2025-07-15"
        }
    ],
    receivedConnections: [],
    Events: [],
    CommunityValue: null
};

const userA = {
    "profile_picture": "https://randomuser.me/api/portraits/men/32.jpg",
    // "profile_picture": "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg",
    "id": "c793a2e1-4b5f-4d23-9f18-0b8c1e7f2a1b",
    "first_name": "David",
    "last_name": "Levi",
    "english_name": "David Levi",
    "phone": "+1-202-555-0123",
    "email": "david.levi@example.com",
    "city": "Tel Aviv",
    "jobs_history": [
        { "job_id": 201, "company": "ACME Ltd", "from": "2018-01-01", "to": "2020-12-01", "job_title": "Full Stack Developer" },
        { "job_id": 202, "company": "TechX", "from": "2021-01-01", "to": null, "job_title": "BackEnd Developer" }
    ],
    "groups": [
        { "group_id": 301, "name": "junior_developers" },
        { "group_id": 302, "name": "job_seekers" }
    ],
    "years_of_experience": 7,
    "linkedin_url": "https://www.linkedin.com/in/davidlevi",
    "facebook_url": "https://www.facebook.com/david.levi",
    "community_value": "A strong contributor to community projects",
    "contributions": [
        { "contribution_id": 401, "type": "volunteering", "year": 2022 },
        { "contribution_id": 402, "type": "sponsorship", "year": 2023 }
    ],
    "internal_tags": ["mentor", "speaker"],
    "additional_info": "Leads React workshops and contributes to open-source projects.",
    "wants_updates": false,
    "admin_notes": "Interested in education-related projects. Consider for leadership roles."
}

const groupsOptions = [
    { label: "Junior Developers", value: "junior_developers" },
    { label: "Senior Developers", value: "senior_developers" },
    { label: "Full‑Stack Developers", value: "fullstack_developers" },
    { label: "Frontend Developers", value: "frontend_developers" },
    { label: "Backend Developers", value: "backend_developers" },
    { label: "DevOps Engineers", value: "devops_engineers" },
    { label: "UX/UI Designers", value: "ux_ui_designers" },
    { label: "Tech Job Seekers", value: "job_seekers" },
    { label: "Mentors & Educators", value: "mentors_educators" },
    { label: "Open‑Source Contributors", value: "open_source_contributors" },
    { label: "Women in Tech", value: "women_in_tech" },
    { label: "Remote Developers", value: "remote_developers" }
];

const contributionsOptions = [
    { label: "Public Speaking (Meetups, Conferences)", value: "public_speaking" },
    { label: "Workshop & Webinar Hosting", value: "workshop_webinar" },
    { label: "Open‑Source Contributions", value: "open_source" },
    { label: "Technical Articles & Blog Writing", value: "writing_articles" },
    { label: "Mentoring / Coaching", value: "mentoring" },
    { label: "Meetup / Event Organization", value: "event_organization" },
    { label: "Volunteer (e.g. hackathons, code clubs)", value: "volunteering" },
    { label: "Sponsorship / Funding Support", value: "sponsorship" }
];

const img = "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg";

function User() {

    const { id } = useParams()

    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    let { data, loading, error, callApi: fetchUser } = useApi(`/users/${id}`)
    const {
        callApi: saveUser,
    } = useApi(`/users/update/${id}`, "PUT", user);

    useEffect(() => {
        fetchUser()
            .then(res => setUser(res))
            .catch(err => console.error("שגיאה ב‑GET משתמשים:", err));
    }, []);

    const handleChange = (event) => {
        const { name, type, checked, value } = event.target;
        const newValue = type === 'checkbox' ? checked : value;
        const nestedMatch = name.match(/^(\w+)\[(\d+)\]\.(\w+)$/);
        if (nestedMatch) {
            const [, arrName, idx, field] = nestedMatch;
            setUser(prev => ({
                ...prev,
                [arrName]: prev[arrName].map((item, i) =>
                    i === +idx ? { ...item, [field]: newValue } : item
                )
            }));
        } else {
            setUser(prev => ({ ...prev, [name]: newValue }));
        }
    };

    const handleSelect = (name, selected) => {
        setUser(prev => ({
            ...prev,
            [name]: selected.map(s =>
                name === 'groups'
                    ? { group_id: s.value, name: s.value }
                    : { contribution_id: s.value, type: s.value }
            )
        }));
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

    // const selectedGroups = groupsOptions.filter(o =>
    //     user.groups.some(g => g.name === o.value)
    // );
    // const selectedContributions = contributionsOptions.filter(o =>
    //     user.contributions.some(c => c.type === o.value)
    // );

    if (loading) return <div>Loading...</div>
    if (error) return error

    return (<div className={style.user}>
        <div className={style.title}>
            <img src={img || user.profile_picture} alt="profile_img" className={style.picture} />
            <div className={style.prof}>
                <h1>{user.first_name} {user.last_name}</h1>
                <h3>{user.phone}</h3>
                <h3>{user.email}</h3>
            </div>
        </div>
        {!isEditing && <EditBtn isEditing={isEditing} setIsEditing={setIsEditing} type={"button"} />}

        {isEditing ?
            <form onSubmit={handleSave} className={style.details}>
                <EditBtn isEditing={isEditing} setIsEditing={setIsEditing} type={"submit"} />
                <div className={style.jobs}>
                    <h2>Jobs</h2>
                    {user.JobsHistories.map((job, i) => <div className={style.job} key={i}>
                        <h4>{job.company_id}</h4>
                        <h5>{job.job_title}</h5>
                        <UserInfoField title={"from"} data={job.start_date} isEditing={isEditing} name={`JobsHistories[${i}].start_date`} handleChange={handleChange} type={"date"} />
                        <UserInfoField title={"to"} data={job.end_date} isEditing={isEditing} name={`JobsHistories[${i}].end_date`} handleChange={handleChange} type={"date"} />
                    </div>)}
                </div>
                <div className={style.general}>
                    <UserInfoField title={"First Name"} data={user.first_name} icon={<FiUser />} isEditing={isEditing} name={"first_name"} handleChange={handleChange} />
                    <UserInfoField title={"Last Name"} data={user.last_name} icon={<FiUser />} isEditing={isEditing} name={"last_name"} handleChange={handleChange} />
                    <UserInfoField title={"Phone"} data={user.phone} icon={<FiPhone />} isEditing={isEditing} name={"phone"} handleChange={handleChange} />
                    <UserInfoField title={"Email"} data={user.email} icon={<FiAtSign />} isEditing={isEditing} name={"email"} handleChange={handleChange} />
                    <UserInfoField title={"City"} data={user.city} icon={<FiMapPin />} isEditing={isEditing} name={"city"} handleChange={handleChange} />
                    <UserInfoField title={"Linkedin Profile"} data={user.linkedin_url} icon={<FiLinkedin />} isEditing={isEditing} name={"linkedin_url"} handleChange={handleChange} type={"url"} />
                    <UserInfoField title={"Facebook Profile"} data={user.facebook_url} icon={<FiFacebook />} isEditing={isEditing} name={"facebook_url"} handleChange={handleChange} type={"url"} />
                    <UserInfoField title={"Additional Info"} data={user.additional_info} icon={<FiInfo />} isEditing={isEditing} name={"additional_info"} handleChange={handleChange} type={"textArea"} />
                </div>
                {/* <div className={style.community}>
                    <h2>Community</h2>
                    <strong>Groups</strong>
                    <SelectOptions name={"groups"} options={groupsOptions} handleSelect={handleSelect} selected={selectedGroups} />
                    <UserInfoField title={"Value from the community"} data={user.community_value} icon={<FiUsers />} isEditing={isEditing} name={"community_value"} handleChange={handleChange} type={"textArea"} />
                    <div>
                        <strong>Community Contribution</strong>
                        <SelectOptions name={"contributions"} options={contributionsOptions} handleSelect={handleSelect} selected={selectedContributions} />
                    </div>
                    <label className={style.updates}>
                        <strong>Wants updates</strong>
                        <input type="checkbox" name="wants_updates" value={user.wants_updates} onChange={handleChange} />
                    </label>
                </div> */}
            </form>
            :
            <div className={style.details}>

                <div className={style.jobs}>
                    <h2>Jobs</h2>
                    {user.JobsHistories.length ?
                        user.JobsHistories.map((job, i) => <div className={style.job} key={i}>
                            <h4>{job.company_id}</h4>
                            <h5>{job.job_title}</h5>
                            <UserInfoField title={"from"} data={job.start_date} icon={<CiCalendarDate />} />
                            <UserInfoField title={"to"} data={job.end_date == null ? "today" : job.end_date} icon={<CiCalendarDate />} />
                        </div>)
                        : "No jobs to display"
                    }
                </div>

                <div className={style.general}>
                    <UserInfoField title={"First Name"} data={user.first_name} icon={<FiUser />} />
                    <UserInfoField title={"Last Name"} data={user.last_name} icon={<FiUser />} />
                    <UserInfoField title={"Phone"} data={user.phone} icon={<FiPhone />} />
                    <UserInfoField title={"Email"} data={user.email} icon={<FiAtSign />} />
                    <UserInfoField title={"City"} data={user.city} icon={<FiMapPin />} />
                    <UserInfoField title={"Linkedin Profile"} data={user.linkedin_url} icon={<FiLinkedin />} />
                    <UserInfoField title={"Facebook Profile"} data={user.facebook_url} icon={<FiFacebook />} />
                    <UserInfoField title={"Additional Info"} data={user.additional_info} icon={<FiInfo />} />
                </div>
                {/* <div className={style.community}>
                    <h2>Community</h2>
                    <strong>Groups</strong>
                    <div className={style.groups}>
                        {user.groups.map((g, i) => <div key={i}>
                            <SelectedItem data={g.name} />
                        </div>)}
                    </div>
                    <UserInfoField title={"Value from the community"} data={user.community_value} icon={<FiUsers />} />
                    <strong>Community Contribution</strong>
                    <div className={style.groups}>
                        {user.contributions.map((c, i) => <div key={i}>
                            <SelectedItem data={c.type} />
                        </div>)}
                    </div>
                    <p className={style.updates}><strong>Wants updates</strong> <i>{user.wants_updates ? <FiBell /> : <FiBellOff />}</i></p>
                </div> */}
            </div>
        }
    </div>
    );

}

export default User