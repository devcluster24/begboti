export const getLogos = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/ad/logo/list/`
  );

  if (!res.ok) {
    throw new Error("Something Went Wrong while fetching navbar logo!");
  }

  return res.json();
};
