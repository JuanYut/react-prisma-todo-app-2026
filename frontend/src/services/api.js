const API_URL = import.meta.env.VITE_API_URL;

export const getNotes = async () => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Error fetching notes");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error (getNotes)", error);
    throw error;
  }
};

export const createNote = async (text) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error("Error creating note");
    }

    return await response.json();
  } catch (error) {
    console.error("API Error (createNote)", error);
    throw error;
  }
};
