import React from 'react';

export default function CGPAPrediction({ dashboardData }) {
  return (
    <div className="generic-card">
      <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem' }}>Machine Learning CGPA Projection Terminal</h2>
      <div style={{ padding: '1.25rem', background: '#f5f3ff', border: '1px solid #ddd6fe', borderRadius: '0.75rem', color: '#6d28d9', marginTop: '0.5rem' }}>
        <strong>Calculated Next Semester Prediction Score:</strong> {dashboardData.predicted_cgpa}
      </div>
      <p style={{ fontSize: '0.8125rem', color: '#475569', marginTop: '1rem', lineHeight: '1.6' }}>
        The data science pipeline leverages the Scikit-Learn dynamic independent variables regression framework, plotting target trend patterns derived from cumulative semester sequences.
      </p>
    </div>
  );
}