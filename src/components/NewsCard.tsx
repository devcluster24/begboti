"use client";
import { blurImage } from "@/constants/blurImage";
import { dateToTime } from "@/utils/dateToTime";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import Parser from "./Parser";
import { NewsProps } from "./types";

interface NewsCardProps {
  news: NewsProps;
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/${news.category_name}/news/${news.id}`);
  };

  return (
    <div
      onClick={handleClick}
      key={news.id}
      className="flex items-start flex-col cursor-pointer bg-white p-1"
    >
      <Image
        src={news?.image}
        width={500}
        height={200}
        alt={news?.headline}
        quality={80}
        placeholder="blur"
        blurDataURL={blurImage.url}
        className="w-full h-[200px] object-cover"
      />
      <div className="py-5 flex flex-col items-start gap-3 w-full">
        <h1 className="text-xl font-bold tracking-wider">{news?.headline}</h1>
        <Parser
          text={news?.content}
          card={true}
          textSize={100}
          className="text-gray-600 text-sm font-secondary hover:text-black duration-500 font-medium"
        />
        <div className="w-full flex items-center justify-between mt-3">
          <span className="text-sm text-gray-400">
            {dateToTime(news?.created_at)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
