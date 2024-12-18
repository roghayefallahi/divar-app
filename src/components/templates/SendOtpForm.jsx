import { toast, ToastContainer } from "react-toastify";

import { sendOtp } from "services/auth";
import { validateMobile } from "validate/validate";

import styles from "./SendOtpForm.module.css";

function SendOtpForm({ mobile, setMobile, setStep }) {
  const submitHandler = async (e) => {
    e.preventDefault();

    if (validateMobile(mobile)) {
      const { response, error } = await sendOtp(mobile);



      if (response) setStep(2);
      if (error) {
        toast.error("مشکلی در ارسال اطلاعات به وجود آمده است!!!", {
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
        <span>
          برای استفاده از امکانات دیوار، لطفاً شمارهٔ موبایل خود را وارد کنید.
          کد تأیید به این شماره پیامک خواهد شد.
        </span>
        <label htmlFor="number">شمارهٔ موبایل خود را وارد کنید</label>
        <input
          type="text"
          id="number"
          placeholder="شماره موبایل"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        <button type="submit">تایید</button>
      </form>
      <ToastContainer />
    </>
  );
}

export default SendOtpForm;
