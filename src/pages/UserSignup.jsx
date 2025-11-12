import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { UserDataContext } from "../context/UserContext.jsx";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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
      const newUser = {
        fullname: {
          firstname: firstName,
          lastname: lastName,
        },
        email: email,
        password: password,
      };

      console.log("Sending:", newUser);
      console.log("Base URL:", import.meta.env.VITE_BASE_URL);

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        newUser
      );

      if (response.status === 201) {
        const data = response.data;

        console.log(response);

        setUser(data.user);

        localStorage.setItem("token", data.token);

        navigate("/home");
      }

      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
    } catch (err) {
      console.error("Signup error:", err);
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Signup failed";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
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
            <h3 className="text-base font-medium mb-2">What's your name</h3>
            <div className="flex gap-4 mb-5">
              <input
                type="text"
                required
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="bg-[#eeeeee] w-1/2 px-4 rounded py-2 text-base placeholder:text-sm"
              />

              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name"
                className="bg-[#eeeeee] w-1/2 px-4 rounded py-2 text-base placeholder:text-sm"
              />
            </div>

            <h3 className="text-base font-medium mb-2">Enter Email</h3>

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@emaple.com"
              className="bg-[#eeeeee] mb-5 px-4 rounded py-2 w-full text-lg placeholder:text-sm"
            />

            <h3 className="text-base font-medium mb-2">Enter password</h3>

            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              className="bg-[#eeeeee] mb-5 px-4 rounded py-2 w-full text-lg placeholder:text-sm"
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-[#111] text-white font-semibold mb-3 px-4 rounded py-2 w-full text-lg placeholder:text-base disabled:bg-gray-400"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-3">
              {error}
            </div>
          )}

          <p className="text-center">
            Already have a account?{" "}
            <Link className="text-blue-600" to="/login">
              Login Here
            </Link>
          </p>
        </div>
        <div>
          <p className="text-[10px]">
            By proceeding, you consent to get calls, WhatsApp or SMS messages,
            including by automated means, from Uber and its affiliates to the
            number provided.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
