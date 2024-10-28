export const getNavbarLinks = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/ad/navbarlink/list/`
  );

  if (!res.ok) {
    throw new Error("Something Went Wrong while fetching navbar links!");
  }

  return res.json();
};
