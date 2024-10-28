import HeadingText from "@/components/HeadingText";
import NewsCard from "@/components/NewsCard";
import { getAllNews } from "@/lib/getAllNews";
import React from "react";

interface Props {
  category: number;
}

const Section3: React.FC<Props> = async ({ category }) => {
  const news = await getAllNews();

  const activeNews = [...news]
    .sort((a, b) => b.id - a.id)
    .filter((item) => item.is_active);

  return (
    <div className="py-5 my-10 bg-[#F5F5F5] w-full px-5 lg:px-10 xl:px-20 2xl:px-40 4k:px-96">
      <HeadingText title={"সর্বশেষ"} redirect={false} />
      <div className="w-full mt-10 grid lg:grid-cols-4 grid-cols-1 md:grid-cols-2 gap-4 2xl:gap-4 2xl:gap-y-16 items-stretch">
        {activeNews.slice(1, 9).map((newsItem) => (
          <NewsCard key={newsItem.id} news={newsItem} />
        ))}
      </div>
    </div>
  );
};

export default Section3;
