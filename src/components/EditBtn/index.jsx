import style from "./style.module.css"

function EditBtn({ isEditing, setIsEditing }) {

    const handleEdit = () => {
        setIsEditing(!isEditing)
    }

    return (
        <button className={style.edit_btn} onClick={handleEdit}>{isEditing ? 'save' : "edit"}</button>
    )
}

export default EditBtn