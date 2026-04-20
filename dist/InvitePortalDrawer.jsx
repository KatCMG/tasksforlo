/* Invite to Home Portal — Right-side drawer */

function InvitePortalDrawer({ open, onClose }) {
  const [borrowers, setBorrowers] = React.useState([
    { id: 'jack', name: 'Jack Smith', email: 'jack.smith@email.com', phone: '(555) 201-4567', invited: true, selected: false },
    { id: 'jane', name: 'Jane Smith', email: 'jane.smith@email.com', phone: '(555) 201-4567', invited: false, selected: false },
    { id: 'bob', name: 'Bob Johnson', email: 'bob.johnson@email.com', phone: '(555) 303-8901', invited: false, selected: false },
  ]);
  const [sending, setSending] = React.useState(false);

  const toggleSelect = (id) => {
    setBorrowers(prev => prev.map(b => b.id === id ? { ...b, selected: !b.selected } : b));
  };

  const anySelected = borrowers.some(b => b.selected && !b.invited);

  const handleSend = () => {
    setSending(true);
    setTimeout(() => {
      setBorrowers(prev => prev.map(b => b.selected ? { ...b, invited: true, selected: false } : b));
      setSending(false);
    }, 1000);
  };

  if (!open) return null;

  return (
    <React.Fragment>
      {/* Backdrop */}
      <div style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)',
        zIndex: 400,
      }} onClick={onClose} />

      {/* Drawer */}
      <div style={{
        position: 'fixed', top: 0, right: 0, height: '100vh', width: 360,
        background: '#fff', zIndex: 401, display: 'flex', flexDirection: 'column',
        boxShadow: '-4px 0 24px rgba(0,0,0,0.14)',
        fontFamily: "'Open Sans', sans-serif",
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 20px', borderBottom: '1px solid #E4E4E4', flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <i className="pi pi-sparkles" style={{ fontSize: 14, color: '#047880' }} />
            <span style={{ fontSize: 14, fontWeight: 700, color: '#171D22' }}>Invite to Home Portal</span>
          </div>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#717980', padding: 4, borderRadius: 4,
          }}>
            <i className="pi pi-times" style={{ fontSize: 13 }} />
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#171D22', marginBottom: 4, borderBottom: '1px solid #E4E4E4', paddingBottom: 10 }}>
            Borrowers
          </div>
          <div style={{ fontSize: 12, color: '#717980', marginBottom: 16, marginTop: 8 }}>
            Select borrowers to send a Home Portal access invitation.
          </div>

          {/* Borrower list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {borrowers.map((b, i) => (
              <div key={b.id} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '14px 12px',
                borderBottom: i < borrowers.length - 1 ? '1px solid #F4F4F5' : 'none',
                background: b.selected ? '#F7FAFA' : '#fff',
                borderRadius: 4,
              }}>
                <input
                  type="checkbox"
                  checked={b.selected}
                  onChange={() => toggleSelect(b.id)}
                  disabled={b.invited}
                  style={{ width: 16, height: 16, accentColor: '#32A4AC', cursor: b.invited ? 'not-allowed' : 'pointer', flexShrink: 0 }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#171D22' }}>{b.name}</div>
                  <div style={{ fontSize: 12, color: '#717980', marginTop: 1 }}>{b.email}</div>
                  <div style={{ fontSize: 12, color: '#717980' }}>{b.phone}</div>
                </div>
                {b.invited ? (
                  <span style={{
                    padding: '3px 10px', borderRadius: 4,
                    background: '#047880', color: '#fff',
                    fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap',
                  }}>Invite Sent</span>
                ) : (
                  <span style={{
                    fontSize: 11, fontWeight: 600, color: '#9DA2A6', whiteSpace: 'nowrap',
                  }}>Not Invited</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
          gap: 10, padding: '14px 20px', borderTop: '1px solid #E4E4E4', flexShrink: 0,
        }}>
          <button onClick={onClose} style={{
            padding: '8px 20px', border: '1.5px solid #CBCED1', borderRadius: 5,
            background: '#fff', fontFamily: "'Open Sans', sans-serif",
            fontSize: 12, fontWeight: 600, color: '#555D64', cursor: 'pointer',
          }}>Cancel</button>
          <button onClick={handleSend} disabled={!anySelected || sending} style={{
            padding: '8px 20px', border: 'none', borderRadius: 5,
            background: anySelected && !sending ? '#047880' : '#9DA2A6',
            color: '#fff', fontFamily: "'Open Sans', sans-serif",
            fontSize: 12, fontWeight: 700, cursor: anySelected && !sending ? 'pointer' : 'not-allowed',
          }}>
            {sending ? 'Sending...' : 'Send Invitation'}
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

Object.assign(window, { InvitePortalDrawer });
