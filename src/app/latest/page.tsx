import Banner from "@/components/Banner";
import PaginationClient from "@/components/PaginationClient";
import { AdsProps, BannerProps, NewsProps } from "@/components/types";
import { getAds } from "@/lib/getAds";
import { getAllNews } from "@/lib/getAllNews";
import { getBanner } from "@/lib/getBanner";
import { Metadata } from "next";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "আজকের খবর - বেগবতী২৪.কম",
    description:
      "Read today's news from বেগবতী২৪.কম. Stay updated with the latest headlines and articles.",
    openGraph: {
      title: "আজকের খবর - বেগবতী২৪.কম",
      description:
        "Read today's news from বেগবতী২৪.কম. Stay updated with the latest headlines and articles.",
      images: [
        {
          url: "https://i.ibb.co/J2sSKhn/kalerpotro-news.jpg",
          width: 1200,
          height: 630,
          alt: "বেগবতী২৪.কম Latest News",
        },
      ],
      url: "https://begboti24.com/latest-news",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "আজকের খবর - বেগবতী২৪.কম",
      description:
        "Read today's news from বেগবতী২৪.কম. Stay updated with the latest headlines and articles.",
      images: ["https://i.ibb.co/J2sSKhn/kalerpotro-news.jpg"],
    },
  };
}

const LatestNews: React.FC = async () => {
  const bannerPromise = getBanner();
  const newsPromise = getAllNews();
  const adsPromise = getAds();

  const [banners, ads, news]: [BannerProps[], AdsProps[], NewsProps[]] =
    await Promise.all([bannerPromise, adsPromise, newsPromise]);

  const today = new Date().toISOString().split("T")[0];
  const todayDateNews = news.filter(
    (newsItem) => newsItem.created_at.split("T")[0] === today
  );

  return (
    <div className="mb-10 px-5 lg:px-10 xl:px-20 2xl:px-40 4k:px-96 bg-[#F5F5F5] py-10">
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
              type="image"
              closable
            />
          ))}
      </div>

      <div className="flex items-center mb-10">
        <h1 className="text-3xl font-bold text-red-600">আজকের খবর</h1>
      </div>

      {todayDateNews.length > 0 ? (
        <>
          <PaginationClient
            colNum={4}
            itemsPerPage={8}
            totalItems={todayDateNews?.length}
            newsItems={todayDateNews}
          />
        </>
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

export default LatestNews;
