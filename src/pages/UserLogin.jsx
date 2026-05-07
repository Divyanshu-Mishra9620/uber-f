import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext.jsx";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userData = { email: email, password: password };

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        userData,
      );

      if (response.status === 200) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        navigate("/home");
      }

      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("Login error:", err);
      const errorMsg =
        err.response?.data?.message || err.message || "Login failed";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f7f7f8', padding: '16px' }}>
      <div style={{ width: '100%', maxWidth: '400px', background: '#fff', borderRadius: '20px', padding: '40px 32px', boxShadow: '0 0 0 1px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.06)' }}>

        {/* Logo */}
        <img
          src="/uber-logo.svg"
          alt="Uber Logo"
          style={{ width: '72px', height: 'auto', marginBottom: '32px' }}
        />

        {/* Heading */}
        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '4px', letterSpacing: '-0.02em', color: '#111' }}>
          Welcome back
        </h1>
        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '32px' }}>
          Sign in to your rider account
        </p>

        {/* Error */}
        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '12px 16px', borderRadius: '12px', marginBottom: '20px', fontSize: '14px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
            <i className="ri-error-warning-line" style={{ marginTop: '2px', flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={submitHandler}>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="email" style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>
              Email
            </label>
            <div style={{ position: 'relative' }}>
              <i className="ri-mail-line" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', fontSize: '16px' }} />
              <input
                id="email"
                type="email"
                style={{
                  width: '100%',
                  padding: '14px 16px 14px 44px',
                  background: '#f9fafb',
                  border: '1.5px solid #e5e7eb',
                  borderRadius: '12px',
                  fontSize: '15px',
                  color: '#111',
                  outline: 'none',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box',
                }}
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
                onFocus={(e) => { e.target.style.background = '#fff'; e.target.style.borderColor = '#000'; }}
                onBlur={(e) => { e.target.style.background = '#f9fafb'; e.target.style.borderColor = '#e5e7eb'; }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label htmlFor="password" style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <i className="ri-lock-line" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', fontSize: '16px' }} />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                style={{
                  width: '100%',
                  padding: '14px 48px 14px 44px',
                  background: '#f9fafb',
                  border: '1.5px solid #e5e7eb',
                  borderRadius: '12px',
                  fontSize: '15px',
                  color: '#111',
                  outline: 'none',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box',
                }}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
                onFocus={(e) => { e.target.style.background = '#fff'; e.target.style.borderColor = '#000'; }}
                onBlur={(e) => { e.target.style.background = '#f9fafb'; e.target.style.borderColor = '#e5e7eb'; }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', padding: '4px', fontSize: '16px' }}
                disabled={loading}
              >
                <i className={showPassword ? "ri-eye-off-line" : "ri-eye-line"} />
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              background: loading ? '#d1d5db' : '#000',
              color: loading ? '#6b7280' : '#fff',
              fontWeight: 600,
              fontSize: '15px',
              borderRadius: '12px',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.2s',
              fontFamily: 'inherit',
            }}
          >
            {loading ? (
              <>
                <div className="loading-spinner" style={{ width: '18px', height: '18px' }} />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Sign up link */}
        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '13px', color: '#6b7280' }}>
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: '#000', fontWeight: 600, textDecoration: 'none' }}>
            Sign up here
          </Link>
        </p>

        {/* Divider */}
        <div style={{ position: 'relative', margin: '28px 0 24px' }}>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '100%', borderTop: '1px solid #e5e7eb' }} />
          </div>
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <span style={{ padding: '0 12px', background: '#fff', color: '#9ca3af', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>or</span>
          </div>
        </div>

        {/* Captain link */}
        <Link
          to="/captain-login"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            padding: '14px',
            background: '#f3f4f6',
            color: '#000',
            fontWeight: 600,
            fontSize: '15px',
            borderRadius: '12px',
            border: 'none',
            cursor: 'pointer',
            gap: '8px',
            textDecoration: 'none',
            transition: 'background 0.2s',
          }}
        >
          <i className="ri-steering-2-line" style={{ fontSize: '18px' }} />
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
