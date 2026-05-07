import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { CaptainDataContext } from '../context/CaptainContext.jsx'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainSignup = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')

  const { captain, setCaptain } = useContext(CaptainDataContext)

  const submitHandler = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const captainData = {
        fullname: { firstname: firstName, lastname: lastName },
        email: email,
        password: password,
        vehicle: {
          color: vehicleColor,
          plate: vehiclePlate,
          capacity: vehicleCapacity,
          vehicleType: vehicleType,
        }
      }

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)

      if (response.status === 201) {
        const data = response.data
        setCaptain(data.captain)
        localStorage.setItem('token', data.token)
        navigate('/captain-home')
      }

      setEmail("")
      setPassword("")
      setFirstName("")
      setLastName("")
      setVehicleColor('')
      setVehiclePlate('')
      setVehicleCapacity('')
      setVehicleType('')
    } catch (err) {
      console.error("Captain signup error:", err)
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Signup failed"
      setError(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = { width: '100%', padding: '14px 16px 14px 44px', background: '#f9fafb', border: '1.5px solid #e5e7eb', borderRadius: '12px', fontSize: '15px', color: '#111', outline: 'none', transition: 'all 0.2s', boxSizing: 'border-box', fontFamily: 'inherit' };
  const inputStyleNoIcon = { ...inputStyle, paddingLeft: '16px' };
  const handleFocus = (e) => { e.target.style.background = '#fff'; e.target.style.borderColor = '#000'; };
  const handleBlur = (e) => { e.target.style.background = '#f9fafb'; e.target.style.borderColor = '#e5e7eb'; };

  const stepBadge = (num) => ({
    width: '24px', height: '24px', borderRadius: '50%', background: '#000', color: '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, flexShrink: 0,
  });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f7f7f8', padding: '16px' }}>
      <div style={{ width: '100%', maxWidth: '420px', background: '#fff', borderRadius: '20px', padding: '36px 32px', boxShadow: '0 0 0 1px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.06)', maxHeight: '95vh', overflowY: 'auto' }}>

        {/* Logo + Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
          <img src="/uber-logo.svg" alt="Uber Logo" style={{ width: '72px' }} />
          <span style={{ background: '#111', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '4px 8px', borderRadius: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Captain</span>
        </div>

        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '4px', letterSpacing: '-0.02em', color: '#111' }}>Become a Captain</h1>
        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '24px' }}>Start earning with Uber</p>

        <form onSubmit={submitHandler}>
          {/* Step 1: Personal Info */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={stepBadge(1)}>1</div>
              <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Personal Info</h3>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <i className="ri-user-line" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                <input id="captain-signup-firstname" type="text" required placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
              </div>
              <input id="captain-signup-lastname" type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name" style={{ ...inputStyleNoIcon, flex: 1 }} onFocus={handleFocus} onBlur={handleBlur} />
            </div>

            <div style={{ position: 'relative', marginBottom: '12px' }}>
              <i className="ri-mail-line" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
              <input id="captain-signup-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
            </div>

            <div style={{ position: 'relative' }}>
              <i className="ri-lock-line" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
              <input id="captain-signup-password" type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a strong password" style={{ ...inputStyle, paddingRight: '48px' }} onFocus={handleFocus} onBlur={handleBlur} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', padding: '4px' }}>
                <i className={showPassword ? "ri-eye-off-line" : "ri-eye-line"} />
              </button>
            </div>
          </div>

          {/* Step 2: Vehicle Info */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={stepBadge(2)}>2</div>
              <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Vehicle Info</h3>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <i className="ri-palette-line" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                <input id="captain-vehicle-color" required type="text" placeholder="Color" value={vehicleColor} onChange={(e) => setVehicleColor(e.target.value)} style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
              </div>
              <div style={{ position: 'relative', flex: 1 }}>
                <i className="ri-draft-line" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                <input id="captain-vehicle-plate" required type="text" placeholder="Plate no." value={vehiclePlate} onChange={(e) => setVehiclePlate(e.target.value)} style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <i className="ri-group-line" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                <input id="captain-vehicle-capacity" required type="number" placeholder="Capacity" value={vehicleCapacity} onChange={(e) => setVehicleCapacity(e.target.value)} style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
              </div>
              <div style={{ position: 'relative', flex: 1 }}>
                <i className="ri-car-line" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', pointerEvents: 'none' }} />
                <select id="captain-vehicle-type" required value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} style={{ ...inputStyle, appearance: 'none', cursor: 'pointer', paddingRight: '40px' }} onFocus={handleFocus} onBlur={handleBlur}>
                  <option value="" disabled>Type</option>
                  <option value="car">Car</option>
                  <option value="auto">Auto</option>
                  <option value="bike">Moto</option>
                </select>
                <i className="ri-arrow-down-s-line" style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', pointerEvents: 'none' }} />
              </div>
            </div>
          </div>

          {error && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '12px 16px', borderRadius: '12px', marginBottom: '20px', fontSize: '14px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <i className="ri-error-warning-line" style={{ marginTop: '2px', flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          <button id="captain-signup-submit" type="submit" disabled={loading} style={{ width: '100%', padding: '14px', background: loading ? '#d1d5db' : '#000', color: loading ? '#6b7280' : '#fff', fontWeight: 600, fontSize: '15px', borderRadius: '12px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontFamily: 'inherit' }}>
            {loading ? (<><div className="loading-spinner" style={{ width: '18px', height: '18px' }} />Creating account...</>) : "Create Captain Account"}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: '#6b7280' }}>
          Already have an account?{' '}
          <Link to="/captain-login" style={{ color: '#000', fontWeight: 600 }}>Sign in</Link>
        </p>

        <p style={{ fontSize: '11px', color: '#9ca3af', lineHeight: 1.5, textAlign: 'center', marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #e5e7eb' }}>
          By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means, from Uber and its affiliates.
        </p>
      </div>
    </div>
  )
}

export default CaptainSignup