import { useContext, useState } from "react";
import style from "./style.module.css"
import UserContext from "../../../context/userContext";
import EditBtn from "../../../components/EditBtn";
import useApi from "../../../hooks/useApi";
import UserInfoField from "../../../components/UserInfoField";

import { FiAtSign, FiFacebook, FiInfo, FiLinkedin, FiMapPin, FiPhone, FiUser } from "react-icons/fi";

function General() {

  const { user, setUser } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);

  const { data, loading, error, put } = useApi();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser(values => ({ ...values, [name]: value }))
  }

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
      {/* <img src={user.profile_picture} alt="profile_img" /> */}
      {!isEditing && <EditBtn isEditing={isEditing} setIsEditing={setIsEditing} type={"button"} />}

      {user?.first_name ?
        isEditing ?
          <form onSubmit={handleSave} className={style.details}>
            {/* <form onSubmit={() => setIsEditing(!isEditing)} className={style.details}> */}
            <EditBtn isEditing={isEditing} setIsEditing={setIsEditing} type={"submit"} />
            <UserInfoField title={"First Name"} data={user.first_name} icon={<FiUser />} isEditing={isEditing} name={"first_name"} handleChange={handleChange} />
            <UserInfoField title={"Last Name"} data={user.last_name} icon={<FiUser />} isEditing={isEditing} name={"last_name"} handleChange={handleChange} />
            <UserInfoField title={"Phone"} data={user.phone} icon={<FiPhone />} isEditing={isEditing} name={"phone"} handleChange={handleChange} />
            <UserInfoField title={"Email"} data={user.email} icon={<FiAtSign />} isEditing={isEditing} name={"email"} handleChange={handleChange} />
            <UserInfoField title={"City"} data={user.city} icon={<FiMapPin />} isEditing={isEditing} name={"city"} handleChange={handleChange} />
            <UserInfoField title={"Linkedin Profile"} data={user.linkedin_url} icon={<FiLinkedin />} isEditing={isEditing} name={"linkedin_url"} handleChange={handleChange} type={"url"} />
            <UserInfoField title={"Facebook Profile"} data={user.facebook_url} icon={<FiFacebook />} isEditing={isEditing} name={"facebook_url"} handleChange={handleChange} type={"url"} />
            <UserInfoField title={"Additional Info"} data={user.additional_info} icon={<FiInfo />} isEditing={isEditing} name={"additional_info"} handleChange={handleChange} type={"textArea"} />
          </form>
          :
          <div className={style.details}>
            <UserInfoField title={"First Name"} data={user.first_name} icon={<FiUser />} />
            <UserInfoField title={"Last Name"} data={user.last_name} icon={<FiUser />} />
            <UserInfoField title={"Phone"} data={user.phone} icon={<FiPhone />} />
            <UserInfoField title={"Email"} data={user.email} icon={<FiAtSign />} />
            <UserInfoField title={"City"} data={user.city} icon={<FiMapPin />} />
            <UserInfoField title={"Linkedin Profile"} data={user.linkedin_url} icon={<FiLinkedin />} />
            <UserInfoField title={"Facebook Profile"} data={user.facebook_url} icon={<FiFacebook />} />
            <UserInfoField title={"Additional Info"} data={user.additional_info} icon={<FiInfo />} />
          </div>
        : "loading..."}
    </div>
  );
}

export default General