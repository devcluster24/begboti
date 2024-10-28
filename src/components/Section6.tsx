import { blurImage } from "@/constants/blurImage";
import { getAds } from "@/lib/getAds";
import { getNewsByCategory } from "@/lib/getNewsByCategory";
import { dateToTime } from "@/utils/dateToTime";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Banner from "./Banner";
import HeadingText from "./HeadingText";
import LocationSearch from "./LocationSearch";
import Parser from "./Parser";
import { AdsProps } from "./types";

interface Props {
  category: number;
}

const Section6: React.FC<Props> = async ({ category }) => {
  const filterNews = await getNewsByCategory({ category: "সারাদেশ" });

  const ads: AdsProps[] = await getAds();

  return (
    <div className="w-full px-5 lg:px-10 xl:px-20 2xl:px-40 4k:px-96">
      <HeadingText title={"সারাদেশ"} />
      <LocationSearch />
      <div className="w-full grid lg:grid-cols-3 grid-cols-1 gap-8 bg-gray-100 py-5 my-10 px-5">
        {filterNews.slice(0, 1).map((news) => (
          <Link key={news.id} href={`/${news.category_name}/news/${news.id}`}>
            <div className="cursor-pointer">
              <Image
                src={`${news.image}`}
                alt="Main News"
                width={200}
                height={200}
                quality={80}
                placeholder="blur"
                blurDataURL={blurImage.url}
                className="w-full rounded-lg object-cover"
              />
              <div className="flex gap-2 mt-5 mb-4 cursor-pointer">
                <div>
                  <h1 className="font-bold text-blue-600 text-xl">
                    {news.headline}
                  </h1>
                  <Parser
                    text={news.content}
                    card={true}
                    textSize={100}
                    className={
                      "text-gray-700 lg:text-sm mt-2 text-sm font-secondary hover:text-black duration-500 font-medium"
                    }
                  />
                  <span className="text-sm text-gray-400">
                    {dateToTime(news.created_at)}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
        <div className="w-full">
          {filterNews.slice(1, 4).map((news) => (
            <Link key={news.id} href={`/${news.category_name}/news/${news.id}`}>
              <div className="flex items-start justify-between gap-3 mb-4 cursor-pointer">
                <div className="flex flex-col items-start gap-2">
                  <h1 className="text-blue-500 font-bold text-lg">
                    {news.headline}
                  </h1>
                  <Parser
                    text={news.content}
                    card={true}
                    textSize={60}
                    className="text-gray-600 text-sm hover:text-black duration-500 font-medium"
                  />
                  <span className="text-sm text-gray-400">
                    {dateToTime(news.created_at)}
                  </span>
                </div>
                <Image
                  src={news.image}
                  alt="news.image"
                  width={200}
                  height={200}
                  quality={80}
                  placeholder="blur"
                  blurDataURL={blurImage.url}
                  className="w-1/2 h-24 rounded-md object-cover"
                />
              </div>
            </Link>
          ))}
        </div>
        <div className="w-full">
          {filterNews.slice(4, 6).map((news) => (
            <Link key={news.id} href={`${news.category_name}/news/${news.id}`}>
              <div className="flex items-start justify-between gap-3 mb-4 cursor-pointer">
                <div className="flex flex-col items-start gap-2">
                  <h1 className="text-blue-600 font-bold text-lg">
                    {news.headline}
                  </h1>
                  <Parser
                    text={news.content}
                    card={true}
                    textSize={60}
                    className="text-gray-600 text-sm hover:text-black duration-500 font-medium"
                  />
                  <span className="text-sm text-gray-400">
                    {dateToTime(news.created_at)}
                  </span>
                </div>
                <Image
                  src={news.image}
                  alt="news.image"
                  width={200}
                  height={200}
                  quality={80}
                  placeholder="blur"
                  blurDataURL={blurImage.url}
                  className="w-1/2 h-24 rounded-md object-cover"
                />
              </div>
            </Link>
          ))}
          {ads
            .filter((ad) => ad.page === "HOME" && ad.section === "8")
            .sort((a, b) => a.order - b.order)
            .slice(0, 1)
            .map((ad) => (
              <Banner
                key={ad.id}
                image={ad.image}
                link={ad.link}
                height={ad.height}
                width={ad.width}
                video={ad.video}
                type={ad.file_type}
                closable={true}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Section6;
