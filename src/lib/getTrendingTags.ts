export const getTrendingTags = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/ad/trendingtags/list/`
  );

  if (!res.ok) {
    throw new Error("Something Went Wrong while fetching trending tags!");
  }

  return res.json();
};
