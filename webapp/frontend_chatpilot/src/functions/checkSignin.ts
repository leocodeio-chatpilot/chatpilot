export const checkSignin = () => {
  try {
    const cookies = document.cookie;
    console.log(cookies);
    return !!cookies;
  } catch (error) {
    console.error("Error checking signin status:", error);
    return false;
  }
};
