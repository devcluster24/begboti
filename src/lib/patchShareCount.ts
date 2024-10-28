interface Props {
  id: number;
  share_count: number;
}

export const patchShareCount = async ({ id, share_count }: Props) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/news/${id}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ share_count }),
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to patch share count: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error patching share count:", error);
    throw error;
  }
};
