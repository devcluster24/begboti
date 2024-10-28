import { getNewsByDate } from "@/lib/getNewsByDate";
import { getEmbedUrl } from "@/utils/getEmbedUrl";
import Link from "next/link";
import { FaPlay } from "react-icons/fa6";
import HeadingText from "./HeadingText";
import { NewsProps } from "./types";

const Section7 = async () => {
  const recentNews: NewsProps[] = await getNewsByDate();

  return (
    <div className="w-full px-5 lg:px-10 xl:px-20 2xl:px-40 4k:px-96 bg-[#F5F5F5] py-5 my-10">
      <HeadingText title={"ভিডিও গ্যালারি"} redirect={false} />
      <div className="w-full grid lg:grid-cols-[38%_60%] grid-cols-1 md:grid-cols-2 row-auto items-start lg:gap-[2%] gap-5 md:gap-10 relative mt-10">
        {recentNews.slice(0, 1).map((newsItem) => (
          <div
            key={newsItem.id}
            className="w-full h-[320px] relative bg-black flex items-center justify-center overflow-hidden rounded-md md:col-span-3 lg:col-auto"
          >
            <iframe
              width="560"
              height="500"
              src={getEmbedUrl(newsItem.video) || ""}
              title="Video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full h-full md:h-[300px] lg:h-auto"
            ></iframe>
            <Link href={`/${newsItem.category_name}/video/${newsItem.id}`}>
              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 flex items-center justify-center cursor-pointer">
                <FaPlay className="text-white lg:text-6xl text-3xl" />
              </div>
            </Link>
          </div>
        ))}
        <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 row-auto items-stretch gap-5 md:col-span-3 lg:col-auto">
          {recentNews.slice(1, 7).map((newsItem) => (
            <div
              key={newsItem.id}
              className="w-full h-full relative bg-black flex items-end justify-center overflow-hidden rounded-md"
            >
              <iframe
                width="560"
                height="500"
                src={getEmbedUrl(newsItem.video) || ""}
                title="Video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full md:h-[250px] lg:h-auto"
              ></iframe>
              <Link href={`/${newsItem.category_name}/video/${newsItem.id}`}>
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 flex items-center justify-center cursor-pointer">
                  <FaPlay className="text-white text-3xl" />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Section7;
