import style from "./style.module.css"

function SelectedItem({ data }) {

    return (
        <div className={style.item}>
            {data}
        </div>
    )

}

export default SelectedItem