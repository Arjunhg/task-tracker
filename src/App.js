import { useEffect, useState } from "react";
import Login from "./component/Login";
import { getUser } from "./utility/localStorage";


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

  return (
    <div>
      {
        isAuth ? (
          <div className="text-center mt-10">
            <h1 className="text-2xl font-bold">Welcome Back!</h1>
            <p className="mt-2">You are already logged in.</p>
            <button 
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => setIsAuth(false)}
            >
              Logout
            </button>
          </div>
        ) : (
          <Login onLogin={handleLogin}/>
        )
      }
    </div>
  );
}

export default App;

