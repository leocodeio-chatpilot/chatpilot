import React, { createContext, useContext, useState } from "react";
import { LoadingScreen } from "../components/utils/Loadingscreen";

const LoadingContext = createContext({
  isLoading: true,
  markRendered: () => {},
});

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setLoading] = useState(true);
  const markRendered = () => setLoading(false);

  return (
    <LoadingContext.Provider value={{ isLoading, markRendered }}>
      {isLoading && <LoadingScreen />}
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
