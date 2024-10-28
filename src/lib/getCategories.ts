export const getCategories = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/news/category/list/`
  );

  if (!res.ok) {
    throw new Error("Something Went Wrong while fetching category!");
  }

  return res.json();
};
