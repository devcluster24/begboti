import { NewsProps } from "@/components/types";

interface NewsItem {
  id: number;
  is_active: boolean;
  share_count: number;
}

export const getMostShareNews = async () => {
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
      `Failed to fetch the most shared news, status: ${res.status}`
    );
  }

  const data: NewsProps[] = await res.json();

  const mostSharedNews = data
    .filter((newsItem) => newsItem.is_active)
    .sort((a, b) => b.share_count - a.share_count);

  return mostSharedNews;
};
