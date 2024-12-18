import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { RiFilePaper2Line } from "react-icons/ri";
import { RxExit } from "react-icons/rx";
import { LuLogIn } from "react-icons/lu";

import { useQuery } from "@tanstack/react-query";

import { getProfile } from "services/user";
import { e2p } from "utils/numbers";
import SearchBox from "components/templates/SearchBox";

import styles from "./Header.module.css";

function Header({search, setSearch, setQuery}) {

  const { data, refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
  const menuRef = useRef(null);
  const handleClickOutside = (event) => {
    // بررسی کلیک خارج از منو
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsSubmenuOpen(false);
    }
  };

  useEffect(() => {
    // اضافه کردن Event Listener برای کلیک در کل صفحه
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // حذف Event Listener هنگام از بین رفتن کامپوننت
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const navigate = useNavigate();

  const exitHandler = () => {
    document.cookie = "accessToken=; max-age=0; path=/;";

    document.cookie = "refreshToken=; max-age=0; path=/;";

    navigate("/");
    setIsSubmenuOpen(flase);
    refetch();
  };

  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  const toggleSubmenu = () => {
    setIsSubmenuOpen((prev) => !prev);
  };

  return (
    <header className={styles.header}>
      <div className={styles.location}>
        <Link to="/">
          <img src="divar.svg" alt="divar logo" className={styles.logo} />
        </Link>
        <span>
          <img src="location.svg" alt="locaton icon" />
          <p>تهران</p>
        </span>
        <SearchBox search={search} setSearch={setSearch}  setQuery={setQuery} />
      </div>
      <div>
        <div className={styles.profile} ref={menuRef}>
          <Link onClick={toggleSubmenu}>
            <span>
              <img src="profile.svg" alt="profile" />
              <p>دیوار من</p>
            </span>
          </Link>
          {isSubmenuOpen && (
            <div className={styles.dropdown}>
              <ul>
                {data ? (
                  <>
                    <li>
                      <Link to="dashboard">
                        <div>
                          <FaRegUser />
                          <span>کاربر دیوار</span>
                        </div>
                        <p className={styles.mobile}>
                          تلفن {e2p(data?.data.mobile)}
                        </p>
                      </Link>
                    </li>
                    <hr />
                    <li>
                      <Link to="dashboard">
                        <div>
                          <RiFilePaper2Line />
                          <span>آگهی های من</span>
                        </div>
                      </Link>
                    </li>
                    <hr />
                    <li>
                      <Link onClick={exitHandler}>
                        <div>
                          <RxExit />
                          <span>خروج</span>
                        </div>
                      </Link>
                    </li>
                  </>
                ) : (
                  <li>
                    <Link to="/auth">
                      <div>
                        <LuLogIn />
                        <span>ورود</span>
                      </div>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
        <Link to="/dashboard" className={styles.button}>
          ثبت آگهی
        </Link>
      </div>
    </header>
  );
}

export default Header;
