import Banner from "@/components/Banner";
import LatestNews from "@/components/LatestNews";
import PaginationClient from "@/components/PaginationClient";
import PopularNews from "@/components/PopularNews";
import { AdsProps, BannerProps, NewsProps } from "@/components/types";
import { getAds } from "@/lib/getAds";
import { getBanner } from "@/lib/getBanner";
import { getMostShareNews } from "@/lib/getMostShareNews";
import { getNewsByDate } from "@/lib/getNewsByDate";
import { getNewsByTags } from "@/lib/getNewsByTags";
import { Metadata } from "next";
import React, { Suspense } from "react";
import { IoMdArrowDropright } from "react-icons/io";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "আজকের খবর - Kalerpotro",
    description:
      "Read today's news from Kalerpotro. Stay updated with the latest headlines and articles.",
    openGraph: {
      title: "আজকের খবর - Kalerpotro",
      description:
        "Read today's news from Kalerpotro. Stay updated with the latest headlines and articles.",
      images: [
        {
          url: "https://i.ibb.co/J2sSKhn/kalerpotro-news.jpg",
          width: 1200,
          height: 630,
          alt: "Kalerpotro Latest News",
        },
      ],
      url: "https://kalerpotro.vercel.app/latest-news",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "আজকের খবর - Kalerpotro",
      description:
        "Read today's news from Kalerpotro. Stay updated with the latest headlines and articles.",
      images: ["https://i.ibb.co/J2sSKhn/kalerpotro-news.jpg"],
    },
  };
}

interface Props {
  params: {
    tag: string;
  };
}

const TagNews: React.FC<Props> = async ({ params }) => {
  const dateSortedNews = await getNewsByDate();
  const shareCountSortNews = await getMostShareNews();
  const bannerPromise = getBanner();
  const newsPromise = getNewsByTags({ tag: params.tag });
  const adsPromise = getAds();

  const [banners, ads, news]: [BannerProps[], AdsProps[], NewsProps[]] =
    await Promise.all([bannerPromise, adsPromise, newsPromise]);

  return (
    <div className="mb-10 px-5 lg:px-10 xl:px-20 2xl:px-40 4k:px-96 bg-[#F5F5F5] py-10">
      <div className="flex items-center gap-2 mb-10">
        <h1 className="text-xl font-bold text-gray-500">Trending Tag</h1>
        <IoMdArrowDropright className="text-red-600 text-2xl" />
        <h1 className="text-xl font-bold text-red-600">
          {decodeURIComponent(params.tag)}
        </h1>
      </div>
      <div className="w-full flex items-center justify-center my-5">
        {banners
          .filter((ad) => ad.page === "NEWS_POST")
          .sort((a, b) => a.order - b.order)
          .slice(1, 2)
          .map((ad) => (
            <Banner
              key={ad.id}
              image={ad.image}
              link={ad.link}
              height={ad.height}
              width={ad.width}
              video={ad.video}
              type={ad.file_type}
              closable
            />
          ))}
      </div>
      {news.length > 0 ? (
        <div className="w-full grid grid-cols-[70%_25%] row-auto items-start gap-[5%]">
          <PaginationClient
            colNum={3}
            itemsPerPage={6}
            totalItems={news?.length}
            newsItems={news}
          />
          <div className="flex flex-col items-center gap-y-5">
            <div className="w-full bg-white p-2">
              <div className="bg-red-600 text-white font-bold text-lg py-3 rounded-md flex items-center justify-center">
                সর্বশেষ
              </div>
              <Suspense fallback={<h1>Loading...</h1>}>
                <LatestNews dateSortedNews={dateSortedNews} />
              </Suspense>
            </div>
            <div className="w-full bg-white p-2">
              <div className="bg-red-600 text-white font-bold text-lg py-3 rounded-md flex items-center justify-center">
                পাঠকপ্রিয়
              </div>
              <Suspense fallback={<h1>Loading...</h1>}>
                <PopularNews shareCountSortNews={shareCountSortNews} />
              </Suspense>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full w-full">
          <div className="bg-gray-100 rounded-lg p-8">
            <p className="text-xl text-gray-500">No results found</p>
          </div>
        </div>
      )}

      {ads
        .filter((ad) => ad.page === "NEWS_POST")
        .sort((a, b) => a.order - b.order)
        .slice(0, 1)
        .map((ad) => (
          <Banner
            key={ad.id}
            image={ad.image}
            link={ad.link}
            height={ad.height}
            width={ad.width}
            type={ad.file_type}
            closable
          />
        ))}
    </div>
  );
};

export default TagNews;
