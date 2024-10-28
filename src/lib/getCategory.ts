import { CategoryProps } from "@/components/types";

export const getCategory = async (id: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/news/category/list/`
  );

  if (!res.ok) {
    throw new Error("Something Went Wrong while fetching category!");
  }

  const data: CategoryProps[] = await res.json();
  const category = data.find((category) => category.id === id);
  return category;
};
