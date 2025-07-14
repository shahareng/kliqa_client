import { useState } from "react";
import style from "./style.module.css"

function Profile() {

  const user = {
    "id": "c793a2e1-4b5f-4d23-9f18-0b8c1e7f2a1b",
    "full_name": "דוד לוי",
    "english_name": "David Levi",
    "phone": "+1-202-555-0123",
    "email": "david.levi@example.com",
    "city": "Tel Aviv",
    "jobs_history": [
      { "job_id": 201, "company": "ACME Ltd", "from": "2018-01", "to": "2020-12" },
      { "job_id": 202, "company": "TechX", "from": "2021-01", "to": null }
    ],
    "groups": [
      { "group_id": 301, "name": "Israel Developers" },
      { "group_id": 302, "name": "UX Community" }
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
    "wants_updates": true,
    "admin_notes": "Interested in education-related projects. Consider for leadership roles."
  }

  const [isEditing, setIsEditing] = useState(false);
  const [inputs, setInputs] = useState(user);

  const handleEdit = () => {
    setIsEditing(!isEditing)
    if (isEditing) handleSubmit()
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
    setIsEditing(!isEditing)
  }

  return (
    <div className={style.profile}>
      <h1>My Profile</h1>
      <img src="" alt="profile_img" />
      <button onClick={handleEdit}>{isEditing ? 'save' : "✏️"}</button> 
      

      {isEditing ?
        <form onSubmit={handleSubmit} className={style.edit_details}>
          <label>
            <strong>Full Name</strong>
            <input name="full_name" value={inputs.full_name} onChange={handleChange} />
          </label>
          <label>
            <strong>Phone</strong>
            <input name="phone" value={inputs.phone} onChange={handleChange} />
          </label>
          <label>
            <strong>Email</strong>
            <input name="email" value={inputs.email} onChange={handleChange} />
          </label>
          <label>
            <strong>City</strong>
            <input name="city" value={inputs.city} onChange={handleChange} />
          </label>
          <label>
            <strong>Linkedin Profile</strong>
            <input type="url" name="linkedin_url" value={inputs.linkedin_url} onChange={handleChange} />
          </label>
          <label>
            <strong>Facebook Profile</strong>
            <input type="url" name="facebook_url" value={inputs.facebook_url} onChange={handleChange} />
          </label>
          <label>
            <strong>Aditional Info</strong>
            <textarea name="additional_info" value={inputs.additional_info} onChange={handleChange} />
          </label>
          <div>
            <h4>Jobs</h4>
            {user.jobs_history.map((job, i) => <div className={style.job} key={i}>
              <p>{job.company}&emsp;&emsp; {job.from} - {job.to == null ? "today" : job.to}</p>
            </div>)}
          </div>
          <div>
            <h4>Groups</h4>
            {/* <select multiple value={selected} onChange={handleChange}>
              {options.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select> */}
            {user.groups.map((g, i) => <div className={style.group} key={i}>
              <p>{g.name}</p>
            </div>)}
          </div>
          <label>
            <strong>Value from the community</strong>
            <textarea name="community_value" value={inputs.community_value} onChange={handleChange} />
          </label>
          <div>
            <h4>Community Contribution</h4>
            {user.contributions.map((c, i) => <div className={style.con} key={i}>
              <p>{c.type}</p>
            </div>)}
          </div>
          <label>
            <strong>Wants updates</strong>
            <input type="checkbox" name="wants_updates" value={inputs.wants_updates} onChange={handleChange} />
          </label>
        </form>
        :
        <div className={style.details}>
          <p><strong>Full Name:</strong> {inputs.full_name}</p>
          <p><strong>Phone:</strong> {inputs.phone}</p>
          <p><strong>Email:</strong> {inputs.email}</p>
          <p><strong>City:</strong> {inputs.city}</p>
          <a href={inputs.linkedin_url}>Linkedin Profile</a>
          <a href={inputs.facebook_url}>Facebook Profile</a>
          <p><strong>Aditional Info:</strong> {inputs.additional_info}</p>
          <div>
            <h4>Jobs</h4>
            {inputs.jobs_history.map((job, i) => <div className={style.job} key={i}>
              <p>{job.company}&emsp;&emsp; {job.from} - {job.to == null ? "today" : job.to}</p>
            </div>)}
          </div>
          <div>
            <h4>Groups</h4>
            {inputs.groups.map((g, i) => <div className={style.group} key={i}>
              <p>{g.name}</p>
            </div>)}
          </div>
          <p><strong>Value from the community:</strong> {inputs.community_value}</p>
          <div>
            <h4>Community Contribution</h4>
            {inputs.contributions.map((c, i) => <div className={style.con} key={i}>
              <p>{c.type}</p>
            </div>)}
          </div>
          <p><strong>Wants updates:</strong> {inputs.wants_updates == true ? "yes" : "no"}</p>
        </div>
      }


    </div>
  );
}

export default Profile