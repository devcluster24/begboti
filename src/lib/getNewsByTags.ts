import { NewsProps, TrendingTagsProps } from "@/components/types";
import { getTrendingTags } from "./getTrendingTags";

interface Props {
  tag: string;
}

export const getNewsByTags = async ({ tag }: Props): Promise<NewsProps[]> => {
  const trendingTags: TrendingTagsProps[] = await getTrendingTags();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/news/list/`,
    {
      next: {
        revalidate: 10,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Something went wrong while fetching tag news!");
  }

  const data: NewsProps[] = await res.json();

  const tagName = decodeURIComponent(tag);

  const findTag: TrendingTagsProps | undefined = trendingTags.find(
    (tren) => tren.tag === tagName
  );

  if (!findTag) {
    return [];
  }

  const newsByTag: NewsProps[] = data.filter((tagNews) =>
    tagNews.trending_tags.includes(findTag.id)
  );

  return newsByTag;
};
