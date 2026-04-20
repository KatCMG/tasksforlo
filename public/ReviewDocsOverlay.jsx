/* Review Documents Overlay — Full-screen modal */

const SAMPLE_DOCS = [
  { id: 'd1', name: 'sample-local-pdf.pdf', type: 'Other', category: 'Not Assigned to Condition', subcategory: 'Other', pages: 1 },
  { id: 'd2', name: 'Screenshot_2026.png', type: 'Other', category: 'Not Assigned to Condition', subcategory: 'Other', pages: 1 },
  { id: 'd3', name: 'HOI_Policy.pdf', type: 'Insurance', category: 'Not Assigned to Condition', subcategory: 'Other', pages: 3 },
  { id: 'd4', name: 'W2-Syn.pdf', type: 'Income', category: 'Not Assigned to Condition', subcategory: 'Other', pages: 2 },
  { id: 'd5', name: 'bank_stmt.pdf', type: 'Assets', category: 'Bank Statements', subcategory: 'Bank Statements (1)', pages: 4 },
  { id: 'd6', name: 'Tax_bank_.pdf', type: 'Tax', category: 'Not Assigned to Condition', subcategory: 'Other', pages: 2 },
  { id: 'd7', name: 'Take_bank_.pdf', type: 'Assets', category: 'Not Assigned to Condition', subcategory: 'Other', pages: 1 },
  { id: 'd8', name: 'Dec-State..pdf', type: 'Other', category: 'Not Assigned to Condition', subcategory: 'Other', pages: 1 },
  { id: 'd9', name: 'Asset_Statement.pdf', type: 'Assets', category: 'Asset Statements (1)', subcategory: 'Asset Statements (1)', pages: 3 },
];

function ReviewDocsOverlay({ open, onClose, taskTitle }) {
  const [selectedDoc, setSelectedDoc] = React.useState(SAMPLE_DOCS[0]);
  const [docName, setDocName] = React.useState('');
  const [docType, setDocType] = React.useState('');
  const [docDesc, setDocDesc] = React.useState('');
  const [docExpDate, setDocExpDate] = React.useState('');
  const [notes, setNotes] = React.useState('');
  const [showDetails, setShowDetails] = React.useState(false);
  const [acceptedCount, setAcceptedCount] = React.useState(0);
  const [zoom, setZoom] = React.useState(100);

  React.useEffect(() => {
    if (selectedDoc) {
      setDocName(selectedDoc.name);
      setDocType(selectedDoc.type);
      setDocDesc('');
      setDocExpDate('');
    }
  }, [selectedDoc]);

  if (!open) return null;

  const totalDocs = SAMPLE_DOCS.length;

  const inputSt = {
    width: '100%', padding: '7px 10px', border: '1px solid #CBCED1',
    borderRadius: 5, fontFamily: "'Open Sans', sans-serif", fontSize: 12,
    color: '#171D22', outline: 'none', background: '#fff',
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#fff', zIndex: 500,
      display: 'flex', flexDirection: 'column',
      fontFamily: "'Open Sans', sans-serif",
    }}>
      {/* Top bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '8px 16px', background: '#fff',
        borderBottom: '1px solid #E4E4E4', flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#171D22' }}>Review Documents</span>
        </div>
        <button onClick={onClose} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: '#717980', padding: 4,
        }}>
          <i className="pi pi-times" style={{ fontSize: 14 }} />
        </button>
      </div>

      {/* Main content: 3-column layout */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Left sidebar — thumbnail list */}
        <div style={{
          width: 180, borderRight: '1px solid #E4E4E4', overflowY: 'auto',
          background: '#FCFCFC', flexShrink: 0,
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '10px 12px', borderBottom: '1px solid #E4E4E4',
          }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#171D22' }}>Not Assigned to Condition</span>
            <i className="pi pi-chevron-up" style={{ fontSize: 9, color: '#717980' }} />
          </div>
          <div style={{ padding: '4px 8px', fontSize: 10, color: '#717980', borderBottom: '1px solid #F4F4F5' }}>
            Other ({SAMPLE_DOCS.filter(d => d.subcategory === 'Other').length})
          </div>

          {/* Thumbnails */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, padding: 8 }}>
            {SAMPLE_DOCS.map(doc => (
              <div key={doc.id} onClick={() => setSelectedDoc(doc)}
                style={{
                  width: 72, cursor: 'pointer', textAlign: 'center',
                  border: selectedDoc?.id === doc.id ? '2px solid #047880' : '2px solid transparent',
                  borderRadius: 4, padding: 3,
                  background: selectedDoc?.id === doc.id ? '#EAF6F7' : 'transparent',
                }}>
                <div style={{
                  width: '100%', height: 56, background: '#F4F4F5',
                  borderRadius: 3, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', marginBottom: 3,
                  border: '1px solid #E4E4E4',
                }}>
                  <i className={`pi ${doc.name.endsWith('.pdf') ? 'pi-file-pdf' : 'pi-image'}`}
                    style={{ fontSize: 18, color: '#9DA2A6' }} />
                </div>
                <div style={{
                  fontSize: 9, color: '#555D64', overflow: 'hidden',
                  textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>{doc.name}</div>
              </div>
            ))}
          </div>

          {/* Category sections */}
          {['Bank Statements (1)', 'Asset Statements (1)'].map(cat => (
            <div key={cat}>
              <div style={{
                padding: '8px 12px', fontSize: 10, fontWeight: 700,
                color: '#555D64', borderTop: '1px solid #E4E4E4',
                borderBottom: '1px solid #F4F4F5',
              }}>{cat}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, padding: 8 }}>
                {SAMPLE_DOCS.filter(d => d.subcategory === cat).map(doc => (
                  <div key={doc.id} onClick={() => setSelectedDoc(doc)}
                    style={{
                      width: 72, cursor: 'pointer', textAlign: 'center',
                      border: selectedDoc?.id === doc.id ? '2px solid #047880' : '2px solid transparent',
                      borderRadius: 4, padding: 3,
                      background: selectedDoc?.id === doc.id ? '#EAF6F7' : 'transparent',
                    }}>
                    <div style={{
                      width: '100%', height: 56, background: '#F4F4F5',
                      borderRadius: 3, display: 'flex', alignItems: 'center',
                      justifyContent: 'center', marginBottom: 3, border: '1px solid #E4E4E4',
                    }}>
                      <i className="pi pi-file-pdf" style={{ fontSize: 18, color: '#9DA2A6' }} />
                    </div>
                    <div style={{
                      fontSize: 9, color: '#555D64', overflow: 'hidden',
                      textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>{doc.name}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Center — Properties panel */}
        <div style={{
          width: 280, borderRight: '1px solid #E4E4E4', overflowY: 'auto',
          padding: '16px', flexShrink: 0,
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: 16,
          }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#171D22' }}>Document Properties</span>
            <i className="pi pi-chevron-up" style={{ fontSize: 10, color: '#717980', cursor: 'pointer' }} />
          </div>

          {/* Document Name */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 11, fontWeight: 600, color: '#171D22', marginBottom: 4, display: 'block' }}>
              Document Name <span style={{ color: '#EB1000' }}>*</span>
            </label>
            <input value={docName} onChange={e => setDocName(e.target.value)} style={inputSt} />
          </div>

          {/* Document Type */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 11, fontWeight: 600, color: '#171D22', marginBottom: 4, display: 'block' }}>
              Document Type <span style={{ color: '#EB1000' }}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <select value={docType} onChange={e => setDocType(e.target.value)}
                style={{ ...inputSt, appearance: 'none', paddingRight: 28 }}>
                <option>Other</option>
                <option>Income</option>
                <option>Assets</option>
                <option>Insurance</option>
                <option>Tax</option>
                <option>Identity</option>
              </select>
              <i className="pi pi-chevron-down" style={{
                position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                fontSize: 10, color: '#717980', pointerEvents: 'none',
              }} />
            </div>
          </div>

          {/* Document Description */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 11, fontWeight: 600, color: '#171D22', marginBottom: 4, display: 'block' }}>
              Document Description <i className="pi pi-info-circle" style={{ fontSize: 10, color: '#9DA2A6' }} />
            </label>
            <textarea value={docDesc} onChange={e => setDocDesc(e.target.value)}
              placeholder="Enter description" rows={3}
              style={{ ...inputSt, resize: 'vertical', minHeight: 60 }} />
            <div style={{ textAlign: 'right', fontSize: 10, color: '#9DA2A6', marginTop: 2 }}>
              {docDesc.length}/1000
            </div>
          </div>

          {/* Expiration Date */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 11, fontWeight: 600, color: '#171D22', marginBottom: 4, display: 'block' }}>
              Document Expiration Date
            </label>
            <input type="date" value={docExpDate} onChange={e => setDocExpDate(e.target.value)}
              style={inputSt} placeholder="Select date" />
          </div>

          {/* Details toggle */}
          <button onClick={() => setShowDetails(!showDetails)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 12, fontWeight: 700, color: '#047880', padding: 0,
            fontFamily: "'Open Sans', sans-serif", marginBottom: 16,
            display: 'flex', alignItems: 'center', gap: 4,
          }}>
            Details <i className={`pi pi-chevron-${showDetails ? 'up' : 'down'}`} style={{ fontSize: 9 }} />
          </button>

          {/* Document Notes */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#171D22', marginBottom: 6 }}>
              Document Notes <span style={{ fontWeight: 400, color: '#9DA2A6' }}>0</span>
            </div>
            <textarea value={notes} onChange={e => setNotes(e.target.value)}
              placeholder="Add document notes..." rows={2}
              style={{ ...inputSt, resize: 'vertical', minHeight: 50 }} />
          </div>

          {/* Associated Conditions */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#171D22', marginBottom: 6 }}>
              Associated Conditions <span style={{ fontWeight: 400, color: '#9DA2A6' }}>0</span>
            </div>
            <button style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: 12, fontWeight: 600, color: '#047880',
              fontFamily: "'Open Sans', sans-serif", padding: 0,
            }}>
              <i className="pi pi-plus-circle" style={{ fontSize: 12 }} />
              Associate This Document to a Condition
            </button>
          </div>
        </div>

        {/* Right — Document viewer */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#F4F4F5' }}>
          {/* Viewer toolbar */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '8px 16px', background: '#fff',
            borderBottom: '1px solid #E4E4E4', flexShrink: 0,
          }}>
            <div style={{ fontSize: 12, color: '#171D22' }}>
              <span style={{ fontWeight: 600 }}>{selectedDoc?.type}</span> - {selectedDoc?.name}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 11, color: '#555D64' }}>Pages</span>
            </div>
          </div>

          {/* Page toolbar */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '6px 16px', background: '#fff',
            borderBottom: '1px solid #E4E4E4', flexShrink: 0, flexWrap: 'wrap',
          }}>
            {[
              { icon: 'pi-arrows-h', label: 'Split' },
              { icon: 'pi-clone', label: 'Merge' },
            ].map((a, i) => (
              <button key={i} style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: 11, fontWeight: 600, color: '#047880',
                fontFamily: "'Open Sans', sans-serif",
              }}>
                <i className={`pi ${a.icon}`} style={{ fontSize: 11 }} /> {a.label}
              </button>
            ))}
            <span style={{ fontSize: 11, color: '#555D64' }}>1 / {selectedDoc?.pages || 1}</span>
            {[
              { icon: 'pi-replay', label: 'Rotate' },
              { icon: 'pi-trash', label: 'Delete Page', danger: true },
            ].map((a, i) => (
              <button key={i} style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: 11, fontWeight: 600,
                color: a.danger ? '#EB1000' : '#047880',
                fontFamily: "'Open Sans', sans-serif",
              }}>
                <i className={`pi ${a.icon}`} style={{ fontSize: 11 }} /> {a.label}
              </button>
            ))}
            <div style={{ flex: 1 }} />
            <span style={{ fontSize: 11, color: '#555D64' }}>{zoom}%</span>
            <button onClick={() => setZoom(Math.min(200, zoom + 25))} style={{
              background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: '#555D64',
            }}>+</button>
          </div>

          {/* PDF viewer area */}
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'auto', padding: 24,
          }}>
            <div style={{
              width: Math.min(600, 500 * zoom / 100), background: '#fff',
              boxShadow: '0 2px 16px rgba(0,0,0,0.1)', borderRadius: 2,
              padding: 40, minHeight: 500,
            }}>
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <h1 style={{ fontFamily: 'serif', fontSize: 28, color: '#171D22', marginBottom: 8 }}>Sample PDF</h1>
                <p style={{ fontSize: 13, color: '#555D64' }}>Created for testing <span style={{ color: '#047880' }}>PDFObject</span></p>
              </div>
              <p style={{ fontSize: 11, color: '#495057', lineHeight: 1.7, marginBottom: 12 }}>
                This PDF is three pages long. Three long pages. Or three short pages if you're optimistic. Is it the same as saying "three long minutes", knowing that all minutes are the same duration, and one cannot possibly be longer than the other? If these pages are all the same size, can one possibly be longer than the other?
              </p>
              <p style={{ fontSize: 11, color: '#495057', lineHeight: 1.7, marginBottom: 12 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.
              </p>
              <p style={{ fontSize: 11, color: '#495057', lineHeight: 1.7, marginBottom: 12 }}>
                Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa.
              </p>
              <p style={{ fontSize: 11, color: '#495057', lineHeight: 1.7 }}>
                Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 16px', background: '#fff',
        borderTop: '1px solid #E4E4E4', flexShrink: 0,
      }}>
        {/* Left: task info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
          <span style={{
            padding: '3px 8px', borderRadius: 4, background: '#EAF6F7',
            border: '1px solid #D1EDEF', fontSize: 11, fontWeight: 700, color: '#047880',
          }}>INC-001</span>
          <div style={{ fontSize: 11, color: '#171D22' }}>
            <strong>Verify Employment:</strong> Verbal VOE from current employer verifying employment status, title, and income
          </div>
          <div style={{ fontSize: 10, color: '#9DA2A6', display: 'flex', gap: 12 }}>
            <span>New <i className="pi pi-chevron-down" style={{ fontSize: 8 }} /></span>
            <span>04/15/26</span>
          </div>
        </div>

        {/* Right: actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 13, fontWeight: 600, color: '#047880',
            fontFamily: "'Open Sans', sans-serif",
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C00B14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            <span style={{ color: '#171D22' }}>Move to Recycle Bin</span>
          </button>
          <button style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 13, fontWeight: 600, color: '#171D22',
            fontFamily: "'Open Sans', sans-serif",
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#047880" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
            Save Changes
          </button>
          <button style={{
            padding: '8px 24px', border: 'none', borderRadius: 24,
            background: '#FFE0DF', fontSize: 13, fontWeight: 700, color: '#C00B14',
            cursor: 'pointer', fontFamily: "'Open Sans', sans-serif",
          }}>Reject...</button>
          <button onClick={() => { setAcceptedCount(c => c + 1); }}
            style={{
              padding: '8px 24px', border: 'none', borderRadius: 24,
              background: '#047880', fontSize: 13, fontWeight: 700, color: '#fff',
              cursor: 'pointer', fontFamily: "'Open Sans', sans-serif",
            }}>
            Accept Doc {acceptedCount + 1} of {totalDocs}
          </button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ReviewDocsOverlay });
