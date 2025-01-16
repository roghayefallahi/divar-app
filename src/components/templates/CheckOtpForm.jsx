import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";

import { checkOtp } from "services/auth";
import { validateCode } from "validate/validate";
import { setCookie } from "utils/cookie";
import { getProfile } from "services/user";

import styles from "./CheckOtpForm.module.css";

function CheckOtpForm({ code, setCode, mobile, setStep }) {
  const navigate = useNavigate();
  const { refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    if (validateCode(code)) {
      const { response, error } = await checkOtp(mobile, +code);

      if (response) {
        setCookie(response.data);
        navigate("/");
        refetch();
      }

      if (error) {
        toast.error("مشکلی در ارسال کد به وجود آمده است!!!", {
          position: "top-center",
        });
        console.log(error.response.data.message);
      }
    }
  };

  return (
    <>
      <form onSubmit={submitHandler} className={styles.form}>
        <p>ورود به حساب کاربری</p>
        <span>کد پیامک‌شده به شمارۀ «{mobile}» را وارد کنید.</span>
        <label htmlFor="code">کد تأیید را وارد کنید</label>
        <input
          type="text"
          id="code"
          placeholder="کد تایید "
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <div>
          <button onClick={() => setStep(1)} className={styles.backBtn}>
            تغییر شماره موبایل
          </button>
          <button type="submit">ورود</button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
}

export default CheckOtpForm;
