export const shareOnFacebook = (url: string, quote: string, media: string) => {
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    url
  )}&quote=${encodeURIComponent(quote)}&picture=${encodeURIComponent(media)}`;
  window.open(facebookShareUrl, "_blank", "width=600,height=400");
};

export const shareOnWhatsApp = (url: string, quote: string) => {
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    quote
  )}%20${encodeURIComponent(url)}`;
  window.open(whatsappShareUrl, "_blank");
};

export const shareOnTwitter = (url: string, quote: string) => {
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    quote
  )}&url=${encodeURIComponent(url)}`;
  window.open(twitterShareUrl, "_blank", "width=600,height=400");
};

export const shareOnLinkedIn = (url: string, quote: string) => {
  const linkedInShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
    url
  )}&title=${encodeURIComponent(quote)}`;
  window.open(linkedInShareUrl, "_blank", "width=600,height=400");
};
