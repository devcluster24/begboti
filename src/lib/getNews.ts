import { NewsProps } from "@/components/types";

interface NewsItem {
  id: number;
  category_name: string;
  is_active: boolean;
}

export const getNews = async (id: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/news/list/`,
    {
      next: {
        revalidate: 10,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Something Went Wrong while fetching news!");
  }

  const data: NewsProps[] = await res.json();
  const news = data.filter(
    (newsItem) => newsItem.is_active && newsItem.id === id
  );

  return news[0];
};
