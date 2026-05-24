import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, BarChart, Bar 
} from 'recharts';
import { 
  LayoutDashboard, User, Calendar, FileText, CheckSquare, PlusCircle,
  TrendingUp, BarChart2, LogOut, Lock, Mail, Award, CheckCircle, Plus, X
} from 'lucide-react';

const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
  { id: 'profile', label: 'Profile', icon: <User size={16} /> },
  { id: 'attendance', label: 'Attendance', icon: <Calendar size={16} /> },
  { id: 'leave', label: 'Leave Management', icon: <CheckSquare size={16} /> },
  { id: 'predict', label: 'CGPA Prediction', icon: <TrendingUp size={16} /> },
  { id: 'analytics', label: 'Performance Analytics', icon: <BarChart2 size={16} /> },
  { id: 'add_data', label: 'Insert Academic Data', icon: <PlusCircle size={16} /> }
];

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [authEmail, setAuthEmail] = useState('arun.kumar@student.edu');
  const [authPassword, setAuthPassword] = useState('password123');
  const [authError, setAuthError] = useState('');

  const [newSubject, setNewSubject] = useState('');
  const [newMarks, setNewMarks] = useState('');
  const [newGrade, setNewGrade] = useState('F');
  const [formSuccess, setFormSuccess] = useState('');

  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [leaveDate, setLeaveDate] = useState('');
  const [leaveReason, setLeaveReason] = useState('');
  const [leaveSuccess, setLeaveSuccess] = useState('');
  const [localLeaves, setLocalLeaves] = useState([
    { date: '2026-04-12', reason: 'Institutional Symposium Delegation', status: 'APPROVED', color: '#166534', bg: '#d1fae5' },
    { date: '2026-05-24', reason: 'Medical Assessment Diagnostics', status: 'PENDING', color: '#9a3412', bg: '#ffedd5' }
  ]);

  const [dashboardData, setDashboardData] = useState({
    name: "Arun Kumar",
    role: "Student",
    date: "May 23, 2026",
    attendance: 92,
    attendance_status: "Excellent",
    current_cgpa: 8.46,
    performance_status: "Good Performance",
    prediction_status: "High Chance",
    cgpa_history: [
      { semester: "Sem 1", gpa: 6.72 },
      { semester: "Sem 2", gpa: 7.14 },
      { semester: "Sem 3", gpa: 7.65 },
      { semester: "Sem 4", gpa: 8.12 },
      { semester: "Sem 5", gpa: 8.46 }
    ],
    subject_performance: [
      { subject: "Data Structures", marks: "87/100", grade: "A" },
      { subject: "Database Management", marks: "90/100", grade: "A+" },
      { subject: "Operating Systems", marks: "85/100", grade: "A" },
      { subject: "Computer Networks", marks: "78/100", grade: "B+" },
      { subject: "Software Engineering", marks: "82/100", grade: "A" }
    ],
    predicted_cgpa: 8.85,
    performance_overview: [
      { name: "Excellent", value: 65, color: "#22c55e" },
      { name: "Good", value: 25, color: "#3b82f6" },
      { name: "Average", value: 8, color: "#f97316" },
      { name: "Poor", value: 2, color: "#ef4444" }
    ],
    attendance_trend: [
      { month: "Jan", percentage: 90 },
      { month: "Feb", percentage: 92 },
      { month: "Mar", percentage: 88 },
      { month: "Apr", percentage: 93 },
      { month: "May", percentage: 91 }
    ]
  });

  const executeFrontendMLPrediction = (history) => {
    if (!history || history.length < 2) return 8.00;
    const n = history.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
    for (let i = 0; i < n; i++) {
      const x = i + 1; 
      const y = history[i].gpa;
      sumX += x; sumY += y; sumXY += x * y; sumXX += x * x;
    }
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    return Math.round((slope * (n + 1) + intercept) * 100) / 100;
  };

  useEffect(() => {
    const newPrediction = executeFrontendMLPrediction(dashboardData.cgpa_history);
    setDashboardData(prev => ({ ...prev, predicted_cgpa: newPrediction }));
  }, [dashboardData.cgpa_history]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (authEmail.trim() === 'arun.kumar@student.edu' && authPassword === 'password123') {
      setIsLoggedIn(true);
    } else {
      setAuthError('Invalid email or password configuration.');
    }
  };

  const handleAddDataSubmit = (e) => {
    e.preventDefault();
    const score = parseInt(newMarks, 10);
    const mockGPAImpact = Math.min(10.00, 6.0 + (score / 25));
    const nextSemNum = dashboardData.cgpa_history.length + 1;

    setDashboardData(prev => ({
      ...prev,
      cgpa_history: [...prev.cgpa_history, { semester: `Sem ${nextSemNum}`, gpa: mockGPAImpact }],
      subject_performance: [...prev.subject_performance, { subject: newSubject, marks: `${newMarks}/100`, grade: newGrade }],
      current_cgpa: Math.round((mockGPAImpact + prev.current_cgpa) / 2 * 100) / 100
    }));

    setFormSuccess('Metric successfully registered!');
    setNewSubject(''); setNewMarks(''); setNewGrade('F');
  };

  const handleApplyLeave = (e) => {
    e.preventDefault();
    if (!leaveDate || !leaveReason) return;
    setLocalLeaves([{ date: leaveDate, reason: leaveReason, status: 'PENDING', color: '#9a3412', bg: '#ffedd5' }, ...localLeaves]);
    setLeaveSuccess('Leave request logged successfully.');
    setLeaveDate(''); setLeaveReason('');
    setTimeout(() => { setLeaveSuccess(''); setShowLeaveModal(false); }, 1500);
  };

  const handleMarksInputChange = (e) => {
    const val = e.target.value;
    setNewMarks(val);
    const score = parseInt(val, 10);
    if (isNaN(score)) setNewGrade('F');
    else if (score >= 90) setNewGrade('A+');
    else if (score >= 80) setNewGrade('A');
    else if (score >= 70) setNewGrade('B+');
    else if (score >= 60) setNewGrade('B');
    else if (score >= 50) setNewGrade('C');
    else setNewGrade('F');
  };

  const chartData = [
    ...dashboardData.cgpa_history.map(item => ({ ...item, predictedGpa: null })),
    { semester: `Sem ${dashboardData.cgpa_history.length + 1} (Pred)`, gpa: null, predictedGpa: dashboardData.predicted_cgpa }
  ];
  if (chartData[dashboardData.cgpa_history.length - 1]) {
    chartData[dashboardData.cgpa_history.length - 1].predictedGpa = dashboardData.cgpa_history[dashboardData.cgpa_history.length - 1].gpa;
  }

  if (!isLoggedIn) {
    return (
      <div className="custom-login-container">
        <div className="custom-card">
          <div className="left-panel">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem' }}>
                <div style={{ backgroundColor: '#4f46e5', padding: '0.6rem', borderRadius: '0.75rem', color: 'white', display: 'flex' }}><Award size={22} /></div>
                <div>
                  <h1 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800', color: '#0f172a' }}>EduSmart</h1>
                  <p style={{ margin: 0, fontSize: '10px', color: '#64748b', fontWeight: '600' }}>Standalone Edition</p>
                </div>
              </div>
              <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a', margin: '0 0 0.75rem 0', lineHeight: '1.2' }}>Smart Learning.<br /><span style={{ color: '#4f46e5' }}>Better Future.</span></h2>
            </div>
            <div style={{ background: 'white', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: '1rem', textAlign: 'center', fontWeight: '600', color: '#4f46e5' }}>⚡ Sandbox Mode Ready</div>
          </div>
          <div className="right-panel">
            <div className="auth-form-wrapper">
              <h2 style={{ textAlign: 'center', margin: '0 0 1.5rem 0' }}>Welcome Back!</h2>
              {authError && <div style={{ background: '#fef2f2', padding: '0.75rem', borderRadius: '0.5rem', color: '#b91c1c', fontSize: '11px', marginBottom: '1rem' }}>{authError}</div>}
              <form onSubmit={handleLoginSubmit}>
                <div className="input-field-group">
                  <Mail style={{ position: 'absolute', left: '1rem', top: '1rem', color: '#94a3b8' }} size={18} />
                  <input type="text" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} className="input-element" required />
                </div>
                <div className="input-field-group">
                  <Lock style={{ position: 'absolute', left: '1rem', top: '1rem', color: '#94a3b8' }} size={18} />
                  <input type={showPassword ? "text" : "password"} value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} className="input-element" required />
                </div>
                <button type="submit" className="primary-btn">Sign In to Dashboard</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-layout" style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
      <aside style={{ width: '260px', backgroundColor: '#0B192C', color: '#94a3b8', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100vh', position: 'sticky', top: 0 }}>
        <div>
          <div style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid #1e293b' }}>
            <div style={{ backgroundColor: '#3b82f6', padding: '0.5rem', borderRadius: '0.5rem', color: 'white', display: 'flex' }}><Award size={18} /></div>
            <div>
              <h2 style={{ margin: 0, fontSize: '0.8125rem', fontWeight: '900', color: 'white' }}>EDU-ANALYTICS</h2>
              <p style={{ margin: 0, fontSize: '9px', color: '#64748b' }}>PERFORMANCE INTERFACE</p>
            </div>
          </div>
          <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {sidebarItems.map((item) => (
              <div 
                key={item.id} 
                onClick={() => { setActiveTab(item.id); setFormSuccess(''); }} 
                style={{ padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: activeTab === item.id ? 'white' : '#94a3b8', backgroundColor: activeTab === item.id ? '#1d4ed8' : 'transparent', borderRadius: '0.5rem', fontSize: '0.8125rem', cursor: 'pointer', fontWeight: activeTab === item.id ? '600' : '500' }}
              >
                {item.icon} {item.label}
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding: '1rem', borderTop: '1px solid #1e293b' }}>
          <button onClick={() => setIsLoggedIn(false)} style={{ width: '100%', background: 'none', border: 'none', padding: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#f43f5e', fontWeight: '600', cursor: 'pointer' }}><LogOut size={16} /> Logout</button>
        </div>
      </aside>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <header style={{ height: '64px', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ margin: 0, fontSize: '0.875rem', fontWeight: '700', color: '#1e293b' }}>Intelligent Performance System Workspace</h2>
          <span style={{ fontSize: '11px', background: '#e0f2fe', color: '#0369a1', padding: '0.25rem 0.5rem', borderRadius: '0.5rem', fontWeight: '700' }}>Local Standalone Build</span>
        </header>

        <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1 }}>
          
          {/* TAB 1: DASHBOARD VIEW */}
          {activeTab === 'dashboard' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="kpi-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                <div className="generic-card" style={{ background: 'white', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }}><h4>Attendance Tracker</h4><h3>{dashboardData.attendance}%</h3></div>
                <div className="generic-card" style={{ background: 'white', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }}><h4>Current Track Grade</h4><h3>{dashboardData.current_cgpa}</h3></div>
                <div className="generic-card" style={{ background: 'white', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }}><h4>Next Predicted Score</h4><h3>{dashboardData.predicted_cgpa}</h3></div>
                <div className="generic-card" style={{ background: 'white', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }}><h4>Pending Leave Forms</h4><h3>{localLeaves.filter(l => l.status === 'PENDING').length}</h3></div>
              </div>

              <div className="analytics-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
                <div className="generic-card" style={{ background: 'white', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }}>
                  <h3>Regression Pipeline Gradient Curve</h3>
                  <div style={{ height: '240px', fontSize: '11px' }}>
                    <LineChart width={500} height={240} data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="semester" />
                      <YAxis domain={[0, 10]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="gpa" stroke="#2563eb" strokeWidth={2.5} />
                      <Line type="monotone" dataKey="predictedGpa" stroke="#22c55e" strokeWidth={2.5} strokeDasharray="5 5" />
                    </LineChart>
                  </div>
                </div>
                <div className="generic-card" style={{ background: 'white', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }}>
                  <h3>Metrics Spread</h3>
                  <div style={{ height: '180px' }}>
                    <PieChart width={200} height={180}>
                      <Pie data={dashboardData.performance_overview} innerRadius={40} outerRadius={60} dataKey="value">
                        {dashboardData.performance_overview.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROFILE VIEW */}
          {activeTab === 'profile' && (
            <div className="generic-card" style={{ background: 'white', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }}>
              <h2>Student Registry Profile File</h2>
              <p style={{ margin: '0.5rem 0' }}><strong>Undergrad Identity Name:</strong> {dashboardData.name}</p>
              <p style={{ margin: '0.5rem 0' }}><strong>System Clearance Class:</strong> {dashboardData.role}</p>
              <p style={{ margin: '0.5rem 0' }}><strong>Calculated Standing Tier:</strong> {dashboardData.performance_status}</p>
            </div>
          )}

          {/* TAB 3: ATTENDANCE VIEW */}
          {activeTab === 'attendance' && (
            <div className="generic-card" style={{ background: 'white', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }}>
              <h2>Cumulative Monthly Attendance Compliance</h2>
              <div style={{ height: '240px' }}>
                <BarChart width={500} height={240} data={dashboardData.attendance_trend}>
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="percentage" fill="#3b82f6" />
                </BarChart>
              </div>
            </div>
          )}

          {/* TAB 4: LEAVE MANAGEMENT APPLICATION */}
          {activeTab === 'leave' && (
            <div className="generic-card" style={{ background: 'white', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h3>Absence Authorization Registry</h3>
                <button onClick={() => setShowLeaveModal(true)} className="primary-btn" style={{ width: 'auto', padding: '0.5rem 1rem' }}><Plus size={14} /> File Absence Form</button>
              </div>
              <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead><tr style={{ background: '#f1f5f9', textAlign: 'left' }}><th style={{ padding: '0.5rem' }}>Target Date</th><th style={{ padding: '0.5rem' }}>Context Justification</th><th style={{ padding: '0.5rem' }}>System Status</th></tr></thead>
                <tbody>
                  {localLeaves.map((l, i) => <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}><td style={{ padding: '0.5rem' }}>{l.date}</td><td style={{ padding: '0.5rem' }}>{l.reason}</td><td style={{ padding: '0.5rem' }}><span style={{ color: l.color, background: l.bg, padding: '0.2rem 0.5rem', borderRadius: '0.25rem', fontSize: '10px', fontWeight: 'bold' }}>{l.status}</span></td></tr>)}
                </tbody>
              </table>

              {showLeaveModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(15, 23, 42, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200 }}>
                  <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', width: '380px', position: 'relative' }}>
                    <button onClick={() => setShowLeaveModal(false)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer' }}><X size={18} /></button>
                    <h4>Submit New Absence Request</h4>
                    {leaveSuccess && <div style={{ color: 'green', fontSize: '12px', marginBottom: '0.5rem' }}>{leaveSuccess}</div>}
                    <form onSubmit={handleApplyLeave}>
                      <input type="date" value={leaveDate} onChange={e => setLeaveDate(e.target.value)} className="input-element" style={{ paddingLeft: '1rem', marginBottom: '1rem', width: '100%', boxSizing: 'border-box' }} required />
                      <input type="text" placeholder="Reason/Justification Context" value={leaveReason} onChange={e => setLeaveReason(e.target.value)} className="input-element" style={{ paddingLeft: '1rem', marginBottom: '1rem', width: '100%', boxSizing: 'border-box' }} required />
                      <button type="submit" className="primary-btn" style={{ width: '100%' }}>Submit Request</button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: ML PREDICTION INTERFACE */}
          {activeTab === 'predict' && (
            <div className="generic-card" style={{ background: 'white', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }}>
              <h2>Mathematical Ordinary Least Squares Prediction Engine</h2>
              <div style={{ background: '#f5f3ff', padding: '1rem', borderRadius: '0.5rem', color: '#6d28d9', fontWeight: 'bold', fontSize: '1.25rem', marginTop: '1rem' }}>
                Expected Semester {dashboardData.cgpa_history.length + 1} GPA: {dashboardData.predicted_cgpa}
              </div>
              <p style={{ fontSize: '12px', color: '#475569', marginTop: '1rem', lineHeight: '1.6' }}>
                The estimator maps linear trends over your data array dynamically inside the browser.
              </p>
            </div>
          )}

          {/* TAB 6: PERFORMANCE ANALYTICS TABLE */}
          {activeTab === 'analytics' && (
            <div className="generic-card" style={{ background: 'white', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }}>
              <h2>Course Matrix Ledger Assessments</h2>
              <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                <thead><tr style={{ background: '#f1f5f9', textAlign: 'left' }}><th style={{ padding: '0.5rem' }}>Subject/Course Code</th><th style={{ padding: '0.5rem' }}>Score Balance Value</th><th style={{ padding: '0.5rem' }}>Assigned Letter Grade</th></tr></thead>
                <tbody>
                  {dashboardData.subject_performance.map((s, i) => <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}><td style={{ padding: '0.5rem' }}><strong>{s.subject}</strong></td><td style={{ padding: '0.5rem' }}>{s.marks}</td><td style={{ padding: '0.5rem' }}><span style={{ color: '#166534', fontWeight: 'bold' }}>{s.grade}</span></td></tr>)}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 7: INSERT DATA MODULE VIEW */}
          {activeTab === 'add_data' && (
            <div className="generic-card" style={{ background: 'white', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', maxWidth: '450px' }}>
              <h2>Append Academic Metric Profile Record</h2>
              {formSuccess && <div style={{ background: '#d1fae5', color: '#065f46', padding: '0.75rem', borderRadius: '0.5rem', fontSize: '12px', marginBottom: '1rem' }}>{formSuccess}</div>}
              <form onSubmit={handleAddDataSubmit}>
                <input type="text" placeholder="Subject Title Name" value={newSubject} onChange={e => setNewSubject(e.target.value)} className="input-element" style={{ paddingLeft: '1rem', marginBottom: '1rem', width: '100%', boxSizing: 'border-box' }} required />
                <input type="number" min="0" max="100" placeholder="Raw Mark Score Matrix (0 - 100)" value={newMarks} onChange={handleMarksInputChange} className="input-element" style={{ paddingLeft: '1rem', marginBottom: '1rem', width: '100%', boxSizing: 'border-box' }} required />
                <div style={{ padding: '0.75rem', background: '#f1f5f9', borderRadius: '0.5rem', fontWeight: 'bold', marginBottom: '1rem', border: '1px dashed #cbd5e1' }}>Generated Scale Target Grade: {newGrade}</div>
                <button type="submit" className="primary-btn" style={{ width: '100%' }}>Submit Score Profile Log</button>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}