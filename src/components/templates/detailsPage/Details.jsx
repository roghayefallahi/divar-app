import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { faIR } from "date-fns/locale";

import Gallery from "./Gallery";
import { e2p, sp } from "utils/numbers";

import styles from "./Details.module.css";

function Details({ data }) {
   
  const [isShow, setIsShow] = useState(false);

  const showHandler = () => {
    setIsShow((i) => !i);
  };

  console.log(data);

  const relativeTime = formatDistanceToNow(new Date(data?.data.post.created_at), {
    addSuffix: true, // افزودن "پیش" یا "بعد"
    locale: faIR, // زبان فارسی
  });

  return (
    <div className={styles.container}>
      <div className={styles.details}>
        <h3>{data?.data.post.title}</h3>
        <p>
          {e2p(relativeTime)} در <span>{data.data.post.city}</span>
        </p>

        <button onClick={showHandler} disabled={isShow}>اطلاعات تماس</button>
        { isShow && ( <div className={styles.info}>
          <p>شماره موبایل</p>
          <span>{e2p(data.data.post.user.mobile)}</span>
        </div>)}
       
        <hr />
        <div className={styles.price}>
          <p>قیمت</p>
          <span>{sp(data.data.post.amount)} تومان</span>
        </div>
        <hr />
        <div className={styles.description}>
          <h2>توضیحات</h2>
          <p>{data.data.post.content}</p>
        </div>
      </div>
      <div className={styles.slider}>
        <Gallery images={data.data.post.images} />
      </div>
    </div>
  );
}

export default Details;
