import React from 'react';

export default function Profile({ dashboardData }) {
  return (
    <div className="generic-card">
      <h2 style={{ margin: '0 0 1.5rem 0', fontSize: '1.125rem' }}>Student Profile Workspace</h2>
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#4f46e5', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>AK</div>
        <div>
          <h3 style={{ margin: 0 }}>{dashboardData.name}</h3>
          <p style={{ margin: 0, color: '#64748b' }}>CSE Department Undergrad</p>
        </div>
      </div>
      <p style={{ margin: '0.5rem 0' }}><strong>Account Role:</strong> {dashboardData.role}</p>
      <p style={{ margin: '0.5rem 0' }}><strong>Performance Standing Status:</strong> {dashboardData.performance_status}</p>
    </div>
  );
}