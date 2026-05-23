import React from 'react';
import { LayoutDashboard, User, Calendar, CheckSquare, TrendingUp, BarChart2, LogOut, Award, Bell } from 'lucide-react';

export default function Layout({ children, activeTab, setActiveTab, dashboardData, handleLogout }) {
  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
    { id: 'profile', label: 'Profile', icon: <User size={16} /> },
    { id: 'attendance', label: 'Attendance', icon: <Calendar size={16} /> },
    { id: 'leave', label: 'Leave Management', icon: <CheckSquare size={16} /> },
    { id: 'predict', label: 'CGPA Prediction', icon: <TrendingUp size={16} /> },
    { id: 'analytics', label: 'Performance Analytics', icon: <BarChart2 size={16} /> }
  ];

  return (
    <div className="dashboard-layout">
      <aside style={{ width: '260px', backgroundColor: '#0B192C', color: '#94a3b8', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}>
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
                    borderRadius: '0.5rem', fontSize: '0.8125rem', fontWeight: isSelected ? '600' : '500', cursor: 'pointer'
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
          <button onClick={handleLogout} style={{ width: '100%', background: 'none', border: 'none', padding: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.8125rem', color: '#f43f5e', fontWeight: '600', cursor: 'pointer' }}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <header style={{ height: '64px', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxSizing: 'border-box' }}>
          <h2 style={{ margin: 0, fontSize: '0.875rem', fontWeight: '700', color: '#1e293b' }}>Intelligent CGPA Prediction and Academic Management System</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#4f46e5', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: '700' }}>AK</div>
              <div style={{ fontSize: '0.75rem' }}>
                <p style={{ margin: 0, fontWeight: '700', color: '#1e293b' }}>{dashboardData?.name}</p>
                <p style={{ margin: 0, color: '#64748b' }}>{dashboardData?.role}</p>
              </div>
            </div>
          </div>
        </header>

        <div style={{ padding: '1.5rem', boxSizing: 'border-box', overflowY: 'auto', flex: 1 }}>
          {children}
        </div>
        
        <footer style={{ height: '40px', backgroundColor: 'white', borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#94a3b8', fontWeight: '500' }}>
          © 2026 Intelligent CGPA Prediction and Academic Management System. All rights reserved.
        </footer>
      </div>
    </div>
  );
}