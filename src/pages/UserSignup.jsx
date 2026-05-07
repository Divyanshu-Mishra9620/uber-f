import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext.jsx";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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
      const newUser = {
        fullname: { firstname: firstName, lastname: lastName },
        email: email,
        password: password,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        newUser,
      );

      if (response.status === 201) {
        const data = response.data;
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

  const containerStyle = { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f7f7f8', padding: '16px' };
  const cardStyle = { width: '100%', maxWidth: '400px', background: '#fff', borderRadius: '20px', padding: '40px 32px', boxShadow: '0 0 0 1px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.06)' };
  const inputStyle = { width: '100%', padding: '14px 16px 14px 44px', background: '#f9fafb', border: '1.5px solid #e5e7eb', borderRadius: '12px', fontSize: '15px', color: '#111', outline: 'none', transition: 'all 0.2s', boxSizing: 'border-box', fontFamily: 'inherit' };
  const inputStyleNoIcon = { ...inputStyle, paddingLeft: '16px' };
  const labelStyle = { display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '8px' };

  const handleFocus = (e) => { e.target.style.background = '#fff'; e.target.style.borderColor = '#000'; };
  const handleBlur = (e) => { e.target.style.background = '#f9fafb'; e.target.style.borderColor = '#e5e7eb'; };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <img src="/uber-logo.svg" alt="Uber Logo" style={{ width: '72px', marginBottom: '32px' }} />

        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '4px', letterSpacing: '-0.02em', color: '#111' }}>Create your account</h1>
        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '24px' }}>Join millions of riders worldwide</p>

        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '12px 16px', borderRadius: '12px', marginBottom: '20px', fontSize: '14px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
            <i className="ri-error-warning-line" style={{ marginTop: '2px', flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={submitHandler}>
          {/* Name fields */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <i className="ri-user-line" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
              <input id="firstName" type="text" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} disabled={loading} required style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
            </div>
            <input id="lastName" type="text" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} disabled={loading} required style={{ ...inputStyleNoIcon, flex: 1 }} onFocus={handleFocus} onBlur={handleBlur} />
          </div>

          {/* Email */}
          <div style={{ position: 'relative', marginBottom: '16px' }}>
            <i className="ri-mail-line" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
            <input id="email" type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} required style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
          </div>

          {/* Password */}
          <div style={{ position: 'relative', marginBottom: '24px' }}>
            <i className="ri-lock-line" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
            <input id="password" type={showPassword ? "text" : "password"} placeholder="Create a strong password (8+ chars)" value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} required style={{ ...inputStyle, paddingRight: '48px' }} onFocus={handleFocus} onBlur={handleBlur} />
            <button type="button" onClick={() => setShowPassword(!showPassword)} disabled={loading} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', padding: '4px' }}>
              <i className={showPassword ? "ri-eye-off-line" : "ri-eye-line"} />
            </button>
          </div>

          <button type="submit" disabled={loading} style={{ width: '100%', padding: '14px', background: loading ? '#d1d5db' : '#000', color: loading ? '#6b7280' : '#fff', fontWeight: 600, fontSize: '15px', borderRadius: '12px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontFamily: 'inherit' }}>
            {loading ? (<><div className="loading-spinner" style={{ width: '18px', height: '18px' }} />Creating account...</>) : "Create Account"}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: '#6b7280' }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: '#000', fontWeight: 600 }}>Sign in</Link>
        </p>

        <p style={{ fontSize: '11px', color: '#9ca3af', lineHeight: 1.5, textAlign: 'center', marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #e5e7eb' }}>
          By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means, from Uber and its affiliates.
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
