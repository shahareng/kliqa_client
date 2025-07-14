import Select from "react-select"
import style from "./style.module.css"

function SelectOptions({ name, options, handleSelect, selected }) {

    return (
        <Select
            className={style.wrapper}
            classNamePrefix="wrapper"
            name={name}
            options={options}
            value={selected}
            onChange={(sel) => handleSelect(name, sel)}
            isMulti
            isSearchable
            closeMenuOnSelect={false}
        />
    )
}

export default SelectOptions