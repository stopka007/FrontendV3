import "./App.css";
import Detail from "./Detail/Detail";
import UserProvider from "./Users/UserProvider";
import ThemeProvider from "./Detail/ThemeProvider";
import LanguageProvider from "./Detail/LanguageProvider";

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <LanguageProvider>
          <UserProvider>
            <Detail />
          </UserProvider>
        </LanguageProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;