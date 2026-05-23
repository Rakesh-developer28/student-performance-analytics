import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Calendar, Award, TrendingUp, FileText } from 'lucide-react';

export default function Dashboard({ dashboardData, setActiveTab }) {
  const chartData = [...dashboardData.cgpa_history, { semester: "Semester 6 (Predicted)", gpa: null, predictedGpa: dashboardData.predicted_cgpa }];
  if (chartData[4]) chartData[4].predictedGpa = dashboardData.cgpa_history[4].gpa;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800' }}>Welcome back, {dashboardData.name}! 👋</h1>
          <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>Here's your academic status overview</p>
        </div>
        <div style={{ background: 'white', border: '1px solid #e2e8f0', padding: '0.5rem 0.75rem', borderRadius: '0.75rem', fontSize: '0.75rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Calendar size={14} /> {dashboardData.date}
        </div>
      </div>

      <div className="kpi-grid">
        <div className="generic-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '0.75rem', backgroundColor: '#eff6ff', color: '#2563eb', borderRadius: '0.75rem', display: 'flex' }}><Calendar size={20} /></div>
          <div>
            <p style={{ margin: 0, fontSize: '10px', color: '#94a3b8', fontWeight: '700' }}>ATTENDANCE</p>
            <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '900' }}>{dashboardData.attendance}%</h3>
          </div>
        </div>
        <div className="generic-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '0.75rem', backgroundColor: '#ecfdf5', color: '#059669', borderRadius: '0.75rem', display: 'flex' }}><Award size={20} /></div>
          <div>
            <p style={{ margin: 0, fontSize: '10px', color: '#94a3b8', fontWeight: '700' }}>CURRENT CGPA</p>
            <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '900' }}>{dashboardData.current_cgpa}</h3>
          </div>
        </div>
        <div className="generic-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '0.75rem', backgroundColor: '#f5f3ff', color: '#7c3aed', borderRadius: '0.75rem', display: 'flex' }}><TrendingUp size={20} /></div>
          <div>
            <p style={{ margin: 0, fontSize: '10px', color: '#94a3b8', fontWeight: '700' }}>PREDICTED CGPA</p>
            <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '900' }}>{dashboardData.predicted_cgpa}</h3>
          </div>
        </div>
        <div className="generic-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor:'pointer' }} onClick={() => setActiveTab('leave')}>
          <div style={{ padding: '0.75rem', backgroundColor: '#fff7ed', color: '#ea580c', borderRadius: '0.75rem', display: 'flex' }}><FileText size={20} /></div>
          <div>
            <p style={{ margin: 0, fontSize: '10px', color: '#94a3b8', fontWeight: '700' }}>PENDING LEAVES</p>
            <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '900' }}>{dashboardData.pending_leaves}</h3>
          </div>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="generic-card">
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.875rem' }}>CGPA Trend Analysis Curve</h3>
          <div style={{ height: '240px', fontSize: '11px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="semester" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="gpa" name="Actual CGPA" stroke="#2563eb" strokeWidth={2.5} connectNulls />
                <Line type="monotone" dataKey="predictedGpa" name="Predicted CGPA" stroke="#22c55e" strokeWidth={2.5} strokeDasharray="5 5" connectNulls />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="generic-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <h3 style={{ margin: 0, fontSize: '0.875rem' }}>Performance Distribution</h3>
          <div style={{ height: '160px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={dashboardData.performance_overview} cx="50%" cy="50%" innerRadius={50} outerRadius={68} dataKey="value">
                  {dashboardData.performance_overview.map((entry, idx) => <Cell key={`cell-${idx}`} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ position: 'absolute', textAlign: 'center' }}>
              <p style={{ margin: 0, fontSize: '10px', color: '#94a3b8' }}>CGPA</p>
              <p style={{ margin: 0, fontSize: '1.25rem', fontWeight: '900' }}>{dashboardData.current_cgpa}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}