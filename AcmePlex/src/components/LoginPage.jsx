import { useState } from "react";

function LoginPage({ onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here (API calls)
    console.log("Login for submitted", {email, password});
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