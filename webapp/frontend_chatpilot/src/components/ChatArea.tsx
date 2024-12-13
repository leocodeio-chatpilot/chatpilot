import React, { useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import { toast } from "react-hot-toast";
import axios from "axios";

interface ChatMessage {
  text: string;
  sender: "user" | "bot";
}

const ChatArea = () => {
  const [chatData, setChatData] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [apiKey, setApiKey] = useState("");

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (apiKey === "") {
      toast.error("API key not provided!");
      return;
    }

    if (!chatInput.trim()) {
      toast.error("Please enter a message!");
      return;
    }

    setChatData((prev) => [...prev, { text: chatInput, sender: "user" }]);
    setChatInput("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_USER_BACKEND_MODEL_URL}/query`,
        {
          queryText: chatInput,
          apiKey: apiKey,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.status.toString().startsWith("2")) {
        toast.error("Failed to retrieve bot response!");
        throw new Error(response.statusText || `Server error: ${response.status}`);
      }

      if (response.status === 404) {
        toast.error("Invalid API key!");
      }

      const data = response.data;
      setChatData((prev) => [...prev, { text: data.payload.response, sender: "bot" }]);
    } catch (error) {
      toast.error("An unexpected error occurred!");
    }
  };

  function useChatScroll<T>(dep: T): any {
    const ref = React.useRef<HTMLDivElement>();
    React.useEffect(() => {
      if (ref.current) {
        ref.current.scrollTop = ref.current.scrollHeight;
      }
    }, [dep]);
    return ref;
  }

  const ref = useChatScroll(chatData);

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
      <div
        ref={ref}
        className="h-[400px] overflow-y-scroll p-4 space-y-4 bg-gray-50"
      >
        {chatData.length > 0 ? (
          chatData.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <span
                className={`px-4 py-2 rounded-lg max-w-[70%] text-sm md:text-base ${
                  message.sender === "user"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-300 text-black"
                } shadow-md`}
              >
                {message.text}
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">Start a conversation!</p>
        )}
      </div>
      <input
        type="text"
        value={apiKey}
        placeholder="Enter your API key here..."
        onChange={(e) => setApiKey(e.target.value)}
        className="p-3 w-full bg-gray-100 border border-gray-300 rounded-t-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm placeholder-gray-400"
      />
      <form
        onSubmit={handleSendMessage}
        className="flex items-center border-t border-gray-300 bg-white p-2"
      >
        <input
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow p-3 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm placeholder-gray-400"
        />
        <button
          type="submit"
          className="flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-r-md hover:bg-purple-700 transition-colors"
        >
          <IoSendSharp
            size={20}
            className="hover:scale-110 transition-transform duration-200"
          />
        </button>
      </form>
    </div>
  );
};

export default ChatArea;
