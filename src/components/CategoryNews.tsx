import { blurImage } from "@/constants/blurImage";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { NewsProps } from "./types";

interface CategoryNewsProps {
  categoryNews: NewsProps[];
}

const CategoryNews: React.FC<CategoryNewsProps> = ({ categoryNews }) => {
  return (
    <div className="mt-10 w-full grid lg:grid-cols-4 grid-cols-1 row-auto items-stretch gap-5">
      {categoryNews.slice(0, 12).map((newsItem) => (
        <Link
          key={newsItem.id}
          href={`/${newsItem?.category_name}/news/${newsItem.id}`}
        >
          <div className="w-full h-full flex flex-col items-start gap-3 cursor-pointer border border-gray-300 p-2">
            <Image
              height={200}
              quality={80}
                    placeholder="blur"
                    blurDataURL={blurImage.url}
              width={200}
              src={`${newsItem.image}`}
              alt="news.png"
              className="w-full h-full object-cover"
            />
            <h1 className="font-bold text-base">{newsItem.headline}</h1>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryNews;
