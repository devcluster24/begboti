"use client";
import { patchShareCount } from "@/lib/patchShareCount";
import {
  shareOnFacebook,
  shareOnLinkedIn,
  shareOnTwitter,
  shareOnWhatsApp,
} from "@/utils/socialShare";
import React, { useState } from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";
import { IoCopyOutline, IoShareSocial } from "react-icons/io5";
import { NewsProps } from "./types";

interface NewsShareButtonProps {
  news: NewsProps;
  catName: string;
  iconName?: boolean;
  type: "news" | "video";
}

const NewsShareButton: React.FC<NewsShareButtonProps> = ({
  news: singleNews,
  catName,
  iconName = true,
  type,
}) => {
  const [copied, setCopied] = useState(false);

  const handleShareClick = async (
    newsId: number,
    shareCount: number,
    quote: string,
    media: string,
    platform: "facebook" | "twitter" | "linkedin" | "whatsapp"
  ) => {
    try {
      let url = "";
      if (type === "news") {
        url = `${process.env.NEXT_PUBLIC_CLIENT_URL}/${catName}/news/${newsId}`;
      } else {
        url = `${process.env.NEXT_PUBLIC_CLIENT_URL}/${catName}/video/${newsId}`;
      }
      const res = await patchShareCount({
        id: newsId,
        share_count: shareCount + 1,
      });

      switch (platform) {
        case "facebook":
          shareOnFacebook(url, quote, media);
          break;
        case "whatsapp":
          shareOnWhatsApp(url, quote);
          break;
        case "twitter":
          shareOnTwitter(url, quote);
          break;
        case "linkedin":
          shareOnLinkedIn(url, quote);
          break;
        default:
          break;
      }
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleCopyClick = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_CLIENT_URL}/${catName}/${
        type === "news" ? "news" : "video"
      }/${singleNews.id}`;

      await navigator.clipboard.writeText(url);
      setCopied(true);

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2">
        <IoShareSocial className="text-xl" />
        <span className="text-lg">{singleNews.share_count}</span>
      </div>
      <button
        onClick={handleCopyClick}
        className="relative border border-[#CEE0F5] p-1 rounded-lg text-black flex items-center gap-2"
      >
        <IoCopyOutline className="text-xl text-gray-600" />
        {iconName && <span>Copy Link</span>}
        {copied && (
          <span className="absolute -top-5 left-0 right-0 ml-2 text-sm text-red-600">
            Copied!
          </span>
        )}
      </button>

      <button
        onClick={() =>
          handleShareClick(
            singleNews.id,
            singleNews.share_count,
            singleNews.headline,
            singleNews.image,
            "facebook"
          )
        }
        className="border border-[#CEE0F5] p-1 rounded-lg text-[#0A65CC] flex items-center gap-2"
      >
        <FaFacebookF className="text-blue-500 text-xl" />
        {iconName && <span>Facebook</span>}
      </button>

      <button
        onClick={() =>
          handleShareClick(
            singleNews.id,
            singleNews.share_count,
            singleNews.headline,
            singleNews.image,
            "twitter"
          )
        }
        className="border border-[#CEE0F5] p-1 rounded-lg text-[#1DA1F2] flex items-center gap-2"
      >
        <FaXTwitter className="text-black text-xl" />
        {iconName && <span>Twitter</span>}
      </button>

      <button
        onClick={() =>
          handleShareClick(
            singleNews.id,
            singleNews.share_count,
            singleNews.headline,
            singleNews.image,
            "linkedin"
          )
        }
        className="border border-[#CEE0F5] p-1 rounded-lg text-blue-500 flex items-center gap-2"
      >
        <FaLinkedinIn className="text-xl" />
        {iconName && <span>LinkedIn</span>}
      </button>

      <button
        onClick={() =>
          handleShareClick(
            singleNews.id,
            singleNews.share_count,
            singleNews.headline,
            singleNews.image,
            "whatsapp"
          )
        }
        className="border border-[#CEE0F5] p-1 rounded-lg text-green-500 flex items-center gap-2"
      >
        <FaWhatsapp className="text-xl" />
        {iconName && <span>WhatsApp</span>}
      </button>
    </div>
  );
};

export default NewsShareButton;
