import style from "./style.module.css"

function UserInfoField({ title, data, icon, isEditing, name, handleChange, type="text" }) {

    return (
        <label>
            <strong>{title}</strong>
            <div className={style.info}>
                {isEditing ?
                    type == "textarea" ?
                        <textarea name={name} value={data} onChange={handleChange} />
                        :
                        <input type={type} name={name} value={data} onChange={handleChange} />
                    :
                    data}
                <i>{icon}</i>
            </div>
        </label>
    );

}

export default UserInfoField