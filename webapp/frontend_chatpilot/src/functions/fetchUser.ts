import axios from "axios";
import { apiRecord } from "../constants/formats";
import { getAuthTokenFromCookie } from "./getAuthCookie";

interface returnResponse {
  username: string;
  email: string;
  apiKeys: apiRecord[];
}

export default async function fetchUserData(): Promise<returnResponse> {
  let returnData: returnResponse = {
    username: "",
    email: "",
    apiKeys: [],
  };
  try {
    const data = getAuthTokenFromCookie();
    const apiResponse = await axios.get(
      `${import.meta.env.VITE_APP_USER_BACKEND_MODEL_URL}/get-api/${data.id}`,
      { withCredentials: true }
    );
    // console.log("debug log 1: api response from keys model:", apiResponse.data);
    // Combine the data
    returnData = {
      username: data.username,
      email: data.email,
      apiKeys:
        apiResponse.data.payload.userApis.map((key: any) => ({
          website_name: key.website_name,
          api_key: key.api_key,
        })) || [],
    };
    // console.log("debug log 2 : returnData", returnData);
    return returnData;
  } catch (error) {
    return returnData;
  }
}
