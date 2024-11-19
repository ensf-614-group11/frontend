import { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import ContainerMain from "../components/ContainerMain";
import LoginPage from "../components/LoginPage";
import RegisterPage from "../components/RegisterPage";

function LoginRegister() {
  const location = useLocation();
  const { isLogin: initialIsLogin } = location.state || { isLogin: true };
  const [isLogin, setIsLogin] = useState(initialIsLogin);

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
  }

  return(
    <div>
      <Header />
      <ContainerMain>
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Login" : "Register"}
        </h2>
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