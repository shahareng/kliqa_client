import { FiSearch } from "react-icons/fi";
import style from "./style.module.css"

function SearchInput({ placeholder, value, onChange }) {
  return (
    <div className={style.search}>
      <input
        type="text"
        className={style.input}
        placeholder={placeholder || "Search..."}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <i><FiSearch /></i>
    </div>
  );
}

export default SearchInput;
