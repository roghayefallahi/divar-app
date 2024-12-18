import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

import styles from "./Gallery.module.css"

Fancybox.bind("[data-fancybox]", {});



function Gallery({images}) {
 

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <div className={styles.container} >
      <Swiper
        spaceBetween={10}
        navigation
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Navigation, Thumbs]}
        className="main-slider"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <a
              data-fancybox="gallery"
              href={`${import.meta.env.VITE_BASE_URL}${image}`} // لینک برای Fancybox
            >
              <img
                src={`${import.meta.env.VITE_BASE_URL}${image}`}
                alt={`image-${index}`}
     
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* اسلایدر بندانگشتی */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        modules={[Thumbs]}
        className="thumb-slider"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={`${import.meta.env.VITE_BASE_URL}${image}`}
              alt={`thumbnail-${index}`}
              style={{
                width: "100%",
                height: "auto",
                cursor: "pointer",
                objectFit: "cover",
                borderRadius:"10px"
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Gallery;
