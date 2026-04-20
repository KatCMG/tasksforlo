/* Create Task Drawer — Full implementation per spec */

const BORROWERS = [
  { id: 'jack', name: 'Jack Smith', role: 'Borrower', code: 'B1', badge: 'CX' },
  { id: 'jane', name: 'Jane Smith', role: 'Co-Borrower', code: 'CB1', badge: 'CX' },
];

const DOCUMENTS = {
  'Clear Docs': [
    { id: 'clear_1003', name: '1003 Loan Application' },
    { id: 'clear_cd', name: 'Closing Disclosure' },
    { id: 'clear_le', name: 'Loan Estimate' },
    { id: 'clear_urla', name: 'URLA' },
  ],
  'Borrower Documents': [
    { id: 'w2_2023', name: 'W-2 2023' },
    { id: 'bank_jan', name: 'Bank Statement – January 2024' },
    { id: 'tax_2023', name: 'Tax Return 2023' },
    { id: 'paystub', name: 'Pay Stub – Most Recent' },
  ],
};

const DOC_TITLE_MAP = {};
Object.values(DOCUMENTS).flat().forEach(d => { DOC_TITLE_MAP[d.id] = 'Review ' + d.name; });

function CreateTaskDrawer({ open, onClose, onCreateTask, showToast }) {
  const [taskType, setTaskType] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [document, setDocument] = React.useState('');
  const [confirmQ, setConfirmQ] = React.useState('');
  const [textQ, setTextQ] = React.useState('');
  const [selectedBorrowers, setSelectedBorrowers] = React.useState({});
  const [dueDate, setDueDate] = React.useState('');
  const [errors, setErrors] = React.useState({});
  const [submitting, setSubmitting] = React.useState(false);
  const [showBorrowerDD, setShowBorrowerDD] = React.useState(false);
  const [toastMsg, setToastMsg] = React.useState('');
  const [errorToast, setErrorToast] = React.useState('');

  const reset = (keepTypeAndDate) => {
    if (!keepTypeAndDate) { setTaskType(''); setDueDate(''); }
    setTitle(keepTypeAndDate && taskType === 'document_delivery' ? 'Review Document' : '');
    setDesc(''); setDocument(''); setConfirmQ(''); setTextQ('');
    setSelectedBorrowers({}); setErrors({}); setErrorToast('');
  };

  React.useEffect(() => { if (open) reset(false); }, [open]);

  const handleTypeChange = (val) => {
    setTaskType(val);
    setDocument(''); setConfirmQ(''); setTextQ('');
    setErrors({});
    if (val === 'document_delivery') setTitle('Review Document');
    else setTitle('');
  };

  const handleDocChange = (val) => {
    setDocument(val);
    if (val && DOC_TITLE_MAP[val]) setTitle(DOC_TITLE_MAP[val]);
  };

  const toggleBorrower = (id) => {
    setSelectedBorrowers(prev => {
      const next = { ...prev };
      if (next[id]) delete next[id];
      else next[id] = BORROWERS.find(b => b.id === id);
      return next;
    });
  };

  const validate = () => {
    const e = {};
    if (!taskType || taskType === 'ad_hoc_esign') e.taskType = 'Task type is required.';
    if (!title.trim()) e.title = 'Title is required.';
    if (taskType === 'document_delivery' && !document) e.document = 'Please select a document.';
    if (taskType === 'ad_hoc_confirmation' && !confirmQ.trim()) e.confirmQ = 'Question is required.';
    if (taskType === 'ad_hoc_text_response' && !textQ.trim()) e.textQ = 'Question is required.';
    if (Object.keys(selectedBorrowers).length === 0) e.borrowers = 'At least one borrower is required.';
    if (!dueDate) e.dueDate = 'Due date is required.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (addAnother) => {
    if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      const success = Math.random() > 0.15;
      if (success) {
        const assigneeNames = Object.values(selectedBorrowers).map(b => `${b.name} (${b.role})`).join(', ');
        const typeLabels = { document_delivery: 'Doc Request', ad_hoc_confirmation: 'Confirmation', ad_hoc_text_response: 'Text Response' };
        onCreateTask({
          title, desc, assignee: assigneeNames,
          type: typeLabels[taskType] || taskType,
          due: new Date(dueDate + 'T00:00:00').toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }),
        });
        if (addAnother) {
          reset(true);
          setToastMsg('Task created. Add another.');
          setTimeout(() => setToastMsg(''), 2000);
        } else {
          onClose();
          if (showToast) showToast('Task created successfully.');
        }
      } else {
        setErrorToast('Something went wrong. Please try again.');
      }
    }, 1200);
  };

  // Unsaved check
  const hasChanges = taskType || title.trim() || desc.trim() || Object.keys(selectedBorrowers).length > 0 || dueDate;
  const [showUnsaved, setShowUnsaved] = React.useState(false);

  const handleClose = () => {
    if (hasChanges) setShowUnsaved(true);
    else onClose();
  };

  const inputStyle = (hasError) => ({
    width: '100%', padding: '8px 10px', border: `1px solid ${hasError ? '#EB1000' : '#CBCED1'}`,
    borderRadius: 6, fontFamily: "'Open Sans', sans-serif", fontSize: 12,
    color: '#171D22', background: '#fff', outline: 'none', boxSizing: 'border-box',
  });
  const selectStyle = (hasError) => ({
    ...inputStyle(hasError), paddingRight: 30, appearance: 'none', WebkitAppearance: 'none',
  });
  const labelStyle = { fontSize: 12, fontWeight: 600, color: '#171D22', marginBottom: 5, display: 'block' };
  const errorStyle = { fontSize: 11, color: '#EB1000', marginTop: 3 };

  if (!open) return null;

  return (
    <React.Fragment>
      {/* Backdrop */}
      <div style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)',
        zIndex: 100, transition: 'opacity 0.2s',
      }} onClick={handleClose} />

      {/* Drawer */}
      <div style={{
        position: 'fixed', top: 0, right: 0, height: '100vh', width: 440,
        background: '#fff', zIndex: 101, display: 'flex', flexDirection: 'column',
        boxShadow: '-4px 0 24px rgba(0,0,0,0.14)',
        fontFamily: "'Open Sans', sans-serif",
      }}>
        {/* Loading overlay */}
        {submitting && (
          <div style={{
            position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.85)',
            zIndex: 10, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 10,
          }}>
            <div style={{
              width: 28, height: 28, border: '3px solid #D1EDEF',
              borderTopColor: '#32A4AC', borderRadius: '50%',
              animation: 'ctspin 0.7s linear infinite',
            }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: '#555D64' }}>Creating task…</span>
          </div>
        )}

        {/* Error toast */}
        {errorToast && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '10px 16px', background: '#FFF5F5',
            borderBottom: '1px solid #FFE0DF', fontSize: 12, color: '#C00B14',
          }}>
            <i className="pi pi-exclamation-circle" style={{ fontSize: 13 }} />
            {errorToast}
            <button onClick={() => setErrorToast('')} style={{
              marginLeft: 'auto', background: 'none', border: 'none',
              cursor: 'pointer', color: 'inherit',
            }}>
              <i className="pi pi-times" style={{ fontSize: 10 }} />
            </button>
          </div>
        )}

        {/* Success toast */}
        {toastMsg && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '10px 16px', background: '#ECFAE8',
            borderBottom: '1px solid #C8E8C3', fontSize: 12, color: '#1A760B',
          }}>
            <i className="pi pi-check-circle" style={{ fontSize: 13 }} />
            {toastMsg}
          </div>
        )}

        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 20px', borderBottom: '1px solid #E4E4E4', flexShrink: 0,
        }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: '#171D22' }}>Create Task</span>
          <button onClick={handleClose} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#717980', padding: 4, borderRadius: 4,
          }}>
            <i className="pi pi-times" style={{ fontSize: 13 }} />
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Task Type */}
          <div>
            <label style={labelStyle}>Task Type <span style={{ color: '#EB1000' }}>*</span></label>
            <div style={{ position: 'relative' }}>
              <select value={taskType} onChange={e => handleTypeChange(e.target.value)}
                style={selectStyle(errors.taskType)}>
                <option value="">Select task type</option>
                <option value="document_delivery">Document Delivery</option>
                <option value="ad_hoc_confirmation">Ad Hoc Confirmation</option>
                <option value="ad_hoc_text_response">Ad Hoc Text Response</option>
                <option value="ad_hoc_esign" disabled>Ad Hoc E-Sign (coming soon)</option>
              </select>
              <i className="pi pi-chevron-down" style={{
                position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                fontSize: 11, color: '#717980', pointerEvents: 'none',
              }} />
            </div>
            {errors.taskType && <div style={errorStyle}>{errors.taskType}</div>}
          </div>

          {/* Title */}
          <div>
            <label style={labelStyle}>Title <span style={{ color: '#EB1000' }}>*</span></label>
            <input value={title} onChange={e => setTitle(e.target.value)}
              placeholder="Enter task title" maxLength={120} style={inputStyle(errors.title)} />
            {errors.title && <div style={errorStyle}>{errors.title}</div>}
          </div>

          {/* Description */}
          <div>
            <label style={labelStyle}>Description</label>
            <textarea value={desc} onChange={e => setDesc(e.target.value)}
              placeholder="Provide a description for this task" maxLength={250}
              style={{ ...inputStyle(false), resize: 'vertical', minHeight: 80 }} />
            <div style={{ textAlign: 'right', fontSize: 11, color: '#717980', marginTop: 2 }}>
              {desc.length}/250 character limit
            </div>
          </div>

          {/* Document Delivery: Select Document */}
          {taskType === 'document_delivery' && (
            <div>
              <label style={labelStyle}>Select Document <span style={{ color: '#EB1000' }}>*</span></label>
              <div style={{ position: 'relative' }}>
                <select value={document} onChange={e => handleDocChange(e.target.value)}
                  style={selectStyle(errors.document)}>
                  <option value="">Select a document</option>
                  {Object.entries(DOCUMENTS).map(([group, docs]) => (
                    <optgroup key={group} label={group}>
                      {docs.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                    </optgroup>
                  ))}
                </select>
                <i className="pi pi-chevron-down" style={{
                  position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                  fontSize: 11, color: '#717980', pointerEvents: 'none',
                }} />
              </div>
              {errors.document && <div style={errorStyle}>{errors.document}</div>}
            </div>
          )}

          {/* Ad Hoc Confirmation */}
          {taskType === 'ad_hoc_confirmation' && (
            <div>
              <label style={labelStyle}>Yes/No Question <span style={{ color: '#EB1000' }}>*</span></label>
              <textarea value={confirmQ} onChange={e => setConfirmQ(e.target.value)}
                placeholder="Enter the yes/no question for the borrower…" maxLength={500}
                style={{ ...inputStyle(errors.confirmQ), resize: 'vertical', minHeight: 80 }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4, fontSize: 11, color: '#717980' }}>
                <i className="pi pi-info-circle" style={{ fontSize: 10 }} />
                The borrower will see a yes/no toggle to respond to this question.
              </div>
              {errors.confirmQ && <div style={errorStyle}>{errors.confirmQ}</div>}
            </div>
          )}

          {/* Ad Hoc Text Response */}
          {taskType === 'ad_hoc_text_response' && (
            <div>
              <label style={labelStyle}>Open-ended Question <span style={{ color: '#EB1000' }}>*</span></label>
              <textarea value={textQ} onChange={e => setTextQ(e.target.value)}
                placeholder="Enter the question for the borrower…" maxLength={500}
                style={{ ...inputStyle(errors.textQ), resize: 'vertical', minHeight: 80 }} />
              {errors.textQ && <div style={errorStyle}>{errors.textQ}</div>}
            </div>
          )}

          {/* E-Sign disabled note */}
          {taskType === 'ad_hoc_esign' && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '8px 10px',
              background: '#F4F4F5', borderRadius: 6, fontSize: 11, color: '#717980',
            }}>
              <i className="pi pi-lock" style={{ fontSize: 12 }} />
              E-Sign task creation is coming soon and is not yet available.
            </div>
          )}

          {/* Assign To */}
          <div>
            <label style={labelStyle}>Assign To <span style={{ color: '#EB1000' }}>*</span></label>
            <div
              onClick={() => setShowBorrowerDD(!showBorrowerDD)}
              style={{
                ...inputStyle(errors.borrowers), padding: '6px 8px', minHeight: 40,
                display: 'flex', flexWrap: 'wrap', gap: 5, alignItems: 'center',
                cursor: 'pointer', position: 'relative',
              }}>
              {Object.keys(selectedBorrowers).length === 0 && (
                <span style={{ color: '#9DA2A6', fontSize: 12 }}>Select borrower(s)</span>
              )}
              {Object.values(selectedBorrowers).map(b => (
                <span key={b.id} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  padding: '2px 6px 2px 8px', background: '#EAF6F7',
                  border: '1px solid #D1EDEF', borderRadius: 20,
                  fontSize: 11, fontWeight: 600, color: '#047880',
                }}>
                  {b.name} ({b.role})
                  <button onClick={(e) => { e.stopPropagation(); toggleBorrower(b.id); }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#047880', padding: 0, display: 'flex' }}>
                    <i className="pi pi-times" style={{ fontSize: 9 }} />
                  </button>
                </span>
              ))}

              {/* Dropdown */}
              {showBorrowerDD && (
                <div onClick={e => e.stopPropagation()} style={{
                  position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0,
                  background: '#fff', border: '1px solid #CBCED1', borderRadius: 6,
                  boxShadow: '0 3px 12px rgba(0,0,0,0.12)', zIndex: 10, overflow: 'hidden',
                }}>
                  {BORROWERS.map(b => (
                    <div key={b.id} onClick={() => toggleBorrower(b.id)}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '9px 12px', cursor: 'pointer', fontSize: 12,
                        background: selectedBorrowers[b.id] ? '#EAF6F7' : '#fff',
                      }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{
                          fontSize: 9, fontWeight: 700, padding: '1px 5px', borderRadius: 3,
                          background: '#32A4AC', color: '#fff',
                        }}>{b.badge}</span>
                        {b.name} ({b.role})
                      </div>
                      {selectedBorrowers[b.id] && (
                        <i className="pi pi-check" style={{ fontSize: 11, color: '#32A4AC' }} />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {errors.borrowers && <div style={errorStyle}>{errors.borrowers}</div>}
          </div>

          {/* Due Date */}
          <div>
            <label style={labelStyle}>Due Date <span style={{ color: '#EB1000' }}>*</span></label>
            <div style={{ position: 'relative' }}>
              <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)}
                style={{ ...inputStyle(errors.dueDate), paddingRight: 32 }} />
              <i className="pi pi-calendar" style={{
                position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                fontSize: 13, color: '#32A4AC', pointerEvents: 'none',
              }} />
            </div>
            {errors.dueDate && <div style={errorStyle}>{errors.dueDate}</div>}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
          gap: 8, padding: '12px 20px', borderTop: '1px solid #E4E4E4', flexShrink: 0,
        }}>
          <button onClick={handleClose} disabled={submitting} style={{
            background: 'none', border: 'none', padding: '7px 14px',
            fontFamily: "'Open Sans', sans-serif", fontSize: 12, fontWeight: 600,
            color: '#555D64', cursor: 'pointer', borderRadius: 5,
          }}>Cancel</button>
          <button onClick={() => submit(true)} disabled={submitting || !taskType} style={{
            padding: '7px 14px', border: '1.5px solid #32A4AC', borderRadius: 5,
            background: '#fff', fontFamily: "'Open Sans', sans-serif",
            fontSize: 12, fontWeight: 600, color: '#32A4AC', cursor: 'pointer',
            opacity: (!taskType || submitting) ? 0.5 : 1,
          }}>Create & add another</button>
          <button onClick={() => submit(false)} disabled={submitting || !taskType} style={{
            padding: '7px 16px', border: 'none', borderRadius: 5,
            background: '#047880', color: '#fff',
            fontFamily: "'Open Sans', sans-serif", fontSize: 12, fontWeight: 700,
            cursor: 'pointer', opacity: (!taskType || submitting) ? 0.5 : 1,
          }}>
            {submitting ? 'Creating...' : 'Create Task'}
          </button>
        </div>
      </div>

      {/* Unsaved changes dialog */}
      {showUnsaved && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
          zIndex: 600, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            background: '#fff', borderRadius: 10, width: 380, padding: 24,
            boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
            fontFamily: "'Open Sans', sans-serif",
          }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#171D22', marginBottom: 8 }}>
              Discard unsaved changes?
            </div>
            <div style={{ fontSize: 13, color: '#555D64', lineHeight: '20px', marginBottom: 16 }}>
              You have unsaved changes in this form. If you leave now, your progress will be lost.
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <button onClick={() => setShowUnsaved(false)} style={{
                padding: '7px 14px', border: '1.5px solid #CBCED1', borderRadius: 5,
                background: '#fff', fontFamily: "'Open Sans', sans-serif",
                fontSize: 12, fontWeight: 600, color: '#555D64', cursor: 'pointer',
              }}>Keep Editing</button>
              <button onClick={() => { setShowUnsaved(false); onClose(); }} style={{
                padding: '7px 14px', border: 'none', borderRadius: 5,
                background: '#EB1000', color: '#fff',
                fontFamily: "'Open Sans', sans-serif", fontSize: 12, fontWeight: 700, cursor: 'pointer',
              }}>Discard Changes</button>
            </div>
          </div>
        </div>
      )}

      <style>{`@keyframes ctspin { to { transform: rotate(360deg); } }`}</style>
    </React.Fragment>
  );
}

Object.assign(window, { CreateTaskDrawer });
