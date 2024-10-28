import HeadingText from "@/components/HeadingText";
import Slider from "@/components/Slider";
import { getCategory } from "@/lib/getCategory";
import { getNewsByCategory } from "@/lib/getNewsByCategory";
import React from "react";

interface Props {
  category: number;
}

const Section4: React.FC<Props> = async ({ category }) => {
  const filterNews = await getNewsByCategory({ id: category });
  const singleCategory = await getCategory(category);

  return (
    <div className="w-full px-5 lg:px-10 xl:px-20 2xl:px-40 4k:px-96 bg-[#F5F5F5] py-5 my-10">
      <div className="w-full flex items-center justify-start">
        <HeadingText title={singleCategory?.name} />
      </div>
      <Slider filterNews={filterNews} />
    </div>
  );
};

export default Section4;
