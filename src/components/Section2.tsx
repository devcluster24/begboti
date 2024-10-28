import { blurImage } from "@/constants/blurImage";
import { getAds } from "@/lib/getAds";
import { getAllNews } from "@/lib/getAllNews";
import { getCategory } from "@/lib/getCategory";
import { getNewsByCategory } from "@/lib/getNewsByCategory";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Banner from "../components/Banner";
import HeadingText from "../components/HeadingText";
import NewsCard from "../components/NewsCard";
import { AdsProps, NewsProps } from "./types";

interface Props {
  category: number;
}

const Section2: React.FC<Props> = async ({ category }) => {
  const newsPromise = getAllNews();
  const adsPromise = getAds();

  const [news, ads]: [NewsProps, AdsProps[]] = await Promise.all([
    newsPromise,
    adsPromise,
  ]);

  const singleCategory = await getCategory(category);
  const filteredNews = await getNewsByCategory({ id: category });

  return (
    <div className="w-full py-5 my-10 px-5 lg:px-10 xl:px-20 2xl:px-40 4k:px-96 bg-[#F5F5F5]">
      <div className="w-full flex items-center justify-start">
        <HeadingText title={singleCategory?.name} />
      </div>
      <div className=" flex lg:flex-row flex-col lg:gap-8 gap-y-20 mt-10">
        <div className="lg:w-[25%] md:w-full w-full flex flex-col justify-start items-center md:items-start lg:gap-4 gap-8">
          {filteredNews.slice(0, 7).map((card) => (
            <Link href={`/${card.category_name}/news/${card.id}`} key={card.id}>
              <div className="flex flex-col items-start gap-3 w-full cursor-pointer bg-white ">
                <div className="flex items-start w-full gap-2 border border-[#3B82F6] rounded-md ">
                  <Image
                    src={card.image}
                    width={80}
                    height={80}
                    alt={card.headline}
                    quality={80}
                    placeholder="blur"
                    blurDataURL={blurImage.url}
                    className="object-cover w-full h-full  rounded-md"
                  />
                  <h3 className="lg:text-sm text-sm md:text-sm w-full font-medium p-[2px]">
                    {card.headline}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="lg:w-[50%] w-full grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 row-auto items-stretch lg:items-start gap-x-4 gap-y-4">
          {filteredNews.slice(8, 12).map((card) => (
            <NewsCard news={card} key={card.id} />
          ))}
        </div>
        <div className="lg:w-[25%] w-full md:w-full">
          {ads
            .filter(
              (adItem) => adItem.page === "HOME" && adItem.section === "2"
            )
            .sort((a, b) => a.order - b.order)
            .map((ad) => (
              <Banner
                key={ad.id}
                image={ad.image}
                link={ad.link}
                height={ad.height}
                width={ad.width}
                type={ad.file_type}
                video={ad.video}
                closable={true}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Section2;
