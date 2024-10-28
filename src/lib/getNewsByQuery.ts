import { NewsProps } from "@/components/types";

interface Props {
  query: string;
}

export const getNewsByQuery = async ({ query }: Props) => {
  const queryWord = decodeURIComponent(query);
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
  const news = data.filter((newsItem) =>
    queryWord
      .toLowerCase()
      .split(" ")
      .some(
        (word) =>
          newsItem.headline.toLowerCase().includes(word) ||
          newsItem.content.toLowerCase().includes(word)
      )
  );

  return news;
};
