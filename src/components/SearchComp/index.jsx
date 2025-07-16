import style from "./style.module.css"
import SelectOptions from "../SelectOptions"
import SearchInput from "../SearchInput"
import SelectedItem from "../SelectedItem"

function SearchComp({ search, setSearch, placeholder, name, options, handleSelect, selected }) {

    return <div className={style.search_select}>
        <SearchInput
            className={style.input}
            value={search}
            onChange={setSearch}
            placeholder={placeholder}
        />
        <SelectOptions
            name={name}
            options={options}
            handleSelect={handleSelect}
            selected={selected}
        />
        {selected}
        {/* {selected.map((s, i) => <div key={i}>
            <SelectedItem data={s.name} />
        </div>)} */}
        {/* <button>Save</button> */}

    </div>

}

export default SearchComp