import { NewsProps } from "@/components/types";

export const getNewsByDate = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/news/list/`,
    {
      next: {
        revalidate: 10,
      },
    }
  );

  if (!res.ok) {
    throw new Error(
      `Failed to fetch the news based on date, status: ${res.status}`
    );
  }

  const data: NewsProps[] = await res.json();

  const news = data
    .filter((newsItem) => newsItem.is_active)
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

  return news;
};
