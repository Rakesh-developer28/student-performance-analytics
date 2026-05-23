import React, { useState, useEffect } from 'react';
import { LayoutDashboard, User, Calendar, CheckSquare, TrendingUp, BarChart2, PlusCircle, LogOut, Award, RefreshCw } from 'lucide-react';

// Modular View Layout Component Injections
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Attendance from './pages/Attendance';
import LeaveManagement from './pages/LeaveManagement';
import CGPAPrediction from './pages/CGPAPrediction';
import PerformanceAnalytics from './pages/PerformanceAnalytics';
import InsertAcademicData from './pages/InsertAcademicData';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const syncDatabaseMetrics = () => {
    if (isLoggedIn && userEmail) {
      setLoading(true);
      fetch(`http://127.0.0.1:5001/api/dashboard?email=${userEmail}`)
        .then(res => res.json())
        .then(data => {
          setDashboardData(data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Critical API link break:", err);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    syncDatabaseMetrics();
  }, [isLoggedIn, userEmail]);

  if (!isLoggedIn) {
    return <Login onLoginSuccess={(email) => { setUserEmail(email); setIsLoggedIn(true); }} />;
  }

  if (loading || !dashboardData) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', color: '#475569', gap: '0.5rem' }}>
        <RefreshCw size={20} className="animate-spin text-indigo-600" /> Syncing Modular Workspace Environment...
      </div>
    );
  }

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
      {/* Dynamic Sidebar Container */}
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

      {/* Main Panel View Area Frame */}
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
          {/* Dynamic Render Conditions Map */}
          {activeTab === 'dashboard' && <Dashboard dashboardData={dashboardData} setActiveTab={setActiveTab} />}
          {activeTab === 'profile' && <Profile dashboardData={dashboardData} />}
          {activeTab === 'attendance' && <Attendance dashboardData={dashboardData} />}
          {activeTab === 'leave' && <LeaveManagement dashboardData={dashboardData} />}
          {activeTab === 'predict' && <CGPAPrediction dashboardData={dashboardData} />}
          {activeTab === 'analytics' && <PerformanceAnalytics dashboardData={dashboardData} />}
          {activeTab === 'add_data' && <InsertAcademicData authEmail={userEmail} onRecordAdded={syncDatabaseMetrics} />}
        </div>
        
        <footer style={{ height: '40px', backgroundColor: 'white', borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#94a3b8', fontWeight: '500' }}>
          © 2026 Intelligent CGPA Prediction and Academic Management System. All rights reserved.
        </footer>
      </div>
    </div>
  );
}