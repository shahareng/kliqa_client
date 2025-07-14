import { useContext, useState } from "react";
import style from "./style.module.css"
import UserContext from "../../../context/userContext";
import EditBtn from "../../../components/EditBtn";

function General() {

  const { user, setUser } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser(values => ({ ...values, [name]: value }))
  }

  return (
    <div className={style.profile}>
      <img src={user.img} alt="profile_img" />
      <EditBtn isEditing={isEditing} setIsEditing={setIsEditing} />

      {user?.full_name ?
        isEditing ?
          <form onSubmit={() => setIsEditing(!isEditing)} className={style.details}>
            <label>
              <strong>Full Name</strong>
              <input name="full_name" value={user.full_name} onChange={handleChange} />
            </label>
            <label>
              <strong>Phone</strong>
              <input name="phone" value={user.phone} onChange={handleChange} />
            </label>
            <label>
              <strong>Email</strong>
              <input name="email" value={user.email} onChange={handleChange} />
            </label>
            <label>
              <strong>City</strong>
              <input name="city" value={user.city} onChange={handleChange} />
            </label>
            <label>
              <strong>Linkedin Profile</strong>
              <input type="url" name="linkedin_url" value={user.linkedin_url} onChange={handleChange} />
            </label>
            <label>
              <strong>Facebook Profile</strong>
              <input type="url" name="facebook_url" value={user.facebook_url} onChange={handleChange} />
            </label>
            <label>
              <strong>Aditional Info</strong>
              <textarea name="additional_info" value={user.additional_info} onChange={handleChange} />
            </label>
          </form>
          :
          <div className={style.details}>
            <p><strong>Full Name:</strong> {user.full_name}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>City:</strong> {user.city}</p>
            <p><strong>Linkedin Profile:</strong> {user.linkedin_url}</p>
            <p><strong>Facebook Profile:</strong> {user.facebook_url}</p>
            {/* <a href={user.linkedin_url}>Linkedin Profile</a>
            <a href={user.facebook_url}>Facebook Profile</a> */}
            <p><strong>Aditional Info:</strong> {user.additional_info}</p>
          </div>
        : "loading..."}
    </div>
  );
}

export default General