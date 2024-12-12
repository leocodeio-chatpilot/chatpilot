import Entry from "./Entry";
import NotFound from "./components/NotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signin, Signup, Docs, Try, Profile, ChatArea } from "./components";
import "./App.css";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />

      <Routes>
        <Route path="/" element={<Entry />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/try" element={<Try />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chat" element={<ChatArea />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
