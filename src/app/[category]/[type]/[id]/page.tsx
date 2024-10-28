import Banner from "@/components/Banner";
import CategoryNews from "@/components/CategoryNews";
import LatestNews from "@/components/LatestNews";
import NewsShareButton from "@/components/NewsShareButton";
import Parser from "@/components/Parser";
import PopularNews from "@/components/PopularNews";
import { AdsProps, BannerProps, NewsProps } from "@/components/types";
import { blurImage } from "@/constants/blurImage";
import { getAds } from "@/lib/getAds";
import { getAllNews } from "@/lib/getAllNews";
import { getBanner } from "@/lib/getBanner";
import { getMostShareNews } from "@/lib/getMostShareNews";
import { getNews } from "@/lib/getNews";
import { getNewsByCategory } from "@/lib/getNewsByCategory";
import { getNewsByDate } from "@/lib/getNewsByDate";
import { dateToTime } from "@/utils/dateToTime";
import { getEmbedUrl } from "@/utils/getEmbedUrl";
import DOMPurify from "isomorphic-dompurify";
import { JSDOM } from "jsdom";
import { Metadata } from "next";
import Image from "next/image";
import { FC, Suspense } from "react";
import { FaUserEdit } from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import { IoTimeOutline } from "react-icons/io5";
import { RxDoubleArrowRight } from "react-icons/rx";

interface NewsDetailsProps {
  params: {
    category: string;
    id: string;
    type: string;
  };
}

function htmlToText(html: string): string {
  const dom = new JSDOM(html);
  return dom.window.document.body.textContent || "";
}

export async function generateMetadata({
  params,
}: NewsDetailsProps): Promise<Metadata> {
  const { id, type } = params;
  const singleNews = await getNews(parseInt(id));

  const sanitizedHtml = DOMPurify.sanitize(singleNews?.content || "");

  const plainTextContent = htmlToText(sanitizedHtml);

  const description = plainTextContent;

  return {
    title: singleNews.headline,
    description: description,
    openGraph: {
      title: singleNews.headline,
      description: description,
      images: [
        {
          url: singleNews.image,
          width: 1200,
          height: 630,
          alt: singleNews.headline,
        },
      ],
      url: `https://kalerpotro.vercel.app/${singleNews.category_name}/${
        type === "news" ? "news" : "video"
      }/${id}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: singleNews.headline,
      description: description,
      images: [singleNews.image],
    },
  };
}

const NewsDetails: FC<NewsDetailsProps> = async ({ params }) => {
  const { category, id, type } = params;
  const singleNews = await getNews(parseInt(id));
  const dateSortedNews = await getNewsByDate();
  const shareCountSortNews = await getMostShareNews();
  const categoryNews = await getNewsByCategory({
    category: category,
  });

  const [banners, ads]: [BannerProps[], AdsProps[]] = await Promise.all([
    getBanner(),
    getAds(),
  ]);

  return (
    <div className="w-full px-5 lg:px-10 xl:px-20 2xl:px-40 4k:px-96 bg-[#F5F5F5] py-10">
      <div className="w-full grid lg:grid-cols-[70%_25%] grid-cols-1 row-auto items-start gap-[2%]">
        <div className="w-full flex flex-col items-start gap-5">
          <div className="w-full bg-white border border-gray-200 rounded-md px-5 py-2 flex items-center justify-start gap-2 text-gray-600">
            <HiHome />
            <span>হোম</span>
            <RxDoubleArrowRight />
            <span>{singleNews?.category_name}</span>
          </div>
          <div className="w-full mt-5 flex flex-col items-start gap-2">
            <h1 className="text-3xl font-bold tracking-wider">
              {singleNews.headline}
            </h1>
            <hr className="w-full border border-gray-200 my-2" />
            <div className="w-full gap-2 lg:flex-row md:flex-row flex flex-col lg:items-center items-start md:items-center justify-between">
              <div className="w-full ">
                <div className="flex items-center gap-2">
                  <FaUserEdit className="text-blue-600 text-lg" />
                  <span className="text-blue-600">
                    {singleNews.editor_name}
                  </span>
                  <span className="text-blue-300">||</span>
                  <span className="italic text-gray-500"> কালেরপত্র.কম</span>
                </div>
                <div className="flex items-center gap-3 text-gray-500 text-sm">
                  <IoTimeOutline className="text-red-600 text-lg" />
                  <span>প্রকাশিত:</span>
                  <span>{dateToTime(singleNews.created_at)}</span>
                </div>
              </div>
              <NewsShareButton
                news={singleNews}
                catName={category}
                iconName={false}
                type={"news"}
              />
            </div>
            {type === "video" && (
              <div className="w-full lg:h-[500px] h-[300px] bg-white p-3">
                <iframe
                  width="560"
                  height="500"
                  src={getEmbedUrl(singleNews.video) || ""}
                  title="Video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            )}
            {type === "news" && (
              <div className="w-full mt-5 relative">
                <Image
                  height={800}
                  width={500}
                  layout="responsive"
                  src={`${singleNews.image}`}
                  quality={80}
                  placeholder="blur"
                  blurDataURL={blurImage.url}
                  alt="image.png"
                  className="w-full object-cover h-full rounded-md mb-2"
                />
                <span className="text-gray-500 italic text-sm">
                  {singleNews?.photo_editor}
                </span>
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
                  closable={true}
                />
              ))}
            <div className="w-full flex items-center justify-center"></div>
            {type === "news" && (
              <div className="mt-5 w-full bg-white p-5">
                <Parser text={singleNews?.content} card={false} />
              </div>
            )}
            {banners
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
                  type={"image"}
                  closable={true}
                />
              ))}
          </div>
        </div>
        <div className="w-full flex-col items-center gap-4">
          <div className="w-full">
            {type === "news" && getEmbedUrl(singleNews.video) && (
              <div className="w-full h-[200px] bg-[#F5F5F5] p-1">
                <iframe
                  width="560"
                  height="500"
                  src={getEmbedUrl(singleNews.video) || ""}
                  title="Video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            )}
            <div className="w-full mt-5 bg-white p-2">
              <div className="bg-red-600 text-white font-bold text-lg py-3 rounded-md flex items-center justify-center">
                সর্বশেষ
              </div>
              <Suspense fallback={<h1>Loading...</h1>}>
                <LatestNews dateSortedNews={dateSortedNews} />
              </Suspense>
            </div>
            <div className="w-full mt-5 bg-white p-2">
              <div className="bg-red-600 text-white font-bold text-lg py-3 rounded-md flex items-center justify-center">
                পাঠকপ্রিয়
              </div>
              <Suspense fallback={<h1>Loading...</h1>}>
                <PopularNews shareCountSortNews={shareCountSortNews} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:mt-10 mt-40 bg-white p-3">
        <div className="bg-red-600 px-4 py-3 text-white font-bold text-center inline-flex items-center gap-2">
          <h1 className="">আরো পড়ুন</h1>
          <RxDoubleArrowRight className="text-xl" />
        </div>
        <Suspense fallback={<h1>Loading...</h1>}>
          <CategoryNews categoryNews={categoryNews} />
        </Suspense>
      </div>
    </div>
  );
};

export default NewsDetails;

export async function generateStaticParams() {
  const news: NewsProps[] = await getAllNews();

  return news.map((newsItem) => ({
    id: newsItem.id.toString(),
    category: newsItem.category_name,
  }));
}
