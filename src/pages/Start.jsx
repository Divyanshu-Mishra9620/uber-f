import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div style={{ minHeight: '100vh', width: '100%', background: '#000', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>

      {/* Background Image */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <img
          src="/hero-bg.png"
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.55 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)' }} />
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '0 28px', maxWidth: '480px', margin: '0 auto', width: '100%' }}>

        {/* Logo */}
        <div style={{ paddingTop: '48px' }}>
          <img
            src="/uber-logo-white.svg"
            alt="Uber"
            style={{ width: '96px', height: 'auto' }}
          />
        </div>

        {/* Hero + CTA */}
        <div style={{ paddingBottom: '56px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 800, color: '#fff', marginBottom: '12px', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
            Go anywhere<br />with Uber
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '16px', marginBottom: '40px', maxWidth: '280px', lineHeight: 1.5 }}>
            Request a ride, hop in, and go.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link
              to="/login"
              id="start-continue-btn"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                width: '100%', background: '#fff', color: '#000',
                fontWeight: 600, fontSize: '16px', padding: '16px 24px',
                borderRadius: '12px', textDecoration: 'none',
                transition: 'all 0.2s',
              }}
            >
              <span>Continue to Login</span>
              <i className="ri-arrow-right-line" style={{ fontSize: '18px' }} />
            </Link>

            <Link
              to="/captain-login"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                width: '100%', background: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
                color: '#fff', fontWeight: 600, fontSize: '16px',
                padding: '16px 24px', borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.2)',
                textDecoration: 'none', transition: 'all 0.2s',
              }}
            >
              <i className="ri-steering-2-line" style={{ fontSize: '18px' }} />
              <span>Sign in as Captain</span>
            </Link>

            <Link
              to="/signup"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '100%', color: 'rgba(255,255,255,0.65)',
                fontWeight: 500, fontSize: '15px', padding: '14px 24px',
                borderRadius: '12px', textDecoration: 'none',
                transition: 'all 0.2s',
              }}
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ position: 'relative', zIndex: 10, padding: '16px 0', textAlign: 'center', color: 'rgba(255,255,255,0.25)', fontSize: '12px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <p>© {new Date().getFullYear()} Uber Clone</p>
      </div>
    </div>
  );
};

export default Start;
