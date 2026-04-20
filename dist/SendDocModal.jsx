/* Send Doc Requests — Right-side drawer (2-step) */

function SendDocModal({ open, onClose, onSuccess }) {
  const [step, setStep] = React.useState(1);
  const [selected, setSelected] = React.useState({ 4: true, 5: true, 6: true, 7: true });
  const [sending, setSending] = React.useState(false);

  React.useEffect(() => { if (open) { setStep(1); setSending(false); } }, [open]);

  if (!open) return null;

  const docRequests = [
    { id: 4, code: 'APP-004', borrower: 'B1', borrowerName: 'Jack Smith', title: 'Explain Recent Credit Inquiry', desc: 'Letter of explanation for credit inquiries in the last 120 days', docType: 'Credit Report', docDesc: 'Please provide a written letter of explanation for each credit inquiry appearing on your credit report within...', status: 'Requested', date: '04/14/2026' },
    { id: 5, code: 'APP-005', borrower: 'B1', borrowerName: 'Jack Smith', title: 'Explain Employment Gap (30+ Days)', desc: 'Written explanation for any employment gaps exceeding 30 days', docType: 'Employment Verification', docDesc: 'Please provide a letter of explanation for any gaps in employment exceeding 30 days within the last two years.', status: 'Requested', date: '04/14/2026' },
    { id: 7, code: 'APP-007', borrower: 'B1', borrowerName: 'Jack Smith', title: 'Review Large Deposit Documentation', desc: 'Source and documentation of all large deposits', docType: 'Bank Statements', docDesc: 'Please provide documentation for all large deposits appearing on your most recent bank statements, including the...', status: 'Requested', date: '04/14/2026' },
    { id: 6, code: 'APP-006', borrower: 'CB1', borrowerName: 'Jane Smith', title: 'Confirm Changes in Marital Status', desc: 'Documentation confirming any recent marital status changes', docType: 'Miscellaneous', docDesc: 'Please confirm any changes in marital status since the initial application, along with supporting documentation...', status: 'Requested', date: '04/14/2026' },
  ];

  const selectedCount = Object.values(selected).filter(Boolean).length;
  const toggleSelect = (id) => setSelected(p => ({ ...p, [id]: !p[id] }));

  const selectedDocs = docRequests.filter(d => selected[d.id]);

  // Group by borrower
  const grouped = {};
  docRequests.forEach(d => {
    const key = d.borrower + ' ' + d.borrowerName;
    if (!grouped[key]) grouped[key] = { borrower: d.borrower, name: d.borrowerName, docs: [] };
    grouped[key].docs.push(d);
  });

  const handleSend = () => {
    setSending(true);
    setTimeout(() => { onClose(); if (onSuccess) onSuccess(); }, 1200);
  };

  const drawerWidth = step === 1 ? 560 : 520;

  return (
    <React.Fragment>
      {/* Backdrop */}
      <div style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)',
        zIndex: 300,
      }} onClick={onClose} />

      {/* Drawer */}
      <div style={{
        position: 'fixed', top: 0, right: 0, height: '100vh', width: drawerWidth,
        maxWidth: '96vw', background: '#fff', zIndex: 301,
        display: 'flex', flexDirection: 'column',
        boxShadow: '-4px 0 24px rgba(0,0,0,0.14)',
        fontFamily: "'Open Sans', sans-serif",
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 20px', borderBottom: '1px solid #E4E4E4', flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {step === 2 && (
              <button onClick={() => setStep(1)} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#555D64', display: 'flex', alignItems: 'center', gap: 4,
                fontFamily: "'Open Sans', sans-serif", fontSize: 12, fontWeight: 600,
              }}>
                <i className="pi pi-arrow-left" style={{ fontSize: 11 }} /> Back
              </button>
            )}
            <span style={{ fontSize: 13, fontWeight: 700, color: '#171D22' }}>
              {step === 1
                ? 'Step 1 of 2: Select and Edit Document Requests'
                : 'Step 2 of 2: Send Borrower Doc Request Email'}
            </span>
          </div>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#717980', padding: 4, borderRadius: 4,
          }}>
            <i className="pi pi-times" style={{ fontSize: 13 }} />
          </button>
        </div>

        {/* Recipient */}
        <div style={{ padding: '8px 20px 0', fontSize: 12, color: '#555D64' }}>
          <span style={{ fontWeight: 600 }}>Recipient:</span> Borrower
        </div>

        {/* Content */}
        {step === 1 ? (
          <SDRStep1 grouped={grouped} selected={selected} toggleSelect={toggleSelect}
            docRequests={docRequests} selectedCount={selectedCount} />
        ) : (
          <SDRStep2 selectedDocs={selectedDocs} sending={sending} />
        )}

        {/* Footer */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
          gap: 10, padding: '12px 20px', borderTop: '1px solid #E4E4E4', flexShrink: 0,
        }}>
          {step === 1 && (
            <span style={{ flex: 1, fontSize: 11, color: '#717980' }}>
              Selected {selectedCount} of {docRequests.length} Doc Requests
            </span>
          )}
          {step === 2 && (
            <button onClick={() => setStep(1)} style={{
              padding: '7px 14px', border: '1.5px solid #CBCED1', borderRadius: 5,
              background: '#fff', fontFamily: "'Open Sans', sans-serif",
              fontSize: 12, fontWeight: 600, color: '#555D64', cursor: 'pointer',
            }}>
              <i className="pi pi-arrow-left" style={{ fontSize: 10, marginRight: 4 }} /> Back
            </button>
          )}
          <button onClick={onClose} style={{
            padding: '7px 14px', background: 'none', border: 'none',
            fontFamily: "'Open Sans', sans-serif", fontSize: 12, fontWeight: 600,
            color: '#555D64', cursor: 'pointer',
          }}>
            {step === 1 ? 'Save & Close' : 'Cancel'}
          </button>
          {step === 1 ? (
            <button onClick={() => setStep(2)} disabled={selectedCount === 0} style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '8px 18px', border: 'none', borderRadius: 20,
              background: selectedCount > 0 ? '#047880' : '#9DA2A6',
              color: '#fff', fontFamily: "'Open Sans', sans-serif",
              fontSize: 12, fontWeight: 700, cursor: selectedCount > 0 ? 'pointer' : 'not-allowed',
            }}>
              Add to Email <i className="pi pi-arrow-right" style={{ fontSize: 10 }} />
            </button>
          ) : (
            <button onClick={handleSend} disabled={sending} style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '8px 18px', border: 'none', borderRadius: 20,
              background: '#047880', color: '#fff',
              fontFamily: "'Open Sans', sans-serif", fontSize: 12, fontWeight: 700,
              cursor: 'pointer', opacity: sending ? 0.7 : 1,
            }}>
              {sending ? 'Sending...' : 'Send Request'}
              {!sending && <i className="pi pi-arrow-right" style={{ fontSize: 10 }} />}
            </button>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

/* ── Step 1: Select & Edit Docs ── */
function SDRStep1({ grouped, selected, toggleSelect, docRequests, selectedCount }) {
  return (
    <div style={{ flex: 1, overflow: 'auto' }}>
      <div style={{ padding: '8px 20px 10px', fontSize: 12, color: '#717980' }}>
        Please select at least one document request to add to the email.
      </div>

      {/* Filter list */}
      <div style={{ padding: '0 20px 12px' }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#555D64', marginBottom: 5 }}>Filter List</div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 5, flexWrap: 'wrap',
          border: '1px solid #CED4DA', borderRadius: 5, padding: '6px 10px',
        }}>
          {['B1: Jack Smith', 'CB1: Jana Smith'].map((t, i) => (
            <span key={i} style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              padding: '3px 6px 3px 10px', background: '#EAF6F7',
              border: '1px solid #D1EDEF', borderRadius: 4,
              fontSize: 11, fontWeight: 600, color: '#047880',
            }}>
              {t}
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#047880', fontSize: 9, padding: '0 2px' }}>
                <i className="pi pi-times" style={{ fontSize: 8 }} />
              </button>
            </span>
          ))}
          <div style={{ flex: 1 }} />
          <i className="pi pi-chevron-down" style={{ fontSize: 11, color: '#717980', cursor: 'pointer' }} />
        </div>
      </div>

      {/* Grouped doc request cards */}
      {Object.values(grouped).map((group, gi) => (
        <div key={gi}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 20px', background: '#F4F4F5',
            borderTop: '1px solid #E4E4E4', borderBottom: '1px solid #E4E4E4',
            fontSize: 12, fontWeight: 700, color: '#171D22',
          }}>APP 1</div>

          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 20px', borderBottom: '1px solid #F4F4F5',
          }}>
            <div style={{
              width: 22, height: 22, borderRadius: '50%', background: '#047880',
              color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 9, fontWeight: 700,
            }}>{group.borrower}</div>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#171D22' }}>{group.name}</span>
          </div>

          {group.docs.map(doc => (
            <div key={doc.id} style={{
              display: 'grid', gridTemplateColumns: '32px 64px 1fr 180px',
              gap: 8, padding: '12px 20px', borderBottom: '1px solid #F4F4F5',
              alignItems: 'start', background: selected[doc.id] ? '#fff' : '#FAFAFA',
            }}>
              <div style={{ paddingTop: 2 }}>
                <input type="checkbox" checked={!!selected[doc.id]}
                  onChange={() => toggleSelect(doc.id)}
                  style={{ width: 15, height: 15, accentColor: '#32A4AC', cursor: 'pointer' }} />
              </div>
              <div>
                <span style={{
                  display: 'inline-flex', padding: '3px 6px', borderRadius: 4,
                  background: '#EAF6F7', border: '1px solid #D1EDEF',
                  fontSize: 10, fontWeight: 700, color: '#047880',
                }}>{doc.code}</span>
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#047880', lineHeight: '17px' }}>{doc.title}</div>
                <div style={{ fontSize: 11, color: '#717980', marginTop: 2, lineHeight: '15px' }}>{doc.desc}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <div style={{ position: 'relative' }}>
                  <select defaultValue={doc.docType} style={{
                    width: '100%', padding: '5px 24px 5px 8px', border: '1px solid #CED4DA',
                    borderRadius: 4, fontSize: 11, color: '#171D22', background: '#fff',
                    appearance: 'none', outline: 'none', fontFamily: "'Open Sans', sans-serif",
                  }}>
                    <option>{doc.docType}</option>
                    <option>Credit Report</option>
                    <option>Employment Verification</option>
                    <option>Bank Statements</option>
                    <option>Miscellaneous</option>
                  </select>
                  <i className="pi pi-chevron-down" style={{
                    position: 'absolute', right: 7, top: '50%', transform: 'translateY(-50%)',
                    fontSize: 9, color: '#717980', pointerEvents: 'none',
                  }} />
                </div>
                <textarea defaultValue={doc.docDesc} style={{
                  width: '100%', padding: '5px 8px', border: '1px solid #CED4DA',
                  borderRadius: 4, fontSize: 10, color: '#495057', resize: 'vertical',
                  minHeight: 44, outline: 'none', lineHeight: '14px',
                  fontFamily: "'Open Sans', sans-serif",
                }} />
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, fontSize: 10, color: '#9DA2A6' }}>
                  <span>{doc.status}</span>
                  <span>{doc.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ── Step 2: Compose Email ── */
function SDRStep2({ selectedDocs, sending }) {
  const emailBody = React.useMemo(() => {
    const bullets = selectedDocs.map(d =>
      `<li><strong>${d.docType}:</strong> ${d.docDesc}</li>`
    ).join('\n');
    return `<p>Hello Jack Smith and Jana Smith,</p>
<p>We appreciate your decision to entrust CMG Financial with your home financing needs. Our team is committed to providing you with exceptional service throughout this transaction.</p>
<p>To ensure the timely processing of your application and maintain our projected closing schedule, we kindly request that all documentation be submitted by <strong>May 4, 2026</strong>. Please review each item carefully and provide the requested information at your earliest convenience.</p>
<ul>${bullets}</ul>
<p>Please note: You are not required to provide any of the documents listed or requested unless one of the following applies:</p>
<ol>
<li>You are actively seeking a TBD Preapproval (a preapproval not yet tied to a specific property), or</li>
<li>You have received a Loan Estimate from us and have formally provided your Intent to Proceed with the application.</li>
</ol>`;
  }, [selectedDocs]);

  return (
    <div style={{ flex: 1, overflow: 'auto', padding: '12px 20px' }}>
      {/* Email fields */}
      <div style={{ display: 'grid', gridTemplateColumns: '52px 1fr', gap: '6px 10px', marginBottom: 10, fontSize: 12 }}>
        <span style={{ fontWeight: 600, color: '#171D22', paddingTop: 6 }}>From</span>
        <div style={{ padding: '6px 0', color: '#717980' }}>Patrick Processor (patrick.processor@cmgmortgageloans.com)</div>

        <span style={{ fontWeight: 600, color: '#171D22', paddingTop: 6 }}>To</span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, alignItems: 'center', padding: '4px 0' }}>
          {['jack.smith@email.com', 'jana.smith@email.com'].map((e, i) => (
            <span key={i} style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              padding: '2px 6px 2px 8px', background: '#EAF6F7',
              border: '1px solid #D1EDEF', borderRadius: 20,
              fontSize: 10, fontWeight: 600, color: '#047880',
            }}>
              {e}
              <i className="pi pi-times" style={{ fontSize: 7, cursor: 'pointer' }} />
            </span>
          ))}
          <span style={{ color: '#047880', cursor: 'pointer', fontSize: 12, fontWeight: 700 }}>+</span>
        </div>

        <span style={{ fontWeight: 600, color: '#171D22', paddingTop: 6 }}>CC</span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, alignItems: 'center', padding: '4px 0' }}>
          {['polly@cmgfi.com', 'patrick.processor@cmgloans.com'].map((e, i) => (
            <span key={i} style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              padding: '2px 6px 2px 8px', background: '#F4F4F5',
              border: '1px solid #E4E4E4', borderRadius: 20,
              fontSize: 10, fontWeight: 600, color: '#555D64',
            }}>
              {e}
              <i className="pi pi-times" style={{ fontSize: 7, cursor: 'pointer' }} />
            </span>
          ))}
          <span style={{ color: '#047880', cursor: 'pointer', fontSize: 12, fontWeight: 700 }}>+</span>
        </div>
      </div>

      {/* Subject */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: '#171D22', flexShrink: 0 }}>Subject</span>
        <input defaultValue="Action Required: Outstanding Document Requests" style={{
          flex: 1, padding: '6px 10px', border: '1px solid #CED4DA', borderRadius: 5,
          fontFamily: "'Open Sans', sans-serif", fontSize: 11, color: '#171D22', outline: 'none',
        }} />
        <button style={{
          display: 'inline-flex', alignItems: 'center', gap: 4,
          padding: '4px 8px', border: '1px solid #CED4DA', borderRadius: 4,
          background: '#fff', fontSize: 10, fontWeight: 600, color: '#555D64',
          cursor: 'pointer', fontFamily: "'Open Sans', sans-serif",
        }}>
          <i className="pi pi-paperclip" style={{ fontSize: 10 }} /> Attach
        </button>
      </div>

      {/* Action links */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
        padding: '6px 0', borderBottom: '1px solid #E4E4E4', marginBottom: 0,
      }}>
        {['AI Intro Writer', 'Apply Intro Template', 'Apply Signature', 'Manage Email Settings'].map((label, i) => (
          <button key={i} style={{
            display: 'inline-flex', alignItems: 'center', gap: 3,
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: "'Open Sans', sans-serif", fontSize: 10, fontWeight: 600,
            color: '#047880',
          }}>
            <i className={`pi ${i === 0 ? 'pi-sparkles' : i === 1 ? 'pi-file-edit' : i === 2 ? 'pi-check-square' : 'pi-cog'}`}
              style={{ fontSize: 10 }} />
            {label}
            {i < 3 && <i className="pi pi-chevron-down" style={{ fontSize: 7 }} />}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: 10, color: '#555D64' }}>Auto Reminders · <strong>Off</strong></span>
      </div>

      {/* RTE toolbar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap',
        padding: '5px 6px', background: '#FCFCFC', borderBottom: '1px solid #E4E4E4',
      }}>
        <select style={{ padding: '2px 3px', border: '1px solid #CED4DA', borderRadius: 3, fontSize: 9, fontFamily: "'Open Sans', sans-serif" }}>
          <option>Sans Serif</option>
        </select>
        <select style={{ padding: '2px 3px', border: '1px solid #CED4DA', borderRadius: 3, fontSize: 9, fontFamily: "'Open Sans', sans-serif" }}>
          <option>Normal</option>
        </select>
        <div style={{ width: 1, height: 12, background: '#E4E4E4', margin: '0 2px' }} />
        {['B', 'I', 'U'].map(c => (
          <button key={c} style={{
            width: 20, height: 20, border: 'none', borderRadius: 3,
            background: 'none', cursor: 'pointer', fontWeight: c === 'B' ? 700 : 400,
            fontStyle: c === 'I' ? 'italic' : 'normal',
            textDecoration: c === 'U' ? 'underline' : 'none',
            fontSize: 10, color: '#555D64', fontFamily: "'Open Sans', sans-serif",
          }}>{c}</button>
        ))}
        <div style={{ width: 1, height: 12, background: '#E4E4E4', margin: '0 2px' }} />
        {['pi-list', 'pi-align-left'].map((ic, i) => (
          <button key={i} style={{
            width: 20, height: 20, border: 'none', borderRadius: 3,
            background: 'none', cursor: 'pointer', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
          }}>
            <i className={`pi ${ic}`} style={{ fontSize: 10, color: '#555D64' }} />
          </button>
        ))}
      </div>

      {/* Email body */}
      <div
        contentEditable
        suppressContentEditableWarning
        style={{
          minHeight: 220, maxHeight: 350, overflowY: 'auto',
          padding: '12px 14px', fontFamily: "'Open Sans', sans-serif",
          fontSize: 11, color: '#171D22', lineHeight: 1.7, outline: 'none',
          border: '1px solid #E4E4E4', borderTop: 'none', borderRadius: '0 0 5px 5px',
          background: '#fff',
        }}
        dangerouslySetInnerHTML={{ __html: emailBody }}
      />
    </div>
  );
}

Object.assign(window, { SendDocModal });
