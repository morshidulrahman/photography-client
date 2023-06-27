import React from "react";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Autoplay } from "swiper";
import SliderCard from "./Slidercard";
const Slider = () => {
  return (
    <Swiper
      modules={[Pagination, Navigation, Autoplay]}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      centeredSlides={true}
      navigation={true}
      pagination={{ clickable: true }}
      grabCursor={true}
      className="w-full h-[500px] relative"
    >
      <SwiperSlide>
        <SliderCard image="slide1" />
      </SwiperSlide>
      <SwiperSlide>
        <SliderCard image="slide2" />
      </SwiperSlide>
    </Swiper>
  );
};

export default Slider;
