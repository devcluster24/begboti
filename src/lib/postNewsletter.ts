interface Props {
  email: string;
}

export const postNewsletter = async (email: Props) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/webinfo/newsletter/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
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
