"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { RxDoubleArrowRight } from "react-icons/rx";

interface Props {
  title?: string | null;
  redirect?: boolean | null;
  className?: string | null;
}

const HeadingText: React.FC<Props> = ({
  title,
  redirect = true,
  className = "",
}) => {
  const router = useRouter();
  return (
    <>
      {redirect ? (
        <div
          onClick={() => router.push(`/category/${title}`)}
          className={`${className} inline-flex items-center gap-2 bg-[#2563EB] px-6 py-[10px] text-white cursor-pointer`}
        >
          <h1 className="font-bold text-lg text-center flex-shrink-0">
            {title}
          </h1>
          <RxDoubleArrowRight className="text-xl" />
        </div>
      ) : (
        <div className="inline-flex items-center gap-2 bg-[#2563EB] px-6 py-[10px] text-white ">
          <h1 className="font-bold text-lg text-center flex-shrink-0">
            {title}
          </h1>
          <RxDoubleArrowRight className="text-xl" />
        </div>
      )}
    </>
  );
};

export default HeadingText;
