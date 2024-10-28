import Banner from "@/components/Banner";
import Parser from "@/components/Parser";
import { blurImage } from "@/constants/blurImage";
import { getAds } from "@/lib/getAds";
import { getAllNews } from "@/lib/getAllNews";
import { dateToTime } from "@/utils/dateToTime";
import Image from "next/image";
import Link from "next/link";
import { IoTimeOutline } from "react-icons/io5";
import { AdsProps, NewsProps } from "./types";

const Section1 = async () => {
  const newsPromise = getAllNews();
  const adsPromise = getAds();

  const [news, ads]: [NewsProps[], AdsProps[]] = await Promise.all([
    newsPromise,
    adsPromise,
  ]);

  const activeNews = news?.filter((item) => item.is_active);

  return (
    <div className="w-full h-auto grid lg:grid-cols-[70%_25%] md:grid-cols-2 grid-cols-1 row-auto lg:gap-[5%] gap-5 items-start py-5 px-5 lg:px-10 xl:px-20 2xl:px-40 4k:px-96 bg-[#F5F5F5]">
      {activeNews
        .sort((a, b) => b.id - a.id)
        .slice(0, 1)
        .map((newsItem) => (
          <Link
            href={`/${newsItem.category_name}/news/${newsItem.id}`}
            key={newsItem.id}
          >
            <div className="w-full grid lg:grid-cols-2 grid-cols-1 row-auto items-start gap-5 cursor-pointer bg-white p-1">
              <div className="w-full flex flex-col items-start gap-2">
                <div className="w-full h-[250px] overflow-hidden">
                  <Image
                    src={`${newsItem.image}` || "https://placehold.co/500x250"}
                    alt="photo.png"
                    height={200}
                    width={500}
                    quality={80}
                    placeholder="blur"
                    blurDataURL={blurImage.url}
                    className="w-full h-full object-cover hover:scale-105 duration-300"
                  />
                </div>
                <div className="flex items-center gap-2 text-sm justify-between w-full text-gray-700">
                  <h1>{newsItem.headline}</h1>
                  <span className="text-nowrap text-xs">
                    {newsItem.editor_name}
                  </span>
                </div>
              </div>
              <div className="w-full flex flex-col items-start gap-5 relative h-full">
                <h1 className="font-medium text-2xl">{newsItem.headline}</h1>
                <Parser
                  text={newsItem.content}
                  card={true}
                  textSize={200}
                  className={
                    "text-gray-700 lg:text-base text-sm font-secondary hover:text-black duration-500 font-medium"
                  }
                />
                <div className="relative left-0 bottom-0 flex items-center gap-1 text-gray-600">
                  <IoTimeOutline className="text-lg" />
                  <span className="text-sm text-gray-400">
                    {dateToTime(newsItem.created_at)}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      {ads
        .filter(
          (ad) => ad.page === "HOME" && ad.section === "1" && ad.order === 1
        )
        .map((ad) => (
          <Banner
            key={ad.id}
            image={ad.image}
            link={ad.link}
            video={ad.video}
            height={ad.height}
            width={ad.width}
            type={ad.file_type}
            closable={true}
          />
        ))}
    </div>
  );
};

export default Section1;
