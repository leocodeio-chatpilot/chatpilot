import { jwtDecode } from "jwt-decode";

export const getAuthTokenFromCookie = () => {
  const cookies = document.cookie.split(";").reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split("=");
    acc[key] = value;
    return acc;
  }, {} as { [key: string]: string });
  // console.log("debug log 1: cookies", cookies);
  // console.log(
  //   "debug log 2: cookies['Authorization']",
  //   cookies["Authorization"]
  // );
  const decodedData = jwtDecode(cookies["Authorization"]);
  // console.log("debug log 3: decodedData", decodedData);
  return JSON.parse(JSON.stringify(decodedData));
};
