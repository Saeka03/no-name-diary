const BACKEND_ORIGIN =
  process.env.NEXT_PUBLIC_BACKEND_ORIGIN || "http://localhost:4000";

// GET diary
export const getDiaries = async () => {
  try {
    const response = await fetch(`${BACKEND_ORIGIN}/diary`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const diaries = await response.json();
    return diaries;
  } catch (error) {
    console.error("Failed to fetch classes:", error);
    throw error;
  }
};
