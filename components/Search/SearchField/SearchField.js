import styles from "./SearchField.module.css";

export const SearchField = ({ onSearchFieldChange, searchKeyword, value }) => {
  return (
    <div className="max-w-3xl mx-auto py-10">
      <input
        type="text"
        className={`${styles.searchField} border-2 border-slate-800 rounded-md w-full p-2 pl-12`}
        onChange={onSearchFieldChange}
        value={searchKeyword || value}
      />
    </div>
  );
};
