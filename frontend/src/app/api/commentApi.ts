const BACKEND_ORIGIN =
  process.env.NEXT_PUBLIC_BACKEND_ORIGIN || "http://localhost:4000";
const url = `${BACKEND_ORIGIN}/comments`;
const headers = {
  "Content-Type": "Application/json",
};

// GET comments
export const getComments = async (diaryId) => {
  try {
    const response = await fetch(`${url}?diaryId=${diaryId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const comments = await response.json();
    return comments;
  } catch (error) {
    console.error("Failed to fetch comments:", error);
  }
};

// POST comment
export const addComment = async (
  dateTime: Date,
  content: string,
  diaryId: number
) => {
  return await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({ dateTime, content, diaryId }),
  }).then((res) => res.json());
};

// DELETE comment
export const deleteComment = async (id) => {
  return await fetch(`${url}/${id}`, {
    method: "DELETE",
    headers,
  }).then((res) => res.json());
};
