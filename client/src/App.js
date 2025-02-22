import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import "./App.css";
import Detail from "./Detail/Detail";
import UserProvider from "./Users/UserProvider";
import ThemeProvider from "./Detail/Extras/ThemeProvider";
import LanguageProvider from "./Detail/Extras/LanguageProvider";
import DetailProvider from "./Detail/DetailProvider";
import Home from "./Detail/Home";

function App() {
  return (
    <div className="App">
      <div className="App bg-white dark:bg-slate-800 transition-colors duration-200">
        <BrowserRouter>
          <ThemeProvider>
            <LanguageProvider>
              <UserProvider>
                <DetailProvider>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shoppingLists" element={<Detail />} />
                    <Route path="/detail" element={<Detail />} />
                    <Route path="/member" element={<Detail />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </DetailProvider>
              </UserProvider>
            </LanguageProvider>
          </ThemeProvider>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;