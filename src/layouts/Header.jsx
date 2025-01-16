import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { RiFilePaper2Line } from "react-icons/ri";
import { RxExit } from "react-icons/rx";
import { LuLogIn } from "react-icons/lu";
import { useQuery } from "@tanstack/react-query";

import { getProfile } from "services/user";
import { e2p } from "utils/numbers";
import SearchBox from "components/templates/SearchBox";
import CitiesModal from "components/modules/CitiesModal";
import { useClickOutside } from "hooks/useClickOutside";
import { CityContext } from "../App";

import styles from "./Header.module.css";

function Header({ search, setSearch, setQuery }) {
  const { selectedCities, setSelectedCities } = useContext(CityContext);

  useEffect(() => {
    const savedCities = JSON.parse(localStorage.getItem("selectedCities"));
    if (savedCities) {
      setSelectedCities(savedCities);
    }
  }, [setSelectedCities]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  const { data, refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
  const menuRef = useRef(null);

  const subMenuHandler = () => {
    setIsSubmenuOpen(false);
  };

  useClickOutside([menuRef], subMenuHandler);

  const navigate = useNavigate();

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const exitHandler = () => {
    document.cookie = "accessToken=; max-age=0; path=/;";

    // document.cookie = "refreshToken=; max-age=0; path=/;";

    navigate("/");
    setIsSubmenuOpen(flase);
    refetch();
  };

  const toggleSubmenu = () => {
    setIsSubmenuOpen((prev) => !prev);
  };


  return (
    <>
      <header className={styles.header}>
        <div className={styles.location}>
          <Link to="/">
            <img src="divar.svg" alt="divar logo" className={styles.logo} />
          </Link>

          <span onClick={toggleModal}>
            <img src="location.svg" alt="location icon" />
            <p>
              {selectedCities.length === 0
                ? "انتخاب شهر"
                : selectedCities.length === 1
                ? selectedCities[0]
                : `${e2p(selectedCities.length)} شهر`}
            </p>
          </span>

          <SearchBox
            search={search}
            setSearch={setSearch}
            setQuery={setQuery}
          />
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
      {isModalOpen && <CitiesModal setIsModalOpen={setIsModalOpen} />}
    </>
  );
}

export default Header;
