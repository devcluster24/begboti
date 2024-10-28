import Section1 from "@/components/Section1";
import Section2 from "@/components/Section2";
import Section3 from "@/components/Section3";
import Section4 from "@/components/Section4";
import Section5 from "@/components/Section5";
import Section6 from "@/components/Section6";
import Section7 from "@/components/Section7";
import { BannerProps, CategoryProps } from "@/components/types";
import { getBanner } from "@/lib/getBanner";
import { getCategories } from "@/lib/getCategories";
import Banner from "../components/Banner";

const Home = async () => {
  const categoriesPromise = getCategories();
  const bannerPromise = getBanner();

  const [categories, banner]: [CategoryProps[], BannerProps[]] =
    await Promise.all([categoriesPromise, bannerPromise]);

  const sortedCategories = (categories || []).sort((a, b) => a.order - b.order);
  const sortedBanners = (banner || [])
    .filter((banner) => banner.page === "HOME")
    .sort((a, b) => a.order - b.order);

  const getCategoryByOrder = (order: number) => {
    return (
      sortedCategories.find((category) => category.order === order) || {
        id: 1,
        order: 1,
      }
    );
  };

  return (
    <>
      <Section1 />
      {getCategoryByOrder(2) && (
        <Section3 category={getCategoryByOrder(2).id} />
      )}
      {getCategoryByOrder(1) && (
        <Section2 category={getCategoryByOrder(1).id} />
      )}

      {sortedBanners[0] && (
        <Banner
          key={sortedBanners[0].id}
          image={sortedBanners[0].image}
          link={sortedBanners[0].link}
          height={sortedBanners[0].height}
          width={sortedBanners[0].width}
          video={sortedBanners[0].video}
          type={sortedBanners[0].file_type}
          closable={true}
        />
      )}

      {getCategoryByOrder(3) && (
        <Section4 category={getCategoryByOrder(3).id} />
      )}
      {getCategoryByOrder(4) && getCategoryByOrder(5) && (
        <Section5
          categories={[getCategoryByOrder(4).id, getCategoryByOrder(5).id]}
        />
      )}
      {sortedBanners[1] && (
        <Banner
          key={sortedBanners[1].id}
          image={sortedBanners[1].image}
          link={sortedBanners[1].link}
          height={sortedBanners[1].height}
          width={sortedBanners[1].width}
          video={sortedBanners[0].video}
          type={sortedBanners[0].file_type}
          closable={true}
        />
      )}
      {getCategoryByOrder(6) && (
        <Section4 category={getCategoryByOrder(6).id} />
      )}
      {getCategoryByOrder(7) && getCategoryByOrder(8) && (
        <Section5
          categories={[getCategoryByOrder(7).id, getCategoryByOrder(8).id]}
        />
      )}
      {getCategoryByOrder(9) && (
        <Section6 category={getCategoryByOrder(9).id} />
      )}
      {sortedBanners[2] && (
        <Banner
          key={sortedBanners[2].id}
          image={sortedBanners[2].image}
          link={sortedBanners[2].link}
          height={sortedBanners[2].height}
          width={sortedBanners[2].width}
          video={sortedBanners[0].video}
          type={sortedBanners[0].file_type}
          closable={true}
        />
      )}
      {getCategoryByOrder(10) && (
        <Section4 category={getCategoryByOrder(10).id} />
      )}
      {getCategoryByOrder(11) &&
        getCategoryByOrder(12) &&
        getCategoryByOrder(13) &&
        getCategoryByOrder(14) && (
          <Section5
            categories={[
              getCategoryByOrder(11).id,
              getCategoryByOrder(12).id,
              getCategoryByOrder(13).id,
              getCategoryByOrder(14).id,
            ]}
          />
        )}
      <Section7 />
    </>
  );
};

export default Home;
