import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Award, TrendingUp, Calendar, BarChart2 } from 'lucide-react';

export default function Login({ onLoginSuccess }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('arun.kumar@student.edu');
  const [password, setPassword] = useState('password123');
  const [errorMsg, setErrorMsg] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    fetch('http://127.0.0.1:5001/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    .then(async (res) => {
      const data = await res.json();
      if (res.ok && data.success) {
        onLoginSuccess(email);
      } else {
        setErrorMsg(data.message || 'Authentication query rejected.');
      }
    })
    .catch(() => setErrorMsg('Cannot locate backend API server. Verify Port 5001 is active.'));
  };

  return (
    <div className="custom-login-container">
      <div className="custom-card">
        <div className="left-panel">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem' }}>
              <div style={{ backgroundColor: '#4f46e5', padding: '0.6rem', borderRadius: '0.75rem', color: 'white', display: 'flex' }}><Award size={22} /></div>
              <div>
                <h1 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800', color: '#0f172a' }}>EduSmart</h1>
                <p style={{ margin: 0, fontSize: '10px', color: '#64748b' }}>CGPA Prediction & Academic System</p>
              </div>
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a', lineHeight: '1.2' }}>Smart Learning.<br /><span style={{ color: '#4f46e5' }}>Better Future.</span></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
            <div style={{ background: 'white', padding: '0.75rem', borderRadius: '0.875rem', textAlign: 'center' }}><TrendingUp size={16} style={{color:'#4f46e5'}} /><h4 style={{margin:0, fontSize:'9px'}}>Prediction</h4></div>
            <div style={{ background: 'white', padding: '0.75rem', borderRadius: '0.875rem', textAlign: 'center' }}><Calendar size={16} style={{color:'#4f46e5'}} /><h4 style={{margin:0, fontSize:'9px'}}>Management</h4></div>
            <div style={{ background: 'white', padding: '0.75rem', borderRadius: '0.875rem', textAlign: 'center' }}><BarChart2 size={16} style={{color:'#4f46e5'}} /><h4 style={{margin:0, fontSize:'9px'}}>Analytics</h4></div>
          </div>
        </div>

        <div className="right-panel">
          <div className="auth-form-wrapper">
            <h2 style={{ textAlign: 'center', margin: '0 0 2rem 0' }}>Welcome Back!</h2>
            {errorMsg && <div style={{ color: 'red', fontSize: '12px', marginBottom: '1rem' }}>{errorMsg}</div>}
            <form onSubmit={handleFormSubmit}>
              <div className="input-field-group">
                <Mail style={{ position: 'absolute', left: '1rem', top: '1rem', color: '#94a3b8' }} size={18} />
                <input type="text" value={email} onChange={e => setEmail(e.target.value)} className="input-element" required />
              </div>
              <div className="input-field-group">
                <Lock style={{ position: 'absolute', left: '1rem', top: '1rem', color: '#94a3b8' }} size={18} />
                <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} className="input-element" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '1rem', top: '1rem', background: 'none', border: 'none', color: '#94a3b8' }}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <button type="submit" className="primary-btn">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}