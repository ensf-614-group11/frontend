import { useState } from "react";
import AppAPI from "./AppAPI";

function LoginPage({ onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login for submitted", {email, password});
    setLoading(true);
    setError("");

    // const loginData = {
    //   email,
    //   password,
    // };

    try {
      const response = await AppAPI.post(
        "auth/login",
        { email, password },
        {},
        "defaultLogin"
      );

      console.log("Login success:", response);
      // You can store the token or user info if needed
      // For example, save the JWT token in localStorage or cookies
      localStorage.setItem("authToken", response.data.token); // Example if the response contains a token
    } catch (error) {
      console.error("Login failed:", error)
      setError("Invalid email or password"); // Set error message for UI
    } finally {
      setLoading(false) // stop loading state
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