import Footer from "./Footer";
import Header from "./Header";

import styles from "./Layout.module.css";

function Layout({ children, search, setSearch, setQuery }) {
  return (
    <>
      <Header search={search} setSearch={setSearch}  setQuery={setQuery} />
      <div className={styles.main}>{children}</div>
      <Footer />
    </>
  );
}

export default Layout;
