"use client";
import styles from "./searchbar.module.css";
import SearchManufacturer from "./searchmanufacturer";

const SearchBar = ({
  manufacturer,
  setManufacturer,
  carModel,
  setCarModel,
}) => {
  return (
    <aside className={styles.searchbar}>
      <div className={styles.searchbar__item}>
        <SearchManufacturer
          manufacturer={manufacturer}
          setManufacturer={setManufacturer}
          icon={"tesla-logo.png"}
          inputDisplay={styles.search_manufacturer__input_left}
        />
      </div>
      <div className={styles.searchbar__item}>
        <SearchManufacturer
          carBrand={manufacturer}
          carModel={carModel}
          setCarModel={setCarModel}
          icon={"model-icon.png"}
          inputDisplay={styles.search_manufacturer__input_right}
        />
      </div>
    </aside>
  );
};

export default SearchBar;
