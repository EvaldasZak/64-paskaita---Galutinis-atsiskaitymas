import { API_URL } from "./api_url";

export const getUsers = async () => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting users:", error);
    throw error;
  }
};

export const registerUser = async (user) => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};
