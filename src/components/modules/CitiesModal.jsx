import { useContext, useEffect, useRef, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { provinces } from "constants/cities";
import { useClickOutside } from "hooks/useClickOutside";
import { CityContext } from "../../App";

import styles from "./CitiesModal.module.css";

const animatedComponents = makeAnimated();

const formattedProvinces = provinces.map((province) => ({
  label: province.name,
  options: province.cities.map((city) => ({
    label: city,
    value: city,
  })),
}));

function CitiesModal({ setIsModalOpen }) {
  const { selectedCities, setSelectedCities } = useContext(CityContext);
  const [selected, setSelected] = useState(selectedCities);
  const modalRef = useRef(null);
  const selectMenuRef = useRef(null);

  useEffect(() => {
    setSelected(selectedCities);
  }, [selectedCities]);

  // const handleChange = (selectedOptions) => {
  //   setSelected(selectedOptions || []);
  // };
  const handleChange = (selectedOptions) => {
    const cityNames = selectedOptions?.map((option) => option.value) || []; // استخراج نام شهرها
    setSelected(cityNames);
  
  };

  // useEffect(() => {
  //   const savedCities = JSON.parse(localStorage.getItem("selectedCities"));
  //   if (savedCities) {
  //     setSelectedCities(savedCities);
  //   }
  // }, []);

  const onClose = () => setIsModalOpen(false);

  const onConfirm = () => {
    localStorage.setItem("selectedCities", JSON.stringify(selected));
    setSelectedCities(selected);
    setIsModalOpen(false);
  };

  const onCancel = () => {
    setSelected(selectedCities);
    setIsModalOpen(false);
  };

  const selectedOptions = selected.map((city) => ({
    label: city,
    value: city,
  }));

  useClickOutside([modalRef, selectMenuRef], onClose);

  return (
    <div className={styles.modal}>
      <div ref={modalRef}>
        <h3>انتخاب شهر</h3>

        <Select
          ref={selectMenuRef}
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          options={formattedProvinces}
          value={selectedOptions}
          onChange={handleChange}
          placeholder="جستجو در شهرها"
          classNamePrefix="react-select"
          menuPortalTarget={document.body}
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          }}
        />
        <div className={styles.actions}>
          <button onClick={onCancel} className={styles.cancel}>
            انصراف
          </button>
          <button
            onClick={onConfirm}
            className={!!selected.length ? styles.confirm : styles.disabled}
          >
            تایید
          </button>
        </div>
      </div>
    </div>
  );
}

export default CitiesModal;
