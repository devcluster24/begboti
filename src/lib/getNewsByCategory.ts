import { NewsProps } from "@/components/types";

interface Props {
  category?: string;
  id?: number;
}

export const getNewsByCategory = async ({ category, id }: Props) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/news/list/`,
    {
      next: {
        revalidate: 10,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Something Went Wrong while fetching category news!");
  }

  const data: NewsProps[] = await res.json();
  const news = category
    ? data.filter(
        (newsItem) =>
          newsItem.is_active &&
          newsItem.category_name === decodeURIComponent(category)
      )
    : data.filter((newsItem) => newsItem.is_active && newsItem.category === id);

  return news;
};
