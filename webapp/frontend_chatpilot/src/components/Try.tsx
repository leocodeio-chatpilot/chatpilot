import { useState, useEffect } from 'react';
import ChatArea from './ChatArea';

const Try = () => {
  const [hasApiKey, setHasApiKey] = useState(false);
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [websiteName, setWebsiteName] = useState('');

  useEffect(() => {
    const apiKey = localStorage.getItem('apiKey');
    setHasApiKey(!!apiKey);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle website submission logic here
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center min-h-[70vh]">
        <h1 className="text-[3rem] sm:text-[4rem] font-bold bg-gradient-to-r from-purple-400 to-purple-600 dark:from-purple-600 dark:to-purple-800 bg-clip-text text-transparent mb-8">
          Try ChatPilot
        </h1>

        {hasApiKey ? (
          <ChatArea />
        ) : (
          <div className="w-full max-w-xl bg-white/90 dark:bg-gray-800/90 p-8 rounded-xl shadow-lg">
            <form onSubmit={handleSubmit}>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
                Enter Website Details
              </h2>
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Website Name"
                    value={websiteName}
                    onChange={(e) => setWebsiteName(e.target.value)}
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 
                    focus:outline-none focus:ring-2 focus:ring-purple-500 
                    bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <input
                    type="url"
                    placeholder="Website URL"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 
                    focus:outline-none focus:ring-2 focus:ring-purple-500 
                    bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-purple-700 
                  hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-lg 
                  transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg 
                  focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  Start Chat
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Try;
