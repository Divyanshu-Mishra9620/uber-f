import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { UserDataContext } from "../context/UserContext.jsx";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, setUser } = useContext(UserDataContext);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      console.log("Login form submitted");
      const userData = { email: email, password: password };

      console.log("Sending login data:", userData);
      console.log("Base URL:", import.meta.env.VITE_BASE_URL);

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        userData
      );

      console.log("✅ Login response:", response);

      if (response.status === 200) {
        const data = response.data;

        console.log("✅ User logged in:", data.user.email);

        setUser(data.user);

        localStorage.setItem("token", data.token);

        navigate("/home");
      }

      // as we fill form and submit then password and email will be empty
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("❌ Login error:", err);
      const errorMsg =
        err.response?.data?.message || err.message || "Login failed";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-7 flex flex-col h-screen justify-between">
      <div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/1200px-Uber_logo_2018.svg.png"
          alt="Uber Logo"
          className="w-16 mb-10"
        />
        <form
          action=""
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2">User Login</h3>

          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@emaple.com"
            className="bg-[#eeeeee] mb-7 px-4 rounded py-2 w-full text-lg placeholder:text-sm"
          />

          <h3 className="text-lg font-medium mb-2">Enter password</h3>

          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            className="bg-[#eeeeee] mb-7 px-4 rounded py-2 w-full text-lg placeholder:text-sm"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-[#111] text-white font-semibold mb-3 px-4 rounded py-2 w-full text-lg placeholder:text-base disabled:bg-gray-400"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-3">
            {error}
          </div>
        )}

        <p className="text-center">
          New Here?{" "}
          <Link className="text-blue-600" to="/signup">
            Create New Account
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/captain-login"
          className="bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 px-4 rounded py-2 w-full text-lg placeholder:text-base"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
