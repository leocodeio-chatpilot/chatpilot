import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { slideIn } from "./utils/motion";
import { StarsCanvas } from "./canvas";
import { useNavigate } from "react-router-dom";
import { checkSignin } from "../functions/checkSignin";
import axios from "axios";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ToggleButton } from "../context/ThemeToggle";
import { div } from "framer-motion/client";

const Profile = () => {
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    api_key: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const isSignedIn = checkSignin();
    if (!isSignedIn) {
      navigate("/signin");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_USER_BACKEND_API_URL}/profile`,
          { withCredentials: true }
        );
        if (response.status === 200) {
          console.log(response.data.payload.user);
          setUserData(response.data.payload.user);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/signin");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-secondary"></div>
      </div>
    );
  }

  return (
    <div className="relative w-screen h-auto">
      <div className="h-screen w-screen flex flex-col items-center">
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className="flex-[0.75] bg-transparent p-8 rounded-2xl w-full max-w-md mt-20"
        >
          <h1 className="text-[30px] xs:text-[40px] sm:text-[50px] text-white dark:text-black font-black text-center mb-2">
            Pro<span className="text-secondary">file</span>
          </h1>
          <div className="flex justify-center items-center mb-8 gap-4">
            <Link
              to="/"
              className="text-white dark:text-black hover:text-secondary transition-colors"
            >
              <FaHome size={30} />
            </Link>
            <ToggleButton />
          </div>

          <div className="bg-gray-800/50 dark:bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg">
            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-white dark:text-black font-medium">
                  Username
                </label>
                <div className="bg-gray-100 dark:bg-tertiary py-4 px-6 text-black rounded-lg">
                  {userData.username}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-white dark:text-black font-medium">
                  Email
                </label>
                <div className="bg-gray-100 dark:bg-tertiary py-4 px-6 text-black rounded-lg">
                  {userData.email}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-white dark:text-black font-medium">
                  API Key
                </label>
                <div className="bg-gray-100 dark:bg-tertiary py-4 px-6 text-black rounded-lg">
                  {userData.api_key
                    ? userData.api_key
                    : "Create one from below"}
                </div>
              </div>
              {userData.api_key ? null : (
                <div className="flex flex-col gap-2">
                  <Link
                    to="/try"
                    className="text-white dark:text-black hover:text-secondary transition-colors w-full text-center bg-secondary py-4 px-6 rounded-lg hover:bg-secondary/80 hover:text-black"
                >
                    Create API Key
                  </Link>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        <div className="flex-1 flex flex-col items-center justify-center h-screen">
          <StarsCanvas />
        </div>
      </div>
    </div>
  );
};

export default Profile;
