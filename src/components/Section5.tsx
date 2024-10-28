import Banner from "@/components/Banner";
import HeadingText from "@/components/HeadingText";
import { blurImage } from "@/constants/blurImage";
import { getAds } from "@/lib/getAds";
import { getCategory } from "@/lib/getCategory";
import { getNewsByCategory } from "@/lib/getNewsByCategory";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AdsProps, NewsProps } from "./types";

interface Props {
  categories: number[];
}

const Section5: React.FC<Props> = async ({ categories }) => {
  const ads: AdsProps[] = await getAds();

  const categoriesData = await Promise.all(
    categories.map(async (categoryId) => {
      const categoryName = await getCategory(categoryId);
      const categoryPosts = await getNewsByCategory({ id: categoryId });
      return { categoryId, categoryName, categoryPosts };
    })
  );

  const renderNewsPosts = (posts: NewsProps[], categoryName: string) => {
    if (posts.length === 0) return null;

    return (
      <>
        <Link href={`/${categoryName}/news/${posts[0].id}`}>
          <div className="relative my-4 cursor-pointer">
            <Image
              src={posts[0].image}
              alt={posts[0].headline}
              width={500}
              height={208}
              quality={80}
              placeholder="blur"
              blurDataURL={blurImage.url}
              className="w-full h-52 object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-20 z-20"></div>
            <h1 className="absolute bottom-5 left-5 right-5 lg:text-base text-sm text-white font-bold z-30">
              {posts[0].headline}
            </h1>
          </div>
        </Link>
        {posts.slice(1, 4).map((post) => (
          <Link key={post.id} href={`/${categoryName}/news/${post.id}`}>
            <div className="flex items-start gap-3 bg-white p-1 mb-5 cursor-pointer">
              <Image
                src={post.image}
                alt={post.headline}
                width={200}
                height={100}
                quality={80}
                placeholder="blur"
                blurDataURL={blurImage.url}
                className={`object-cover ${
                  categories.length === 4 ? "w-1/2 h-20" : "w-2/5 h-24"
                }`}
              />
              <div
                className={`flex-1 text-${
                  categories.length === 4 ? "sm" : "base"
                } overflow-hidden text-ellipsis`}
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {post.headline}
              </div>
            </div>
          </Link>
        ))}
      </>
    );
  };

  return (
    <div
      className={`grid items-start gap-y-10 lg:gap-4 px-5 lg:px-10 xl:px-20 2xl:px-40 4k:px-96 bg-[#F5F5F5] py-5 my-10 ${
        categories.length === 4
          ? "lg:grid-cols-4 grid-cols-1"
          : "lg:grid-cols-[35%_35%_30%] grid-cols-1"
      }`}
    >
      {categoriesData.map(({ categoryId, categoryName, categoryPosts }) => {
        if (!categoryName) return null;

        return (
          <div className="p-2.5" key={categoryId}>
            <HeadingText title={categoryName?.name} className={"mb-5"} />
            {renderNewsPosts(categoryPosts, categoryName.name)}{" "}
          </div>
        );
      })}

      {categories.length !== 4 && (
        <div className="p-2.5">
          <div className="mt-14 flex flex-col justify-between">
            {ads
              .filter((ad) => ad.page === "HOME" && ad.section === "5")
              .sort((a, b) => a.order - b.order)
              .slice(0, 2)
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
            {ads
              .filter((ad) => ad.page === "HOME" && ad.section === "7")
              .sort((a, b) => a.order - b.order)
              .slice(0, 2)
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
            {ads
              .filter((ad) => ad.page === "HOME" && ad.section === "10")
              .sort((a, b) => a.order - b.order)
              .slice(0, 2)
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
        </div>
      )}
    </div>
  );
};

export default Section5;
