/* Clear App Shell — matches actual Clear interface */

function ClearAppShell({ children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', fontFamily: "'Open Sans', sans-serif", overflow: 'hidden' }}>
      {/* Top Nav Bar */}
      <div style={{
        display: 'flex', alignItems: 'center', height: 36, background: '#fff',
        borderBottom: '1px solid #E4E4E4', padding: '0 16px', flexShrink: 0,
        zIndex: 50,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginRight: 24 }}>
          <img src={window.__resources?.clearLogo || "assets/clear-logo.png"} alt="Clear" style={{ height: 18 }} />
          <span style={{ fontSize: 8, color: '#9DA2A6', marginLeft: 2 }}>v1.88.3109</span>
        </div>
        {['Pipeline', 'Rates', 'Tools'].map(n => (
          <button key={n} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 13, fontWeight: 600, color: '#171D22', padding: '4px 10px',
            display: 'flex', alignItems: 'center', gap: 4,
            fontFamily: "'Open Sans', sans-serif",
          }}>
            {n} <i className="pi pi-chevron-down" style={{ fontSize: 7, color: '#717980' }} />
          </button>
        ))}
        <button style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          padding: '4px 14px', border: 'none', borderRadius: 20,
          background: '#047880', color: '#fff',
          fontSize: 12, fontWeight: 700, cursor: 'pointer',
          fontFamily: "'Open Sans', sans-serif", marginLeft: 6,
        }}>
          Create <i className="pi pi-chevron-down" style={{ fontSize: 7 }} />
        </button>
        <div style={{ flex: 1 }} />
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <i className="pi pi-search" style={{ position: 'absolute', left: 10, fontSize: 12, color: '#9DA2A6', pointerEvents: 'none' }} />
          <input placeholder="Search Leads and Loans" style={{
            padding: '5px 12px 5px 30px', border: '1px solid #CED4DA', borderRadius: 20,
            fontSize: 11, width: 200, outline: 'none', fontFamily: "'Open Sans', sans-serif", color: '#717980',
          }} />
        </div>
        <span style={{ fontSize: 11, fontWeight: 600, color: '#495057', marginLeft: 12 }}>Loan Officer</span>
        <div style={{
          width: 28, height: 28, borderRadius: '50%', background: '#047880',
          color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 10, fontWeight: 700, marginLeft: 6,
        }}>AB</div>
      </div>

      {/* Sub-nav row */}
      <div style={{
        display: 'flex', alignItems: 'center', minHeight: 48, background: '#fff',
        borderBottom: '1px solid #E4E4E4', padding: '6px 12px', flexShrink: 0, gap: 6,
        overflowX: 'auto',
      }}>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 6px', flexShrink: 0 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#171D22" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
        {[
          { label: 'Loan Summary', sub: 'LE Pending for 2 Days', dot: '#2E8120' },
          { label: 'URLA', sub: '3 of 6 RESPA', dot: 'outline' },
          { label: 'Credit', sub: 'Rep. Score 732', dot: '#2E8120' },
          { label: 'Pricing', sub: 'Lock Exp. 4/5/23', dot: null },
          { label: 'DU / LPA', sub: 'Not Complete', dot: 'outline' },
        ].map(t => (
          <button key={t.label} style={{
            padding: '5px 14px', border: '1px solid #CED4DA',
            borderRadius: 20, background: '#fff',
            fontFamily: "'Open Sans', sans-serif", fontSize: 11, fontWeight: 600,
            color: '#171D22', cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', gap: 6,
            whiteSpace: 'nowrap', flexShrink: 0,
          }}>
            {t.dot === 'outline' ? (
              <span style={{ width: 8, height: 8, borderRadius: '50%', border: '1.5px solid #CED4DA', flexShrink: 0 }} />
            ) : t.dot ? (
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: t.dot, flexShrink: 0 }} />
            ) : null}
            <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0 }}>
              <span>{t.label}</span>
              {t.sub && <span style={{ fontSize: 9, fontWeight: 400, color: '#9DA2A6', lineHeight: '11px' }}>{t.sub}</span>}
            </span>
          </button>
        ))}
        <div style={{ flex: 1 }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <button style={{
            padding: '5px 14px', border: '1.5px solid #047880', borderRadius: 5,
            background: '#fff', fontSize: 11, fontWeight: 600, color: '#047880',
            cursor: 'pointer', fontFamily: "'Open Sans', sans-serif", whiteSpace: 'nowrap',
          }}>Create Sandbox</button>
          <button style={{
            padding: '5px 14px', border: '1.5px solid #047880', borderRadius: 5,
            background: '#fff', fontSize: 11, fontWeight: 600, color: '#047880',
            cursor: 'pointer', fontFamily: "'Open Sans', sans-serif",
            display: 'flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap',
          }}>
            Generate Needs List <i className="pi pi-chevron-down" style={{ fontSize: 7 }} />
          </button>
          <button style={{
            background: '#fff', border: '1px solid #CED4DA', borderRadius: '50%',
            width: 30, height: 30, cursor: 'pointer', display: 'flex',
            alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <i className="pi pi-bolt" style={{ fontSize: 12, color: '#047880' }} />
          </button>
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <button style={{
              background: '#fff', border: '1px solid #CED4DA', borderRadius: '50%',
              width: 30, height: 30, cursor: 'pointer', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <i className="pi pi-bell" style={{ fontSize: 12, color: '#555D64' }} />
            </button>
            <span style={{
              position: 'absolute', top: -4, right: -6,
              minWidth: 18, height: 18, borderRadius: 9, background: '#EB1000',
              color: '#fff', fontSize: 8, fontWeight: 700, padding: '0 4px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>11</span>
          </div>
          <button style={{
            padding: '5px 14px', border: 'none', borderRadius: 5,
            background: '#047880', color: '#fff', fontSize: 11, fontWeight: 700,
            cursor: 'pointer', fontFamily: "'Open Sans', sans-serif",
            display: 'flex', alignItems: 'center', gap: 5, whiteSpace: 'nowrap',
          }}>
            Save Loan <i className="pi pi-chevron-down" style={{ fontSize: 7 }} />
          </button>
        </div>
      </div>

      {/* Body: sidebar + content */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Left Sidebar */}
        <div style={{
          width: 140, background: '#fff', borderRight: '1px solid #F4F4F5',
          overflowY: 'auto', flexShrink: 0, fontSize: 11,
        }}>
          <div style={{ padding: '14px 12px 12px' }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: '#171D22' }}>John Smith</div>
            <div style={{ color: '#717980', fontSize: 11, marginTop: 3, display: 'flex', alignItems: 'center', gap: 4 }}>
              <i className="pi pi-phone" style={{ fontSize: 9 }} /> (123) 123-1234
            </div>
          </div>

          <SidebarSection title="Loan Info" defaultOpen={true}>
            <SidebarRow label="Loan #" value="TEST0000035695" />
            <SidebarRow label="Status" value="LE Pending" />
            <SidebarRow label="Purpose" value="Purchase" />
            <div style={{ display: 'flex', gap: 4, padding: '6px 0 2px', alignItems: 'center' }}>
              <span style={{ fontSize: 8, fontWeight: 700, padding: '2px 5px', borderRadius: 3, background: '#047880', color: '#fff' }}>Call Back</span>
              <span style={{ fontSize: 8, fontWeight: 700, padding: '2px 5px', borderRadius: 3, background: '#32A4AC', color: '#fff' }}>Lock File</span>
              <span style={{ fontSize: 9, color: '#9DA2A6' }}>+2</span>
            </div>
          </SidebarSection>

          <SidebarSection title="Property">
            <div style={{ fontSize: 11, color: '#495057', lineHeight: '16px' }}>
              1901 Thornridge Cir.<br />Shiloh, HI 81063
            </div>
          </SidebarSection>

          <SidebarSection title="Pricing" defaultOpen={true}>
            <div style={{ fontSize: 10, color: '#171D22', lineHeight: '14px', marginBottom: 6, fontStyle: 'italic' }}>
              10/6 SOFR ARM 30 yr with<br />Int Only and 20 year...
            </div>
            <SidebarRow label="Interest Rate" value="3.500%" />
            <SidebarRow label="APR" value="3.833%" />
            <SidebarRow label="P&I" value="$2,000" />
            <SidebarRow label="Total Housing" value="$2,000 ⓘ" />
            <div style={{ height: 1, background: '#F4F4F5', margin: '5px 0' }} />
            <SidebarRow label="Loan Amt." value="$300,000" />
            <SidebarRow label="LTV/CLTV" value="88.24% / 88.24%" />
            <SidebarRow label="Cash to Close" value="($2,500.14)" />
          </SidebarSection>

          <SidebarSection title="Eligibility" defaultOpen={true}>
            <SidebarRow label="DTI" value="14.66% / 22.35%" />
            <SidebarRow label="FICO Rep. Score" value="734 ⓘ" />
            <SidebarRow label="Total Income" value="$1,000,000 ⓘ" />
            <SidebarRow label="Total Payments" value="$100,000 ⓘ" />
            <SidebarRow label="Total Liabilities" value="$100,000 ⓘ" />
          </SidebarSection>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, overflow: 'auto', background: '#F4F4F5' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function SidebarSection({ title, children, defaultOpen = false }) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div style={{ borderTop: '1px solid #F4F4F5' }}>
      <button onClick={() => setOpen(!open)} style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        width: '100%', padding: '9px 12px', background: 'none', border: 'none',
        cursor: 'pointer', fontFamily: "'Open Sans', sans-serif",
        fontSize: 12, fontWeight: 700, color: '#171D22',
      }}>
        {title}
        <i className={`pi pi-chevron-${open ? 'up' : 'down'}`} style={{ fontSize: 9, color: '#717980' }} />
      </button>
      {open && <div style={{ padding: '0 12px 10px' }}>{children}</div>}
    </div>
  );
}

function SidebarRow({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 0', fontSize: 11 }}>
      <span style={{ color: '#717980' }}>{label}</span>
      <span style={{ fontWeight: 600, color: '#171D22', textAlign: 'right' }}>{value}</span>
    </div>
  );
}

Object.assign(window, { ClearAppShell });
