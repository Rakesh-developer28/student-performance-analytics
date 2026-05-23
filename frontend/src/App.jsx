import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar 
} from 'recharts';
import { 
  LayoutDashboard, User, Calendar, FileText, CheckSquare, PlusCircle,
  TrendingUp, BarChart2, LogOut, Eye, EyeOff, Lock, Mail, Award, CheckCircle, RefreshCw, Plus, X
} from 'lucide-react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  
  // Authentication State Variables
  const [authEmail, setAuthEmail] = useState('arun.kumar@student.edu');
  const [authPassword, setAuthPassword] = useState('password123');
  const [authError, setAuthError] = useState('');

  // Data Entry State Parameters
  const [newSubject, setNewSubject] = useState('');
  const [newMarks, setNewMarks] = useState('');
  const [newGrade, setNewGrade] = useState('F');
  const [formSuccess, setFormSuccess] = useState('');

  // Leave Management State Parameters
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [leaveDate, setLeaveDate] = useState('');
  const [leaveReason, setLeaveReason] = useState('');
  const [leaveSuccess, setLeaveSuccess] = useState('');
  const [localLeaves, setLocalLeaves] = useState([
    { date: '2026-04-12', reason: 'Institutional Symposium Delegation', status: 'APPROVED', color: '#166534', bg: '#d1fae5' },
    { date: '2026-05-24', reason: 'Medical Assessment Diagnostics', status: 'PENDING', color: '#9a3412', bg: '#ffedd5' }
  ]);

  // Dynamic Vercel Server Base API Endpoint Environment Link Selector
  const getBackendUrl = () => {
    return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? 'http://127.0.0.1:5001'
      : 'https://student-performance-analytics-api.vercel.app'; // <-- Swap with your deployed live Flask URL
  };

  const fetchDashboardMetrics = () => {
    setLoading(true);
    setConnectionError(false);
    fetch(`${getBackendUrl()}/api/dashboard?email=${authEmail}`)
      .then(res => {
        if (!res.ok) throw new Error('Data endpoint sync issue');
        return res.json();
      })
      .then(data => {
        setDashboardData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Dashboard metric retrieval failure:", err);
        setConnectionError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (isLoggedIn && authEmail) {
      fetchDashboardMetrics();
    }
  }, [isLoggedIn, authEmail]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setAuthError('');

    fetch(`${getBackendUrl()}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: authEmail, password: authPassword })
    })
    .then(async (res) => {
      const data = await res.json();
      if (res.ok && data.success) {
        setIsLoggedIn(true);
      } else {
        setAuthError(data.message || 'Credentials verification mismatch.');
      }
    })
    .catch((err) => {
      console.error(err);
      setAuthError('Failed connection mapping to local server API. Ensure Flask is active.');
    });
  };

  const handleAddDataSubmit = (e) => {
    e.preventDefault();
    setFormSuccess('');

    fetch(`${getBackendUrl()}/api/student/add_marks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: authEmail,
        subject: newSubject,
        marks: `${newMarks}/100`,
        grade: newGrade
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setFormSuccess('Academic assessment record added successfully!');
        setNewSubject('');
        setNewMarks('');
        setNewGrade('F');
        fetchDashboardMetrics(); 
      }
    })
    .catch(err => console.error("Data tracking record update error:", err));
  };

  const handleApplyLeave = (e) => {
    e.preventDefault();
    if (!leaveDate || !leaveReason) return;

    const newLeave = {
      date: leaveDate,
      reason: leaveReason,
      status: 'PENDING',
      color: '#9a3412',
      bg: '#ffedd5'
    };

    setLocalLeaves([newLeave, ...localLeaves]);
    setLeaveSuccess('Leave application registered successfully!');
    setLeaveDate('');
    setLeaveReason('');
    
    setTimeout(() => {
      setLeaveSuccess('');
      setShowLeaveModal(false);
    }, 2000);
  };

  const calculateAutoGrade = (scoreValue) => {
    const score = parseInt(scoreValue, 10);
    if (isNaN(score)) return 'F';
    if (score >= 90) return 'A+';
    if (score >= 80) return 'A';
    if (score >= 70) return 'B+';
    if (score >= 60) return 'B';
    if (score >= 50) return 'C';
    return 'F';
  };

  const handleMarksInputChange = (e) => {
    const scoreValue = e.target.value;
    setNewMarks(scoreValue);
    setNewGrade(calculateAutoGrade(scoreValue));
  };

  const formatReadableDate = (rawDateString) => {
    if (!rawDateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateObj = new Date(rawDateString);
    return isNaN(dateObj) ? rawDateString : dateObj.toLocaleDateString('en-US', options);
  };

  if (!isLoggedIn) {
    return (
      <div className="custom-login-container">
        <div className="custom-card">
          {/* Left Graphics Panel */}
          <div className="left-panel">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem' }}>
                <div style={{ backgroundColor: '#4f46e5', padding: '0.6rem', borderRadius: '0.75rem', color: 'white', display: 'flex' }}>
                  <Award size={22} />
                </div>
                <div>
                  <h1 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800', color: '#0f172a' }}>EduSmart</h1>
                  <p style={{ margin: 0, fontSize: '10px', color: '#64748b', fontWeight: '600' }}>CGPA Prediction & Academic Management System</p>
                </div>
              </div>
              
              <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a', margin: '0 0 0.75rem 0', lineHeight: '1.2' }}>
                Smart Learning.<br />
                <span style={{ color: '#4f46e5' }}>Better Future.</span>
              </h2>
              <p style={{ fontSize: '0.875rem', color: '#475569', margin: 0, lineHeight: '1.5' }}>
                Track your academics, predict your CGPA and achieve your goals with EduSmart.
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.8)', padding: '2.5rem', borderRadius: '1.25rem', textAlign: 'center', backdropFilter: 'blur(4px)' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>🎓</div>
              <div style={{ fontSize: '2.5rem', marginTop: '-1.5rem', marginBottom: '0.5rem' }}>📚</div>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#334155', display: 'block', textTransform: 'uppercase' }}>
                Academic Predictor Portal
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
              <div style={{ background: 'white', padding: '0.75rem', borderRadius: '0.875rem', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                <TrendingUp size={16} style={{ color: '#4f46e5', marginBottom: '0.25rem', display: 'inline-block' }} />
                <h4 style={{ margin: 0, fontSize: '9px', fontWeight: '700' }}>CGPA Prediction</h4>
              </div>
              <div style={{ background: 'white', padding: '0.75rem', borderRadius: '0.875rem', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                <Calendar size={16} style={{ color: '#4f46e5', marginBottom: '0.25rem', display: 'inline-block' }} />
                <h4 style={{ margin: 0, fontSize: '9px', fontWeight: '700' }}>Academic Mgmt</h4>
              </div>
              <div style={{ background: 'white', padding: '0.75rem', borderRadius: '0.875rem', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                <BarChart2 size={16} style={{ color: '#4f46e5', marginBottom: '0.25rem', display: 'inline-block' }} />
                <h4 style={{ margin: 0, fontSize: '9px', fontWeight: '700' }}>Analytics</h4>
              </div>
            </div>
          </div>

          {/* Right Input Window */}
          <div className="right-panel">
            <div className="auth-form-wrapper">
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#0f172a', margin: 0 }}>Welcome Back!</h2>
                <p style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.35rem' }}>Login to continue to your account</p>
              </div>

              {authError && (
                <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', padding: '0.75rem', borderRadius: '0.5rem', color: '#b91c1c', fontSize: '12px', fontWeight: '600', marginBottom: '1rem' }}>
                  {authError}
                </div>
              )}

              <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="input-field-group">
                  <Mail style={{ position: 'absolute', left: '1rem', top: '1rem', color: '#94a3b8' }} size={18} />
                  <input type="text" placeholder="Email or Student ID" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} className="input-element" required />
                </div>

                <div className="input-field-group">
                  <Lock style={{ position: 'absolute', left: '1rem', top: '1rem', color: '#94a3b8' }} size={18} />
                  <input type={showPassword ? "text" : "password"} placeholder="Password" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} className="input-element" required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '1rem', top: '1rem', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
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

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', color: '#475569', gap: '0.5rem' }}>
        <RefreshCw size={20} className="animate-spin text-indigo-600" /> Syncing Active Matrices...
      </div>
    );
  }

  if (connectionError || !dashboardData) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center', background: '#f8fafc' }}>
        <h2 style={{ color: '#ef4444' }}>Dashboard Sync Interrupted</h2>
        <p style={{ color: '#64748b', maxWidth: '400px', margin: '0.5rem 0 1.5rem 0' }}>Could not pull records from backend. Verify your Flask engine is running.</p>
        <button onClick={() => setIsLoggedIn(false)} className="primary-btn" style={{ maxWidth: '200px' }}>Return to Login</button>
      </div>
    );
  }

  const chartData = [...dashboardData.cgpa_history, { semester: "Semester 6 (Predicted)", gpa: null, predictedGpa: dashboardData.predicted_cgpa }];
  if (chartData[4]) chartData[4].predictedGpa = dashboardData.cgpa_history[4].gpa;

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
    { id: 'profile', label: 'Profile', icon: <User size={16} /> },
    { id: 'attendance', label: 'Attendance', icon: <Calendar size={16} /> },
    { id: 'leave', label: 'Leave Management', icon: <CheckSquare size={16} /> },
    { id: 'predict', label: 'CGPA Prediction', icon: <TrendingUp size={16} /> },
    { id: 'analytics', label: 'Performance Analytics', icon: <BarChart2 size={16} /> },
    { id: 'add_data', label: 'Insert Academic Data', icon: <PlusCircle size={16} /> }
  ];

  return (
    <div className="dashboard-layout">
      {/* Sidebar View Container */}
      <aside style={{ width: '260px', backgroundColor: '#0B192C', color: '#94a3b8', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box', height: '100vh', position: 'sticky', top: 0, zIndex: 50 }}>
        <div>
          <div style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid #1e293b' }}>
            <div style={{ backgroundColor: '#3b82f6', padding: '0.5rem', borderRadius: '0.5rem', color: 'white', display: 'flex' }}><Award size={18} /></div>
            <div>
              <h2 style={{ margin: 0, fontSize: '0.8125rem', fontWeight: '900', color: 'white', letterSpacing: '0.05em' }}>CGPA</h2>
              <p style={{ margin: 0, fontSize: '9px', fontWeight: '700', color: '#64748b' }}>PREDICTION SYSTEM</p>
            </div>
          </div>
          <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {sidebarItems.map((item) => {
              const isSelected = activeTab === item.id;
              return (
                <div 
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  style={{ 
                    padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', 
                    color: isSelected ? 'white' : '#94a3b8', backgroundColor: isSelected ? '#1d4ed8' : 'transparent', 
                    borderRadius: '0.5rem', fontSize: '0.8125rem', fontWeight: isSelected ? '600' : '500', cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  className={!isSelected ? "hover:bg-slate-800/40 hover:text-slate-200" : ""}
                >
                  {item.icon} {item.label}
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ padding: '1rem', borderTop: '1px solid #1e293b' }}>
          <button onClick={() => setIsLoggedIn(false)} style={{ width: '100%', background: 'none', border: 'none', padding: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.8125rem', color: '#f43f5e', fontWeight: '600', cursor: 'pointer' }}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Panel Routing Frame */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <header style={{ height: '64px', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxSizing: 'border-box' }}>
          <h2 style={{ margin: 0, fontSize: '0.875rem', fontWeight: '700', color: '#1e293b' }}>Intelligent CGPA Prediction and Academic Management System</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#4f46e5', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: '700' }}>AK</div>
              <div style={{ fontSize: '0.75rem' }}>
                <p style={{ margin: 0, fontWeight: '700', color: '#1e293b' }}>{dashboardData.name}</p>
                <p style={{ margin: 0, color: '#64748b' }}>{dashboardData.role}</p>
              </div>
            </div>
          </div>
        </header>

        <div style={{ padding: '1.5rem', boxSizing: 'border-box', overflowY: 'auto', flex: 1 }}>
          
          {/* TAB 1: DASHBOARD PANEL */}
          {activeTab === 'dashboard' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h1 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800', color: '#0f172a' }}>Welcome back, {dashboardData.name}! 👋</h1>
                  <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.75rem', color: '#64748b' }}>Here's your academic status overview</p>
                </div>
                <div style={{ background: 'white', border: '1px solid #e2e8f0', padding: '0.5rem 0.75rem', borderRadius: '0.75rem', fontSize: '0.75rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Calendar size={14} /> {dashboardData.date}
                </div>
              </div>

              <div className="kpi-grid">
                <div className="generic-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ padding: '0.75rem', backgroundColor: '#eff6ff', color: '#2563eb', borderRadius: '0.75rem', display: 'flex' }}><Calendar size={20} /></div>
                  <div>
                    <p style={{ margin: 0, fontSize: '10px', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase' }}>Attendance</p>
                    <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '900', color: '#1e293b' }}>{dashboardData.attendance}%</h3>
                    <span style={{ fontSize: '9px', fontWeight: '700', background: '#d1fae5', color: '#065f46', padding: '0.1rem 0.4rem', borderRadius: '1rem' }}>{dashboardData.attendance_status}</span>
                  </div>
                </div>
                <div className="generic-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ padding: '0.75rem', backgroundColor: '#ecfdf5', color: '#059669', borderRadius: '0.75rem', display: 'flex' }}><Award size={20} /></div>
                  <div>
                    <p style={{ margin: 0, fontSize: '10px', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase' }}>Current CGPA</p>
                    <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '900', color: '#1e293b' }}>{dashboardData.current_cgpa}</h3>
                    <span style={{ fontSize: '9px', fontWeight: '700', background: '#d1fae5', color: '#065f46', padding: '0.1rem 0.4rem', borderRadius: '1rem' }}>{dashboardData.performance_status}</span>
                  </div>
                </div>
                <div className="generic-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ padding: '0.75rem', backgroundColor: '#f5f3ff', color: '#7c3aed', borderRadius: '0.75rem', display: 'flex' }}><TrendingUp size={20} /></div>
                  <div>
                    <p style={{ margin: 0, fontSize: '10px', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase' }}>Predicted Next CGPA</p>
                    <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '900', color: '#1e293b' }}>{dashboardData.predicted_cgpa}</h3>
                    <span style={{ fontSize: '9px', fontWeight: '700', background: '#f5f3ff', color: '#6d28d9', padding: '0.1rem 0.4rem', borderRadius: '1rem' }}>{dashboardData.prediction_status}</span>
                  </div>
                </div>
                <div className="generic-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }} onClick={() => setActiveTab('leave')}>
                  <div style={{ padding: '0.75rem', backgroundColor: '#fff7ed', color: '#ea580c', borderRadius: '0.75rem', display: 'flex' }}><FileText size={20} /></div>
                  <div>
                    <p style={{ margin: 0, fontSize: '10px', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase' }}>Pending Leaves</p>
                    <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '900', color: '#1e293b' }}>{dashboardData.pending_leaves}</h3>
                    <span style={{ fontSize: '9px', fontWeight: '700', color: '#ea580c' }}>Active Tracking</span>
                  </div>
                </div>
              </div>

              <div className="analytics-grid">
                <div className="generic-card" style={{ gridColumn: 'span 2' }}>
                  <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.875rem', fontWeight: '700' }}>CGPA Trend Analysis Curve</h3>
                  <div style={{ height: '240px', fontSize: '11px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData} margin={{ top: 5, right: 20, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="semester" stroke="#94a3b8" />
                        <YAxis domain={[0, 10]} stroke="#94a3b8" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="gpa" name="Actual CGPA" stroke="#2563eb" strokeWidth={2.5} connectNulls />
                        <Line type="monotone" dataKey="predictedGpa" name="Predicted CGPA" stroke="#22c55e" strokeWidth={2.5} strokeDasharray="5 5" connectNulls />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="generic-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <h3 style={{ margin: 0, fontSize: '0.875rem', fontWeight: '700' }}>Performance Overview</h3>
                  <div style={{ height: '160px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={dashboardData.performance_overview} cx="50%" cy="50%" innerRadius={50} outerRadius={68} paddingAngle={3} dataKey="value">
                          {dashboardData.performance_overview.map((entry, idx) => <Cell key={`cell-${idx}`} fill={entry.color} />)}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div style={{ position: 'absolute', textAlign: 'center' }}>
                      <p style={{ margin: 0, fontSize: '10px', color: '#94a3b8', fontWeight: '700' }}>OVERALL</p>
                      <p style={{ margin: 0, fontSize: '1.25rem', fontWeight: '900' }}>{dashboardData.current_cgpa}</p>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '10px' }}>
                    {dashboardData.performance_overview.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.25rem 0.5rem', background: '#f8fafc', borderRadius: '0.5rem' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#475569' }}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: item.color, display: 'inline-block' }}></span>
                          {item.name.split(' ')[0]}
                        </span>
                        <span style={{ fontWeight: '700' }}>{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: IDENTITY PROFILE CARD */}
          {activeTab === 'profile' && (
            <div className="generic-card">
              <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: '700' }}>Student Profile Identity Card</h2>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#4f46e5', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>AK</div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{dashboardData.name}</h3>
                  <p style={{ margin: 0, color: '#64748b', fontSize: '0.875rem' }}>{authEmail}</p>
                </div>
              </div>
              <p style={{ margin: '0.5rem 0' }}><strong>System Account Type:</strong> {dashboardData.role}</p>
              <p style={{ margin: '0.5rem 0' }}><strong>Standing Status Matrix:</strong> {dashboardData.performance_status}</p>
            </div>
          )}

          {/* TAB 3: ATTENDANCE INSIGHTS */}
          {activeTab === 'attendance' && (
            <div className="generic-card">
              <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: '700' }}>Detailed Attendance Trends</h2>
              <div style={{ height: '260px', marginBottom: '1rem' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dashboardData.attendance_trend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="percentage" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div style={{ padding: '1rem', background: '#f0fdf4', borderRadius: '0.75rem', border: '1px solid #bbf7d0', color: '#166534', fontSize: '0.8125rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle size={16} /> Cumulative presence bounds match target criteria smoothly ($\ge 75\%$).
              </div>
            </div>
          )}

          {/* TAB 4: LEAVE APPLICATION REGISTRY */}
          {activeTab === 'leave' && (
            <div className="generic-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                  <h2 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '700' }}>Leave Management Applications Status Registry</h2>
                  <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.75rem', color: '#64748b' }}>
                    Active parameters locate <strong>{localLeaves.filter(l => l.status === 'PENDING').length}</strong> unresolved leave workflows.
                  </p>
                </div>
                <button 
                  onClick={() => setShowLeaveModal(true)}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#4f46e5', color: 'white', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '0.75rem', fontSize: '0.8125rem', fontWeight: '600', cursor: 'pointer' }}
                >
                  <Plus size={16} /> Apply For Leave
                </button>
              </div>

              <table className="data-table">
                <thead>
                  <tr>
                    <th>Leave Window Date</th>
                    <th>Reason / Justification Context</th>
                    <th>System Status Indicator</th>
                  </tr>
                </thead>
                <tbody>
                  {localLeaves.map((leave, idx) => (
                    <tr key={idx}>
                      <td><strong>{formatReadableDate(leave.date)}</strong></td>
                      <td style={{ color: '#475569' }}>{leave.reason}</td>
                      <td>
                        <span style={{ color: leave.color, background: leave.bg, padding: '0.25rem 0.6rem', borderRadius: '0.375rem', fontWeight: '700', fontSize: '10px' }}>
                          {leave.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {showLeaveModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
                  <div style={{ background: 'white', padding: '2rem', borderRadius: '1.25rem', width: '100%', maxWidth: '450px', position: 'relative', boxSizing: 'border-box' }}>
                    <button onClick={() => setShowLeaveModal(false)} style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><X size={20} /></button>
                    <h3 style={{ margin: '0 0 1.25rem 0', fontSize: '1.125rem', fontWeight: '700' }}>Submit Leave Request</h3>
                    {leaveSuccess && <div style={{ background: '#d1fae5', padding: '0.75rem', borderRadius: '0.5rem', color: '#065f46', fontSize: '12px', marginBottom: '1rem', fontWeight: '600' }}><CheckCircle size={14} /> {leaveSuccess}</div>}
                    <form onSubmit={handleApplyLeave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '0.35rem' }}>Select Target Date</label>
                        <input type="date" value={leaveDate} onChange={e => setLeaveDate(e.target.value)} className="input-element" style={{ paddingLeft: '1rem', cursor: 'pointer' }} required />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '0.35rem' }}>Reason for Absence</label>
                        <input type="text" placeholder="e.g. Sickness consultation" value={leaveReason} onChange={e => setLeaveReason(e.target.value)} className="input-element" style={{ paddingLeft: '1rem' }} required />
                      </div>
                      <button type="submit" className="primary-btn">Submit Request</button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: CGPA PREDICTION TERMINAL VIEW */}
          {activeTab === 'predict' && (
            <div className="generic-card">
              <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: '700' }}>Machine Learning Regression Prediction Engine</h2>
              <div style={{ padding: '1.25rem', background: '#f5f3ff', border: '1px solid #ddd6fe', borderRadius: '0.75rem', color: '#6d28d9', marginTop: '0.5rem' }}>
                <strong>Projected Next-Semester target outcome score:</strong> {dashboardData.predicted_cgpa}
              </div>
              <p style={{ fontSize: '0.8125rem', color: '#475569', marginTop: '1rem', lineHeight: '1.6' }}>
                The mathematical linear regression estimator plots historical data sequences to map targeted gradient optimization vectors automatically.
              </p>
            </div>
          )}

          {/* TAB 6: PERFORMANCE ANALYTICS GRADE MATRIX */}
          {activeTab === 'analytics' && (
            <div className="generic-card">
              <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: '700' }}>Subject Performance Grid Matrix</h2>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Subject Title</th>
                    <th>Assessment Raw Marks</th>
                    <th>Derived Letter Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.subject_performance.map((sub, idx) => (
                    <tr key={idx}>
                      <td><strong>{sub.subject}</strong></td>
                      <td>{sub.marks}</td>
                      <td><span style={{ color: '#166534', fontWeight: 'bold' }}>{sub.grade}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 7: ACADEMIC DATA ENTRY PANEL */}
          {activeTab === 'add_data' && (
            <div className="generic-card" style={{ maxWidth: '500px', margin: '0 auto' }}>
              <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: '700' }}>Insert New Assessment Record</h2>
              
              {formSuccess && (
                <div style={{ background: '#d1fae5', border: '1px solid #34d399', padding: '0.75rem', borderRadius: '0.5rem', color: '#065f46', fontSize: '0.8125rem', marginBottom: '1rem', fontWeight: '600' }}>
                  {formSuccess}
                </div>
              )}

              <form onSubmit={handleAddDataSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '0.35rem' }}>Subject Title</label>
                  <input type="text" placeholder="e.g. Operating Systems" value={newSubject} onChange={(e) => setNewSubject(e.target.value)} className="input-element" style={{ paddingLeft: '1rem' }} required />
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '0.35rem' }}>Raw Score Matrix (Out of 100)</label>
                  <input type="number" min="0" max="100" placeholder="e.g. 92" value={newMarks} onChange={handleMarksInputChange} className="input-element" style={{ paddingLeft: '1rem' }} required />
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '0.35rem' }}>System Calculated Grade (Auto)</label>
                  <div style={{ padding: '0.875rem 1rem', background: '#f1f5f9', borderRadius: '0.75rem', fontSize: '0.875rem', fontWeight: '800', color: newGrade === 'F' ? '#ef4444' : '#166534', border: '1px solid #cbd5e1' }}>
                    {newGrade} {newGrade !== 'F' ? ' (Automatic Scale Match)' : ''}
                  </div>
                </div>

                <button type="submit" className="primary-btn" style={{ marginTop: '0.5rem' }}>Submit Academic Mark</button>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}