import axios from "axios";

export const signin = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_USER_BACKEND_USER_URL}/signin`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      return response;
    } else {
      throw new Error("Signin failed");
    }
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};
