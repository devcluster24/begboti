"use client";
import { blurImage } from "@/constants/blurImage";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { NewsProps } from "./types";

interface Props {
  filterNews: NewsProps[];
}

const Slider: React.FC<Props> = ({ filterNews }) => {
  return (
    <div className="w-full mt-10">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        spaceBetween={10}
        loop={true}
        autoplay={{ delay: 2000 }}
        className="mySwiper"
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
        {filterNews.map((newsItem) => (
          <SwiperSlide key={newsItem.id}>
            <Link href={`/${newsItem.category_name}/news/${newsItem.id}`}>
              <div className="w-full h-[300px] 2xl:h-[500px] relative rounded-md overflow-hidden cursor-pointer ">
                <Image
                  height={200}
                  width={500}
                  quality={80}
                  placeholder="blur"
                  blurDataURL={blurImage.url}
                  loading="lazy"
                  src={newsItem.image}
                  alt="news"
                  className="w-full h-full object-cover z-10"
                />
                <div className="absolute inset-0 bg-black opacity-30 z-20"></div>
                <h1 className="lg:text-xl text-sm font-bold absolute bottom-5 left-5 z-30 text-white">
                  {newsItem.headline}
                </h1>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
