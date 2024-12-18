import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const validateMobile = (value) => {
  const mobileRegex = /^09[0-9]{9}$/;
  if (!value) {
    toast.warn("وارد کردن شمارهٔ موبایل الزامی است.", {
      position: "top-center",
    });
    return false;
  } else if (!mobileRegex.test(value)) {
    toast.warn("لطفا یک شماره موبایل معتبر وارد نمایید.", { position: "top-center" });
    return false;
  } else {
    return true;
  }
};


const validateCode = (value) => {
  const codeRegex = /^[0-9]{5}$/;
  if (!value) {
    toast.warn("کد تایید را وارد کنید.", {
      position: "top-center",
    });
    return false;
  } else if (!codeRegex.test(value)) {
    toast.warn("کد تایید معتبر نیست!", { position: "top-center" });
    return false;
  } else {
    return true;
  }
}

export { validateMobile, validateCode };
