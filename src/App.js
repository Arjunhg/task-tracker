import { useEffect, useState } from "react";
import Login from "./component/Login";
import { getUser } from "./utility/localStorage";
import Dashboard from "./component/Dashboard";
import { ThemeProvider } from "./context/ThemeContext";


function App() {

  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const user = getUser();
    if(user){
      setIsAuth(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuth(true);
  }

  const handleLogout = () => {
    setIsAuth(false);
  }

  return (
    <ThemeProvider>
      <div>
        {
          isAuth ? (
            <Dashboard onLogout={handleLogout}/>
          ) : (
            <Login onLogin={handleLogin}/>
          )
        }
      </div>
    </ThemeProvider>
  );
}

export default App;

