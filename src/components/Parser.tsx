"use client";
import DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";

interface ParserProps {
  text?: string | Node;
  className?: string;
  card?: boolean;
  textSize?: number;
}

const Parser: React.FC<ParserProps> = ({
  text = "",
  className = "",
  card = true,
  textSize = 80,
}) => {
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    const sanitizedHtml = DOMPurify.sanitize(text);

    if (card) {
      const tempElement = document.createElement("div");
      tempElement.innerHTML = sanitizedHtml;
      const plainText = tempElement.textContent || tempElement.innerText || "";

      const slicedHtml = DOMPurify.sanitize(
        plainText.slice(0, textSize) + "..."
      );
      setDescription(slicedHtml);
    } else {
      setDescription(sanitizedHtml);
    }
  }, [text, card, textSize]);

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: description }}
    />
  );
};

export default Parser;
