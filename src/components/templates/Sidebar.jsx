import { createQueryObject } from "helpers/helper";
import styles from "./Sidebar.module.css";

function Sidebar({ categories, query, setQuery }) {
  const categoryHandler = (event) => {
    const { tagName } = event.target;
    if (tagName !== "LI" && tagName !== "P" && tagName !== "IMG") return;

    const category = event.target.closest("li").dataset.category;

    setQuery((query) => createQueryObject(query, { category }));
  };

  return (
    <div className={styles.sidebar}>
      <h3>دسته ها</h3>
      <ul onClick={categoryHandler}>
        <li
          data-category="all"
          className={!query.category ? styles.selected : null}
        >
          <p>همه‌ی دسته‌ها</p>
        </li>
        {categories?.data.map((category) => (
          <li
            data-category={category._id}
            key={category._id}
            className={category._id === query.category ? styles.selected : null}
          >
            <img src={`${category.icon}.svg`} alt={category.name} />
            <p>{category.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
