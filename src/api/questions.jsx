import { API_URL } from "./api_url";

export const getQuestions = async (params) => {
  try {
    const response = await fetch(
      `${API_URL}/questions?${new URLSearchParams(params).toString()}`,
      {
        method: "GET",
        headers: { "Content-type": "application/json" },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting questions:", error);
    throw error;
  }
};

export const addQuestion = async (question) => {
  try {
    const response = await fetch(`${API_URL}/questions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(question),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding question:", error);
    throw error;
  }
};

export const updateQuestion = async (questionId, question) => {
  try {
    const response = await fetch(`${API_URL}/questions/${questionId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(question),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating question:", error);
    throw error;
  }
};

export const deleteQuestion = async (questionId) => {
  try {
    const response = await fetch(`${API_URL}/questions/${questionId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting question:", error);
    throw error;
  }
};
