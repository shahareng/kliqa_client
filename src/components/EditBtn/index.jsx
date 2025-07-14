import style from "./style.module.css"

function EditBtn({ isEditing, setIsEditing }) {

    const handleEdit = () => {
        setIsEditing(!isEditing)
    }

    return (
        <button onClick={handleEdit}>{isEditing ? 'save' : "✏️"}</button>
    )
}

export default EditBtn