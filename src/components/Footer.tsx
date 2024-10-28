import Banner from "@/components/Banner";
import SendNewsletter from "@/components/SendNewsletter";
import { getCompanyBanner } from "@/lib/getCompanyBanner";
import { getFooterLinks } from "@/lib/getFooterLinks";
import { getLogos } from "@/lib/getLogos";
import Image from "next/image";
import Link from "next/link";

interface CompanyBanner {
  id: string;
  image: string;
  width: number;
  height: number;
  is_active: boolean;
}

interface Logo {
  id: string;
  image: string;
  width: number;
  height: number;
  portal_type: string;
  is_active: boolean;
}

interface FooterLink {
  id: string;
  name: string;
  url: string;
  column: number;
  order: number;
}

const Footer = async () => {
  const footerLinksPromise = getFooterLinks();
  const logosPromise = getLogos();
  const companyBannerPromise = getCompanyBanner();

  const [footerLinks, logos, companyBanner]: [
    FooterLink[],
    Logo[],
    CompanyBanner[]
  ] = await Promise.all([
    footerLinksPromise,
    logosPromise,
    companyBannerPromise,
  ]);

  const column1Links = footerLinks
    .filter((link) => link.column === 1)
    .sort((a, b) => a.order - b.order);
  const column2Links = footerLinks
    .filter((link) => link.column === 2)
    .sort((a, b) => a.order - b.order);
  const socialLinks = footerLinks
    .filter((link) => link.column === 3)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="w-full bg-gray-200 px-10 py-10 grid grid-cols-1 row-auto items-center gap-5 4k:px-96">
      <div className="w-full flex lg:flex-row flex-col items-center gap-5 justify-between">
        <div className="w-full flex lg:items-start items-center flex-col">
          <Link href={"/"}>
            <div className="lg:flex hidden md:flex items-center justify-center">
              {logos &&
                logos
                  ?.filter(
                    (logo) =>
                      logo.portal_type === "NEWSPORTAL" &&
                      logo.is_active === true
                  )
                  ?.map((logo) => (
                    <Image
                      key={logo.id}
                      src={logo.image}
                      width={logo.width}
                      height={logo.height}
                      className={`object-cover`}
                      alt="logo.png"
                    />
                  ))}
            </div>
          </Link>
          <p className="text-center lg:text-start">
            বাংলাদেশের খবর | Bangladesh News Update
          </p>
        </div>
        <div className="grid lg:grid-cols-2 grid-cols-1 row-auto items-center gap-2 w-full justify-between">
          {/* Column 1 Links */}
          <div className="flex items-center flex-col gap-2 justify-center">
            {column1Links.map((link) => (
              <Link key={link.id} href={link.url}>
                {link.name}
              </Link>
            ))}
          </div>
          {/* Column 2 Links */}
          <div className="flex items-center flex-col gap-2 justify-center">
            {column2Links.map((link) => (
              <Link key={link.id} href={link.url}>
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-2">
          <h2 className="text-lg font-bold">নিউজলেটার</h2>
          <SendNewsletter />
        </div>
      </div>
      <hr className="border border-gray-300 my-3 w-full rounded-full" />
      <div className="w-full grid lg:grid-cols-2 grid-cols-1 row-auto items-center gap-5">
        <h1 className="text-center lg:text-start">
          এই ওয়েবসাইটের কোনো লেখা বা ছবি অনুমতি ছাড়া নকল করা বা অন্য কোথাও
          প্রকাশ করা সম্পূর্ণ বেআইনি। সকল স্বত্ব{" "}
          <span className="text-indigo-700 font-semibold">
            www.begboti24.com{" "}
          </span>
          কর্তৃক সংরক্ষিত
        </h1>
        <div className="w-full flex flex-col lg:items-end items-center gap-2">
          <div className="flex flex-col items-center gap-2">
            <h1 className="">অনুসরণ করুন</h1>
            <div className="flex items-center justify-center gap-3">
              {socialLinks.map((social) => {
                if (social.name === "Facebook") {
                  return (
                    <Link key="facebook" href={social.url}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="28"
                        width="28"
                        viewBox="0 0 32 32"
                        // enable-background="new 0 0 32 32"
                      >
                        <path
                          fill="#1877F2"
                          d="M16,0L16,0c8.837,0,16,7.163,16,16l0,0c0,8.837-7.163,16-16,16l0,0C7.163,32,0,24.837,0,16l0,0 C0,7.163,7.163,0,16,0z"
                        ></path>
                        <path
                          fill="#FFFFFF"
                          d="M18,17.5h2.5l1-4H18v-2c0-1.03,0-2,2-2h1.5V6.14C21.174,6.097,19.943,6,18.643,6C15.928,6,14,7.657,14,10.7 v2.8h-3v4h3V26h4V17.5z"
                        ></path>
                      </svg>
                    </Link>
                  );
                }

                if (social.name === "Twitter") {
                  return (
                    <Link key="twitter" href={social.url}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        // enable-background="new 0 0 24 24"
                        height="28"
                        width="28"
                      >
                        <circle fill="#0F1419" cx="12" cy="12" r="12"></circle>
                        <path
                          fill="#FFFFFF"
                          d="M15.531,7h1.662l-3.63,4.236L17.833,17h-3.343l-2.62-3.495L8.876,17H7.212l3.882-4.531L7,7h3.427
                  l2.366,3.195L15.531,7z M14.947,15.986h0.92L9.926,7.962H8.937L14.947,15.986z"
                        ></path>
                      </svg>
                    </Link>
                  );
                }

                if (social.name === "YouTube") {
                  return (
                    <Link key="youtube" href={social.url}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="28"
                        width="28"
                        viewBox="0 0 32 32"
                        // enable-background="new 0 0 32 32"
                      >
                        <path
                          fill="#FF0000"
                          d="M16,0L16,0c8.837,0,16,7.163,16,16l0,0c0,8.837-7.163,16-16,16l0,0C7.163,32,0,24.837,0,16l0,0 C0,7.163,7.163,0,16,0z"
                        ></path>
                        <path
                          fill="#FFFFFF"
                          d="M25.543,10.498C26,12.28,26,16,26,16s0,3.72-0.457,5.502c-0.254,0.985-0.997,1.76-1.938,2.022 C21.896,24,16,24,16,24s-5.893,0-7.605-0.476c-0.945-0.266-1.687-1.04-1.938-2.022C6,19.72,6,16,6,16s0-3.72,0.457-5.502 c0.254-0.985,0.997-1.76,1.938-2.022C10.107,8,16,8,16,8s5.896,0,7.605,0.476C24.55,8.742,25.292,9.516,25.543,10.498L25.543,10.498 z M14,19.5l6-3.5l-6-3.5V19.5z"
                        ></path>
                      </svg>
                    </Link>
                  );
                }

                if (social.name === "Instagram") {
                  return (
                    <Link key="instagram" href={social.url}>
                      <svg
                        height="28"
                        width="28"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        // enable-background="new 0 0 32 32"
                      >
                        <radialGradient
                          id="SVGID_1_"
                          cx="-246.536"
                          cy="264.8975"
                          r="1"
                          gradientTransform="matrix(1.941947e-15 -31.7144 -29.4969 -1.806164e-15 7822.1538 -7784.2769)"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop
                            offset="0"
                            style={{ stopColor: "rgb(255, 221, 85)" }}
                          ></stop>
                          <stop
                            offset="0.1"
                            style={{ stopColor: "rgb(255, 165, 70)" }}
                          ></stop>
                          <stop
                            offset="0.2"
                            style={{ stopColor: "rgb(255, 112, 98)" }}
                          ></stop>
                          <stop
                            offset="0.3"
                            style={{ stopColor: "rgb(201, 66, 141)" }}
                          ></stop>
                          <stop
                            offset="0.4"
                            style={{ stopColor: "rgb(102, 52, 160)" }}
                          ></stop>
                          <stop
                            offset="0.5"
                            style={{ stopColor: "rgb(51, 41, 135)" }}
                          ></stop>
                        </radialGradient>
                        <path
                          fill="url(#SVGID_1_)"
                          d="M16,0L16,0c8.837,0,16,7.163,16,16l0,0c0,8.837-7.163,16-16,16l0,0C7.163,32,0,24.837,0,16l0,0 C0,7.163,7.163,0,16,0z"
                        ></path>
                        <g>
                          <path
                            fill="#FFFFFF"
                            d="M11,8h10c1.654,0,3,1.346,3,3v10c0,1.654-1.346,3-3,3H11c-1.654,0-3-1.346-3-3V11C8,9.346,9.346,8,11,8z M20.5,9.5c-0.552,0-1,0.448-1,1s0.448,1,1,1s1-0.448,1-1S21.052,9.5,20.5,9.5z M16,11c-2.757,0-5,2.243-5,5s2.243,5,5,5 s5-2.243,5-5S18.757,11,16,11z M16,13c1.654,0,3,1.346,3,3s-1.346,3-3,3s-3-1.346-3-3S14.346,13,16,13z"
                          ></path>
                        </g>
                      </svg>
                    </Link>
                  );
                }

                return null;
              })}
            </div>
          </div>
          <p className="text-gray-700">সংবাদ এর জন্য যোগাযোগ করুন</p>
          <a
            href="mailto:begbotinews24@gmail.com"
            className="text-indigo-700 font-semibold"
          >
            begbotinews24@gmail.com
          </a>
        </div>
      </div>
      {companyBanner &&
        companyBanner
          .filter((banner) => banner.is_active === true)
          .map((banner) => (
            <Banner
              key={banner.id}
              image={banner.image}
              width={banner.width}
              height={banner.height}
              type={"image"}
              closable={true}
            />
          ))}
    </div>
  );
};

export default Footer;
