export const getFooterLinks = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/ad/footerlinks/list/`
  );

  if (!res.ok) {
    throw new Error("Something Went Wrong while fetching navbar links!");
  }

  return res.json();
};
