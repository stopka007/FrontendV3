import { useContext } from "react";
import { UserContext } from "../Users/UserProvider.js";
import { useTheme } from "./Extras/ThemeProvider.js";
import { useLanguage } from "./Extras/LanguageProvider.js";

function Header() {
  const { userList, loggedInUser, setLoggedInUser } = useContext(UserContext);
  const { isDarkMode, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
 
  return (
    <header className="bg-white dark:bg-slate-800 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold dark:text-white">{t('shoppingLists')}</h1>
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
          </div>
          <div className="flex flex-wrap gap-2">
            {userList.map((user) => (
              <button
                key={user.id}
                onClick={() => setLoggedInUser(user.id)}
                className={`px-3 py-1.5 rounded-md border transition-colors ${
                  user.id === loggedInUser
                    ? 'bg-green-500 text-white dark:bg-green-600 border-transparent'
                    : 'bg-white text-gray-700 dark:bg-slate-700 dark:text-white border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-600'
                }`}
              >
                {user.name} {user.id === loggedInUser ? `(${t('loggedIn')})` : ""}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;