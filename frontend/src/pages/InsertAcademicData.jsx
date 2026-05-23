import React, { useState } from 'react';

export default function InsertAcademicData({ authEmail, onRecordAdded }) {
  const [subject, setSubject] = useState('');
  const [marks, setMarks] = useState('');
  const [grade, setGrade] = useState('F');
  const [success, setSuccess] = useState('');

  // Automatic Grade Calculation Function Mapping Scale Criteria
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
    setMarks(scoreValue);
    // Dynamically calculate and select the grade matching your project requirements
    const calculatedGrade = calculateAutoGrade(scoreValue);
    setGrade(calculatedGrade);
  };

  const submitForm = (e) => {
    e.preventDefault();
    setSuccess('');

    fetch('http://127.0.0.1:5001/api/student/add_marks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: authEmail, subject, marks: `${marks}/100`, grade })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setSuccess('New scorecard value committed to core database tables cleanly.');
        setSubject('');
        setMarks('');
        setGrade('F');
        onRecordAdded();
      }
    });
  };

  return (
    <div className="generic-card" style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: '700' }}>Append New Academic Record</h2>
      {success && <div style={{ background: '#d1fae5', border: '1px solid #34d399', padding: '0.75rem', borderRadius: '0.5rem', color: '#065f46', fontSize: '12px', marginBottom: '1rem', fontWeight: '600' }}>{success}</div>}
      
      <form onSubmit={submitForm} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '0.35rem' }}>Subject Name</label>
          <input type="text" placeholder="e.g. Artificial Intelligence" value={subject} onChange={e => setSubject(e.target.value)} className="input-element" style={{ paddingLeft: '1rem' }} required />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '0.35rem' }}>Raw Mark Assessment Score (Out of 100)</label>
          <input 
            type="number" 
            min="0" 
            max="100" 
            placeholder="e.g. 94" 
            value={marks} 
            onChange={handleMarksInputChange} 
            className="input-element" 
            style={{ paddingLeft: '1rem' }} 
            required 
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '0.35rem' }}>
            System Calculated Grade Status (Auto-Generated)
          </label>
          <div style={{ 
            padding: '0.875rem 1rem', 
            background: '#f1f5f9', 
            borderRadius: '0.75rem', 
            fontSize: '0.875rem', 
            fontWeight: '800', 
            color: grade === 'F' ? '#ef4444' : '#166534',
            border: '1px solid #cbd5e1'
          }}>
            {grade} {grade !== 'F' ? ' (Calculated Scale Match)' : ''}
          </div>
        </div>
        <button type="submit" className="primary-btn">Submit Metric Log</button>
      </form>
    </div>
  );
}