export const getEmbedUrl = (url: string | undefined): string | null => {
  if (!url) {
    return null;
  }

  let videoId: string | null = null;

  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    if (url.includes("youtube.com")) {
      const urlParams = new URLSearchParams(new URL(url).search);
      videoId = urlParams.get("v");
    } else if (url.includes("youtu.be")) {
      videoId = url.split("/").pop() || null;
    }

    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
  } else if (url.includes("facebook.com")) {
    const urlParts = url.split("/");

    if (urlParts.includes("videos")) {
      const videoIndex = urlParts.indexOf("videos") + 1;
      videoId = urlParts[videoIndex] || null;
    }

    if (videoId) {
      return `https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/facebook/videos/${videoId}/`;
    }
  }

  return url;
};
