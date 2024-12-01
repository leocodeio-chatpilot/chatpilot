import axios from "axios";
import { apiRecord } from "../constants/formats";

interface returnResponse {
  username: string;
  email: string;
  apiKeys: apiRecord[];
}

export default async function fetchUserData(): Promise<returnResponse> {
  try {
    let returnData: returnResponse = {
      username: "",
      email: "",
      apiKeys: [],
    };
    // First get user profile data
    const userResponse = await axios.get(
      `${import.meta.env.VITE_APP_USER_BACKEND_USER_URL}/profile`,
      { withCredentials: true }
    );

    if (userResponse.status === 200) {
      const userId = userResponse.data.payload.user.id;
      console.log(userResponse.data);
      console.log(userId);
      const apiResponse = await axios.get(
        `${import.meta.env.VITE_APP_USER_BACKEND_MODEL_URL}/get-api/${userId}`,
        { withCredentials: true }
      );
      console.log(apiResponse.data);

      // Combine the data
      returnData = {
        username: userResponse.data.payload.user.username,
        email: userResponse.data.payload.user.email,
        apiKeys:
          apiResponse.data.payload.userApis.map((key: any) => ({
            website_name: key.website_name,
            api_key: key.api_key,
          })) || [],
      };
      console.log("returnData", returnData);
      return returnData;
    }
    return returnData;
  } catch (error) {
    return {
      username: "",
      email: "",
      apiKeys: [],
    };
  }
}
 