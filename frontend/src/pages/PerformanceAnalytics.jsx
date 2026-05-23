import React from 'react';

export default function PerformanceAnalytics({ dashboardData }) {
  return (
    <div className="generic-card">
      <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem' }}>Modular Subject Assessment Score Breakdown Matrix</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>Subject Title</th>
            <th>Internal Raw Mark Data</th>
            <th>Derived System Grade Status</th>
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
  );
}