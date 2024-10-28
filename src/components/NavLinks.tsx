"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { NavbarProps } from "./types";

interface NavLinksProps {
  navLinks: NavbarProps[];
}

const NavLinks: React.FC<NavLinksProps> = ({ navLinks }) => {
  const [searchBox, setSearchBox] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const query = (form.elements.namedItem("search") as HTMLInputElement).value;
    router.push(`/search/${query}`);
    setSearchBox(false);
  };

  return (
    <div className="w-full bg-[#F5F5F5] px-3 lg:px-16 xl:px-20 2xl:px-40 4k:px-96 py-5 flex flex-col">
      {searchBox && (
        <div className="w-full flex flex-col items-center gap-2 order-first">
          <form
            onSubmit={handleSearch}
            className="w-full flex items-center gap-3"
          >
            <div className="w-full border border-[#2563EB] rounded-md px-5 py-3">
              <input
                name="search"
                type="text"
                className="w-full focus:outline-none bg-transparent placeholder:text-[#2563EB]"
                placeholder="অনুসন্ধান করুন"
              />
            </div>
            <button
              type="submit"
              className="p-3 rounded-md border border-[#2563EB]"
            >
              <IoIosSearch className="text-lg" />
            </button>
            <button
              type="button"
              onClick={() => setSearchBox(false)}
              className="p-3 rounded-md border border-[#2563EB] text-[#2563EB]"
            >
              <IoClose className="text-lg" />
            </button>
          </form>
        </div>
      )}

      <div
        className={`w-full flex ${
          searchBox ? "flex-col" : "flex-row"
        } items-center justify-between`}
      >
        <ul
          className={`flex ${
            searchBox ? "order-last justify-center mt-5" : ""
          } items-center gap-10 overflow-auto w-full justify-start`}
        >
          {navLinks
            .filter((menu) => menu.navbar_type === "CATEGORY")
            .map((menu) => (
              <li
                className={`lg:text-base text-sm cursor-pointer ${
                  pathname === `/category/${menu.name}`
                    ? "text-[#2563EB] font-semibold"
                    : "text-black"
                }`}
                key={menu.id}
              >
                <Link href={`/category/${menu.name}`}>
                  <p className="text-black font-medium">{menu.name}</p>
                </Link>
              </li>
            ))}
          {navLinks
            .filter((menu) => menu.navbar_type === "CUSTOM")
            .map((menu) => (
              <li
                key={menu.id}
                className={`lg:text-base text-sm cursor-pointer ${
                  pathname === `/category/${menu.name}`
                    ? "text-[#2563EB] font-semibold"
                    : "text-black"
                }`}
              >
                <Link href={menu.url}>
                  <p className="text-black font-medium">{menu.name}</p>
                </Link>
              </li>
            ))}
        </ul>
        {!searchBox && (
          <button
            onClick={() => setSearchBox(true)}
            className="lg:p-3 p-2 rounded-md border border-[#2563EB] ml-3"
          >
            <IoIosSearch className="text-lg" />
          </button>
        )}
      </div>
    </div>
  );
};

export default NavLinks;
