import { blurImage } from "@/constants/blurImage";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { NewsProps } from "./types";

interface PopularNewsProps {
  shareCountSortNews: NewsProps[];
}

const PopularNews: React.FC<PopularNewsProps> = ({ shareCountSortNews }) => {
  return (
    <div className="w-full grid grid-cols-1 row-auto items-center h-[300px] overflow-y-auto gap-y-3 scroll mt-5">
      {shareCountSortNews.slice(0, 5).map((newsItem) => (
        <Link
          key={newsItem.id}
          href={`/${newsItem.category_name}/news/${newsItem.id}`}
        >
          <div className="w-full flex items-start gap-3 cursor-pointer border border-gray-300 p-1 rounded-md">
            <Image
              width={120}
              height={80}
              quality={80}
              placeholder="blur"
              blurDataURL={blurImage.url}
              src={`${newsItem.image}`}
              alt="news.png"
              loading="lazy"
              className="w-full object-cover h-full overflow-hidden rounded-md"
            />
            <h1 className="text-sm font-medium w-full">{newsItem.headline}</h1>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PopularNews;
