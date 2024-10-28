export const getAds = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/ad/list/`);

  if (!res.ok) {
    throw new Error("Something Went Wrong while fetching ads!");
  }

  return res.json();
};
