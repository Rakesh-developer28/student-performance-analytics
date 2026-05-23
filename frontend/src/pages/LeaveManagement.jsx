import React, { useState } from 'react';
import { Plus, X, CheckCircle } from 'lucide-react';

export default function LeaveManagement({ dashboardData }) {
  const [showModal, setShowModal] = useState(false);
  const [leaveDate, setLeaveDate] = useState('');
  const [leaveReason, setLeaveReason] = useState('');
  const [localLeaves, setLocalLeaves] = useState([
    { date: '2026-04-12', reason: 'Institutional Symposium Delegation', status: 'APPROVED', color: '#166534', bg: '#d1fae5' },
    { date: '2026-05-24', reason: 'Medical Assessment Diagnostics', status: 'PENDING', color: '#9a3412', bg: '#ffedd5' }
  ]);
  const [success, setSuccess] = useState('');

  // Helper utility tool mapping string dates into readable output formats
  const formatReadableDate = (rawDateString) => {
    if (!rawDateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateObj = new Date(rawDateString);
    return isNaN(dateObj) ? rawDateString : dateObj.toLocaleDateString('en-US', options);
  };

  const handleApplyLeave = (e) => {
    e.preventDefault();
    if (!leaveDate || !leaveReason) return;

    const newLeave = {
      date: leaveDate, // Holds standard programmatic layout (YYYY-MM-DD) natively
      reason: leaveReason,
      status: 'PENDING',
      color: '#9a3412',
      bg: '#ffedd5'
    };

    setLocalLeaves([newLeave, ...localLeaves]);
    setSuccess('Leave application registered successfully!');
    setLeaveDate('');
    setLeaveReason('');
    
    setTimeout(() => {
      setSuccess('');
      setShowModal(false);
    }, 2000);
  };

  return (
    <div className="generic-card" style={{ position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '700' }}>Leave Management Applications Status Registry</h2>
          <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.75rem', color: '#64748b' }}>
            Active parameters locate <strong>{localLeaves.filter(l => l.status === 'PENDING').length}</strong> unresolved leave workflows.
          </p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#4f46e5', color: 'white', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '0.75rem', fontSize: '0.8125rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}
          className="hover:bg-indigo-700"
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
                <span style={{ color: leave.color, background: leave.bg, padding: '0.25rem 0.6rem', borderRadius: '0.375rem', fontWeight: '700', fontSize: '10px', letterSpacing: '0.05em' }}>
                  {leave.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Leave Application Modal Popup Window */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '1.25rem', width: '100%', maxWidth: '450px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.15)', position: 'relative', boxSizing: 'border-box' }}>
            <button onClick={() => setShowModal(false)} style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
              <X size={20} />
            </button>
            
            <h3 style={{ margin: '0 0 1.25rem 0', fontSize: '1.125rem', fontWeight: '700', color: '#0f172a' }}>Submit Leave Request</h3>
            
            {success && (
              <div style={{ background: '#d1fae5', border: '1px solid #34d399', padding: '0.75rem', borderRadius: '0.5rem', color: '#065f46', fontSize: '12px', marginBottom: '1rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle size={14} /> {success}
              </div>
            )}

            <form onSubmit={handleApplyLeave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '0.35rem' }}>Select Target Date</label>
                <input 
                  type="date" // Updated to standard calendar input view format
                  value={leaveDate} 
                  onChange={e => setLeaveDate(e.target.value)} 
                  className="input-element" 
                  style={{ paddingLeft: '1rem', paddingRight: '1rem', cursor: 'pointer' }}
                  required 
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '0.35rem' }}>Reason for Absence</label>
                <input 
                  type="text" 
                  placeholder="e.g. Medical Consultation appointment" 
                  value={leaveReason} 
                  onChange={e => setLeaveReason(e.target.value)} 
                  className="input-element" 
                  style={{ paddingLeft: '1rem' }}
                  required 
                />
              </div>
              <button type="submit" className="primary-btn" style={{ marginTop: '0.5rem' }}>Submit Leave Request</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}