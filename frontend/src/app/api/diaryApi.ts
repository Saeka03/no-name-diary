const BACKEND_ORIGIN =
  process.env.NEXT_PUBLIC_BACKEND_ORIGIN || "http://localhost:4000";
const url = `${BACKEND_ORIGIN}/diary`;
const headers = {
  "Content-Type": "Application/json",
};

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

// POST diary
export const addDiary = async (
  dateTime: Date,
  title: string,
  content: string
) => {
  return await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({ dateTime, title, content }),
  }).then((res) => res.json());
};

// DELETE diary
export const deleteDiary = async (id) => {
  return await fetch(`${url}/${id}`, {
    method: "DELETE",
    headers,
  }).then((res) => res.json());
};
