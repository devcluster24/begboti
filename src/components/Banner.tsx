"use client";
import { blurImage } from "@/constants/blurImage";
import { getEmbedUrl } from "@/utils/getEmbedUrl";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";

interface BannerProps {
  image: string;
  link?: string;
  height?: number;
  width?: number;
  type?: string | "image" | "video";
  video?: string | null;
  closable?: boolean;
}

const Banner: React.FC<BannerProps> = ({
  image,
  link = "#",
  height = 300,
  width = 600,
  type = "image",
  video,
  closable = false,
}) => {
  const [hideBanner, setHideBanner] = useState(false);

  return (
    <div
      className={`w-full justify-center items-center my-5 mx-auto overflow-hidden border border-gray-300 relative ${
        hideBanner ? "hidden" : "flex"
      }`}
      style={{ maxWidth: `${width}px`, height: `${height}px` }}
    >
      {closable && (
        <button
          onClick={() => setHideBanner(true)}
          className="absolute top-0 -right-0 text-red-600 text-2xl rounded-full"
        >
          <IoCloseCircle />
        </button>
      )}
      <Link href={link} className="w-full h-full">
        {type?.toLowerCase() === "image" && (
          <Image
            quality={80}
            placeholder="blur"
            blurDataURL={blurImage.url}
            src={image}
            layout="responsive"
            width={width}
            style={{ objectFit: "cover" }}
            height={height}
            alt="Banner"
            className="w-full h-full object-cover shadow-md"
          />
        )}
        {type?.toLowerCase() === "video" && video && (
          <iframe
            width={width}
            height={height}
            src={getEmbedUrl(video) || ""}
            title="Video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        )}
      </Link>
    </div>
  );
};

export default Banner;
