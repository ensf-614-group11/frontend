import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import ContainerMain from "../components/ContainerMain";
import LoginPage from "../components/LoginPage";
import RegisterPage from "../components/RegisterPage";

function LoginRegister() {
  const location = useLocation();
  const { isLogin: initialIsLogin } = location.state || { isLogin: true };
  const [isLogin, setIsLogin] = useState(initialIsLogin);

  // useEffect(() => {
  //   // Update `isLogin` whenever the location state changes
  //   setIsLogin(initialIsLogin);
  // }, [initialIsLogin]);

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
  }

  return(
    <div>
      <Header />
      <ContainerMain>
        <h2 className="text-acmeYellow text-2xl font-bold text-center mb-6">
          {isLogin ? "Login" : "Register"}
        </h2>
        {!isLogin && (
          <div className="text-left bg-neutral-50 p-4 rounded-lg shadow-md mb-6">
            <p className="text-lg font-medium text-gray-800 mb-2">
              Register to recieve:<br/> 
              1) Movie news before public announcements<br/>
              2) Ability to purchase movie tickets before public realeases.
            </p>
            <p className="text-lg font-medium text-gray-800">
              Upon registration, you will be charged $20. This will be renewed annually.
            </p>  
          </div>
          
        )}
        {isLogin ? (
          <LoginPage onSwitch={toggleForm} />
        ) : (
          <RegisterPage onSwitch={toggleForm} />
        )}
      </ContainerMain>
    </div>
  )
}

export default LoginRegister;