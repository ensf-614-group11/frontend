import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppAPI from "./AppAPI";

function LoginPage({ onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false); 

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await AppAPI.post(
        "auth/login",
        { email, password }
      );

      if (response.success) {
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("email", response.data.email)

        // alert(localStorage.getItem("authToken") + localStorage.getItem("email"))

        navigate("/");
      } else {
        setError("Invalid email or password. Please try again.")
      }

    } catch (error) {
      console.error("Login failed:", error)
      setError("An error occured. Please try again later."); 
    } finally {
      setLoading(false) 
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="block font-medium">
            Email
          </label>
          <input 
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block font-medium">
            Password
          </label>
          <input 
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Enter your password"
            required
          />
        </div>
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}
      <button
        type="submit"
        className="w-full p-3 mt-6 bg-acmeYellow text-white font-bold rounded-lg shadow-md hover:bg-acmeYellow-dark"
      >
        Login
      </button>
      <p className="mt-4 text-center">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="text-acmeYellow hover: underline"
        >
          Register
        </button>
      </p>
    </form>
  )
}

export default LoginPage;