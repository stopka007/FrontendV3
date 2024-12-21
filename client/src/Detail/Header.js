import { useContext, useState } from "react";
import { UserContext } from "../Users/UserProvider.js";
import { useTheme } from "./Extras/ThemeProvider.js";
import { useLanguage } from "./Extras/LanguageProvider.js";
import { useNavigate } from "react-router-dom";

function Header() {
  const { userList, loggedInUser, setLoggedInUser } = useContext(UserContext);
  const { isDarkMode, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleUserSwitch = (userId) => {
    setLoggedInUser(userId);
    setIsLoginModalOpen(false);
    navigate('/shoppingLists');
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    navigate('/');
  };

  return (
    <header className="bg-white dark:bg-slate-800 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate('/shoppingLists')}
            className="text-2xl font-bold dark:text-white hover:text-green-600 dark:hover:text-green-400 transition-colors"
          >
            {t('shoppingLists')}
          </button>
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                aria-label="Toggle theme"
              >
                <span className="text-xl">
                  {isDarkMode ? '☀️' : '🌙'}
                </span>
              </button>
              <button
                onClick={toggleLanguage}
                className="p-2 rounded-full bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors text-sm font-medium"
                aria-label="Toggle language"
              >
                {language.toUpperCase()}
              </button>
            </div>
            <div className="flex items-center gap-2">
              {loggedInUser ? (
                <>
                  <span className="text-sm font-medium dark:text-white">
                    {userList.find((user) => user.id === loggedInUser).name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-1.5 rounded-md bg-white text-gray-700 dark:bg-slate-700 dark:text-white border border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors"
                  >
                    {t('logout')}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="px-3 py-1.5 rounded-md bg-white text-gray-700 dark:bg-slate-700 dark:text-white border border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors"
                >
                  {t('login')}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {isLoginModalOpen && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
              onClick={() => setIsLoginModalOpen(false)}
            >
              <div className="absolute inset-0 bg-black opacity-75"></div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-xl transform transition-all max-w-md w-full">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 dark:text-white">
                </h2>
                <div className="space-y-4">
                  {userList.map((user) => (
                    <button
                      key={user.id}
                      onClick={() => handleUserSwitch(user.id)}
                      className="w-full px-4 py-2 rounded-md bg-white text-gray-700 dark:bg-slate-700 dark:text-white border border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors"
                    >
                      {user.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;