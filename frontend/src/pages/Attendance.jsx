import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CheckCircle } from 'lucide-react';

export default function Attendance({ dashboardData }) {
  return (
    <div className="generic-card">
      <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem' }}>Monthly Attendance Compliance Tracker</h2>
      <div style={{ height: '260px', marginBottom: '1.5rem' }}>
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
        <CheckCircle size={16} /> Cumulative attendance markers comply with global academic requirements ($\ge 75\%$).
      </div>
    </div>
  );
}