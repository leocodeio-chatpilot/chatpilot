// src/components/LoadingScreen.tsx

const LoadingScreen = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 border-t-2 border-b-2 border-secondary"></div>
    </div>
  );
};

export default LoadingScreen;
