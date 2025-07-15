import { FiEdit, FiSave } from "react-icons/fi"
import style from "./style.module.css"

function EditBtn({ isEditing, setIsEditing, type }) {

    const handleEdit = () => {
        setIsEditing(!isEditing)
    }

    return (<>
        {type == "submit" ?
            <button type="submit" className={style.edit_btn}>
                Save
                <i className={style.btn_icon}><FiSave /></i>
            </button>
            :
            <button type="button" className={style.edit_btn} onClick={handleEdit}>
                Edit
                <i className={style.btn_icon}><FiEdit /></i>
            </button>

        }
    </>);
}

export default EditBtn