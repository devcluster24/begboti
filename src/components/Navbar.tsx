// app/components/Navbar.tsx
import NavLinks from "@/components/NavLinks";
import TrendingTags from "@/components/TrendingTags";
import { getLogos } from "@/lib/getLogos";
import { getNavbarLinks } from "@/lib/getNavbarLinks";
import { getTrendingTags } from "@/lib/getTrendingTags";
import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";
import { FC, Suspense } from "react";

interface LogoProps {
  id: string;
  image: string;
  width: number;
  height: number;
  portal_type: string;
  is_active: boolean;
}

const myFont = localFont({
  src: "../../public/primary-light.ttf",
  display: "swap",
});

const Navbar: FC = async () => {
  const [logos, navbarLinks, trendingTags] = await Promise.all([
    getLogos(),
    getNavbarLinks(),
    getTrendingTags(),
  ]);

  const dateToday = new Intl.DateTimeFormat("bn", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(new Date());

  return (
    <nav className={`w-full`}>
      <div className="w-full px-3 lg:px-16 xl:px-20 2xl:px-40 4k:px-96 py-5">
        <div className="lg:flex md:flex hidden items-center justify-between">
          <div className="font-bold lg:text-lg text-xs text-red-600">
            {dateToday}
          </div>
          <Link href="/">
            <div className="lg:flex hidden md:flex items-center justify-center">
              {logos
                .filter(
                  (logo: LogoProps) =>
                    logo.portal_type === "NEWSPORTAL" && logo.is_active
                )
                .map((logo: LogoProps) => (
                  <Image
                    key={logo.id}
                    src={logo.image}
                    width={logo.width}
                    height={logo.height}
                    className="object-cover"
                    alt={"Kalerpotro_com_logo.png"}
                    quality={100}
                  />
                ))}
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/latest">
              <p className="bg-[#3B82F6] rounded-md text-white font-medium lg:px-4 px-2 w-full py-2 lg:text-base text-xs">
                আজকের খবর
              </p>
            </Link>
          </div>
        </div>
        <Link href={"/"}>
          <div className="flex lg:hidden md:hidden items-center justify-center">
            {logos &&
              logos
                ?.filter(
                  (logo: LogoProps) =>
                    logo.portal_type === "NEWSPORTAL" && logo.is_active === true
                )
                ?.map((logo: LogoProps) => (
                  <Image
                    key={logo.id}
                    src={logo.image}
                    width={logo.width}
                    height={logo.height}
                    className="object-cover"
                    alt={"Kalerpotro_com_logo.png"}
                    quality={100}
                  />
                ))}
          </div>
        </Link>
        <div className="flex lg:hidden md:hidden flex-row gap-3 items-center justify-between mt-5">
          <div className="font-bold lg:text-lg text-lg text-[#3B82F6]">
            {dateToday}
          </div>
          <div className="flex items-center lg:gap-3 gap-2">
            <Link href="/latest">
              <p className="bg-[#2563EB] rounded-md text-white font-medium lg:px-4 px-2 w-full py-2 lg:text-base text-xs ">
                আজকের খবর
              </p>
            </Link>
          </div>
        </div>
      </div>
      <Suspense
        fallback={
          <div className="w-full text-center py-4">Loading search...</div>
        }
      >
        <NavLinks navLinks={navbarLinks} />
      </Suspense>
      <Suspense
        fallback={
          <div className="w-full text-center py-4">
            Loading trending tags...
          </div>
        }
      >
        <TrendingTags trendings={trendingTags} />
      </Suspense>
    </nav>
  );
};

export default Navbar;
