import axios from "axios";

export const signup = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const signupPayload = {
      username,
      email,
      password,
    };

    console.log("Attempting signup with payload:", signupPayload);
    console.log(
      "API URL:",
      `${import.meta.env.VITE_APP_USER_BACKEND_USER_URL}/signup`
    );

    const response = await axios.post(
      `${import.meta.env.VITE_APP_USER_BACKEND_USER_URL}/signup`,
      signupPayload,
      {
        withCredentials: true,
      }
    );

    return response;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.log("Full error response:", error.response?.data);
      console.log("Request config:", error.config);

      if (error.response?.status === 400) {
        const errorMessage =
          error.response.data?.message || "Invalid signup data";
        throw new Error(`Signup failed: ${errorMessage}`);
      }
    }
    console.error("Error signing up:", error);
    throw error;
  }
};
