import { useContext, useState } from "react";
import style from "./style.module.css"
import UserContext from "../../../context/userContext";
import EditBtn from "../../../components/EditBtn";
import useApi from "../../../hooks/useApi";
import UserInfoField from "../../../components/UserInfoField";

import { FiAtSign, FiFacebook, FiInfo, FiLinkedin, FiMapPin, FiPhone, FiUser } from "react-icons/fi";

const labels = [
  {
    title: "First Name",
    icon: <FiUser />,
    name: "first_name",
  },
  {
    title: "Last Name",
    icon: <FiUser />,
    name: "last_name",
  },
  {
    title: "Phone",
    icon: <FiPhone />,
    name: "phone",
  },
  {
    title: "Email",
    icon: <FiAtSign />,
    name: "email",
  },
  {
    title: "City",
    icon: <FiMapPin />,
    name: "city",
  },
  {
    title: "Linkedin Profile",
    icon: <FiLinkedin />,
    name: "linkedin_url",
    type: "url"
  },
  {
    title: "Facebook Profile",
    icon: <FiFacebook />,
    name: "facebook_url",
    type: "url"
  },
  {
    title: "Additional Info",
    icon: <FiInfo />,
    name: "additional_info",
    type: "textarea"
  },

]
const img = "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg";

function General() {

  const { user, setUser } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);

  const {
    callApi: saveUser,
  } = useApi(`/users/update/105`, "PUT", user);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser(values => ({ ...values, [name]: value }))
  }

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
      {user?.first_name ?
        <>
          <img src={img || user.profile_picture} alt="profile_img" className={style.profile_img} />
          {!isEditing && <EditBtn isEditing={isEditing} setIsEditing={setIsEditing} type={"button"} />}

          {isEditing ?
            <form onSubmit={handleSave} className={style.details}>
              <EditBtn isEditing={isEditing} setIsEditing={setIsEditing} type={"submit"} />
              {labels.map((label, i) => <UserInfoField
                key={i}
                title={label.title}
                data={user[label.name]}
                icon={label.icon}
                isEditing={isEditing}
                name={label.name}
                handleChange={handleChange}
                type={label.type || 'text'} />)}
            </form>
            :
            <div className={style.details}>
              {labels.map((label, i) => <UserInfoField
                key={i}
                title={label.title}
                data={user[label.name]}
                icon={label.icon} />)}
            </div>}
        </>
        : "loading..."}
    </div>
  );
}

export default General