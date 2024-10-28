"use client";
import Link from "next/link";
import React from "react";
import { TrendingTagsProps } from "./types";

interface Props {
  trendings: TrendingTagsProps[];
}

const TrendingTags: React.FC<Props> = ({ trendings }) => {
  return (
    <ul className="flex items-center gap-3 overflow-x-auto lg:justify-center justify-start md:justify-center trending lg:px-16 xl:px-20 2xl:px-40 4k:px-96 py-5 px-3">
      <h1 className="lg:text-base text-sm font-bold">ট্রেন্ডিং: </h1>
      {trendings
        .filter((trending) => trending.is_latest)
        .map((trending) => (
          <Link href={`/tag/${trending.tag}`} key={trending.id}>
            <li
              className="lg:text-base text-sm rounded-md border font-semibold border-sky-500 text-indigo-700
 lg:px-4 px-2 lg:py-2 py-2 cursor-pointer whitespace-nowrap flex-shrink-0"
            >
              {trending.tag}
            </li>
          </Link>
        ))}
    </ul>
  );
};

export default TrendingTags;
