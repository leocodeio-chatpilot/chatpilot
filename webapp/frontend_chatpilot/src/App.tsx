// src/App.tsx
import { Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signin, Signup, Docs, Try, Profile, ChatArea, LoadingScreen } from "./components";
import Entry from "./Entry";
import NotFound from "./components/NotFound";
import "./App.css";
import { LoadingProvider, useLoading } from "./context/LoadingContext";

const AppContent = () => {
  const { markRendered } = useLoading();

  useEffect(() => {
    // Mark as rendered after initial mount
    markRendered();
  }, [markRendered]);

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

const App = () => {
  return (
    <LoadingProvider>
      <Suspense fallback={<LoadingScreen />}>
        <AppContent />
      </Suspense>
    </LoadingProvider>
  );
};

export default App;