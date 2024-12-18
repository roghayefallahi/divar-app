import { FiSearch } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

import styles from "./SearchBox.module.css";
import { createQueryObject } from "helpers/helper";

function SearchBox({ search, setSearch, setQuery }) {
  
  const searchHandler = (e) => {
    const newSearchValue = e.target.value.toLowerCase().trim(); // مقدار جدید از اینپوت
    setSearch(newSearchValue);
    setQuery((query) => createQueryObject(query, { search: newSearchValue }));
  };

  const clearSearch = () => {
    setSearch("");
    setQuery((query) => createQueryObject(query, { search: "" }));
  };


  return (
    <div className={styles.search}>
      <div>
        <input
          type="text"
          placeholder="جستجو"
          value={search}
          onChange={searchHandler}
          // onChange={(e) => setSearch(e.target.value.toLowerCase().trim())}
        />
        {search ? (
          <button
            className={styles.close}
            onClick={clearSearch}
          >
            <IoMdClose />
          </button>
        ) : (
          <button className={styles.searchBtn}>
            <FiSearch />
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchBox;
