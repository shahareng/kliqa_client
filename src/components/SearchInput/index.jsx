import style from "./style.module.css"

function SearchInput({ placeholder, value, onChange }) {
  return (
    <input
      type="text"
      className={style.input}
      placeholder={placeholder || "Search..."}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default SearchInput;
