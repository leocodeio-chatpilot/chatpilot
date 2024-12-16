export const LoadingScreen = () => {
  return (
    <div className="z-10 h-screen w-screen flex items-center justify-center bg-transparent">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
      <div className="animate-spin rounded-full h-12 border-t-2 border-b-2 border-secondary"></div>
    </div>
  );
};
