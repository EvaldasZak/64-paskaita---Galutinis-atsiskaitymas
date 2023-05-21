export const API_URL = "http://localhost:8080";

export const addAnswer = async (answer) => {
  try {
    const response = await fetch(`${API_URL}/answers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(answer),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding answer:", error);
    throw error;
  }
};

export const getAnswers = async () => {
  try {
    const response = await fetch(`${API_URL}/answers`, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting answers:", error);
    throw error;
  }
};
