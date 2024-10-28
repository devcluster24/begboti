export const getBanner = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/ad/banner/list/`
  );

  if (!res.ok) {
    throw new Error("Something Went Wrong while fetching banners!");
  }

  return res.json();
};
