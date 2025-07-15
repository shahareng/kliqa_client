import { FiEdit, FiSave } from "react-icons/fi"
import style from "./style.module.css"

function EditBtn({ isEditing, setIsEditing }) {

    const handleEdit = () => {
        setIsEditing(!isEditing)
    }

    return (
        <button type={isEditing ? "submit" : ''} className={style.edit_btn} onClick={handleEdit}>
            {isEditing ?
                <div className={style.content}>
                    Save
                    <i className={style.btn_icon}><FiSave /></i>
                </div>
                :
                <div className={style.content}>
                    Edit
                    <i className={style.btn_icon}><FiEdit /></i>
                </div>
            }
        </button>
    )
}

export default EditBtn