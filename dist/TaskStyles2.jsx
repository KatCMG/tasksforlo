/* Tasks for LO v2 — Styles matching actual Clear UI */

const taskStyles2 = {
  page: {
    fontFamily: "'Open Sans', sans-serif", fontSize: 12,
    color: '#495057', background: '#fff', minHeight: '100vh',
  },

  /* Top filter bar */
  filterChipBar: {
    display: 'flex', alignItems: 'center', gap: 8,
    padding: '10px 20px', background: '#fff',
    borderBottom: '1px solid #E4E4E4',
  },
  filterChip: (active) => ({
    display: 'inline-flex', alignItems: 'center', gap: 6,
    padding: '6px 16px', borderRadius: 6,
    border: active ? '1.5px solid #047880' : '1.5px solid #CED4DA',
    background: active ? 'rgba(4,120,128,0.06)' : '#fff',
    color: '#171D22',
    fontFamily: "'Open Sans', sans-serif", fontSize: 13, fontWeight: 600,
    cursor: 'pointer', whiteSpace: 'nowrap',
  }),
  filterChipCount: (active) => ({
    fontSize: 13, fontWeight: 700,
    color: '#171D22',
  }),

  /* Send Doc Requests chip */
  sendDocChip: {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    padding: '5px 14px', borderRadius: 20,
    border: '1.5px solid #047880', background: '#047880',
    color: '#fff', fontFamily: "'Open Sans', sans-serif",
    fontSize: 12, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap',
  },
  sendDocBadge: {
    background: '#EB1000', color: '#fff', borderRadius: '50%',
    width: 18, height: 18, display: 'inline-flex',
    alignItems: 'center', justifyContent: 'center',
    fontSize: 10, fontWeight: 700,
  },

  /* Toolbar row */
  toolbar: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '8px 20px', background: '#fff',
    borderBottom: '1px solid #E4E4E4',
  },
  toolbarLeft: { display: 'flex', alignItems: 'center', gap: 14 },
  createLink: {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    padding: '6px 18px', border: 'none', borderRadius: 20,
    background: '#EAF6F7', cursor: 'pointer',
    fontFamily: "'Open Sans', sans-serif", fontSize: 13,
    fontWeight: 700, color: '#047880',
  },
  refreshLink: {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    background: 'none', border: 'none', cursor: 'pointer',
    fontFamily: "'Open Sans', sans-serif", fontSize: 13,
    fontWeight: 600, color: '#171D22', marginLeft: 8,
  },
  searchWrap: { position: 'relative', display: 'flex', alignItems: 'center' },
  searchInput: {
    padding: '7px 10px 7px 30px', border: '1.5px solid #CED4DA',
    borderRadius: 5, fontFamily: "'Open Sans', sans-serif",
    fontSize: 12, color: '#495057', width: 200, outline: 'none',
    background: '#fff',
  },

  /* Section heading */
  sectionHeading: {
    fontSize: 14, fontWeight: 700, color: '#171D22',
    padding: '14px 20px 6px',
    background: '#F4F4F5',
  },
  appLabel: {
    fontSize: 12, fontWeight: 700, color: '#171D22',
    padding: '8px 20px', background: '#fff',
    borderBottom: '1px solid #E4E4E4',
  },

  /* Filter list */
  filterList: {
    padding: '10px 20px 12px', background: '#fff',
    borderBottom: '1px solid #E4E4E4',
  },
  filterListLabel: {
    fontSize: 11, fontWeight: 600, color: '#555D64', marginBottom: 6,
  },
  filterField: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    border: '1px solid #CED4DA', borderRadius: 5,
    padding: '6px 10px', background: '#fff',
  },
  filterTag: {
    display: 'inline-flex', alignItems: 'center', gap: 5,
    padding: '3px 6px 3px 10px', background: '#EAF6F7',
    border: '1px solid #D1EDEF', borderRadius: 4,
    fontSize: 12, fontWeight: 600, color: '#047880',
  },
  filterTagRemove: {
    background: 'none', border: 'none', cursor: 'pointer',
    color: '#047880', fontSize: 10, padding: '0 2px',
    display: 'inline-flex', alignItems: 'center',
  },

  /* Warning banner */
  warningBanner: {
    display: 'flex', alignItems: 'center', gap: 8,
    padding: '9px 20px', background: '#FFFBE5',
    borderBottom: '1px solid #E4E4E4',
    fontSize: 12, color: '#8F5F17', lineHeight: '17px',
  },
  warningLink: {
    marginLeft: 'auto', fontSize: 12, fontWeight: 700,
    color: '#047880', background: 'none', border: 'none',
    cursor: 'pointer', fontFamily: "'Open Sans', sans-serif",
    whiteSpace: 'nowrap', textDecoration: 'underline',
  },

  /* Table */
  tablePanel: {
    background: '#fff', border: '1px solid #E4E4E4',
    borderRadius: 6, overflow: 'hidden',
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)', margin: '0 20px 20px',
  },
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '32px 90px 1fr 160px 130px 110px 110px 150px',
    padding: '8px 16px', borderBottom: '1px solid #E4E4E4',
    background: '#FCFCFC',
  },
  colLabel: {
    fontSize: 11, fontWeight: 700, color: '#555D64',
  },

  /* Group header */
  groupHeader: {
    display: 'flex', alignItems: 'center', gap: 8,
    padding: '10px 16px', background: '#F4F4F5',
    borderBottom: '1px solid #E4E4E4',
    fontSize: 12, fontWeight: 700, color: '#171D22',
  },
  groupNotSent: {
    display: 'inline-flex', alignItems: 'center', gap: 4,
    fontSize: 11, fontWeight: 600, color: '#8F5F17',
    marginLeft: 6,
  },

  /* Task row */
  taskRow: {
    display: 'grid',
    gridTemplateColumns: '32px 90px 1fr 160px 130px 110px 110px 150px',
    alignItems: 'center', padding: '10px 16px',
    borderBottom: '1px solid #F4F4F5',
    minHeight: 52, background: '#fff',
    transition: 'background 0.1s',
  },

  /* App code badge */
  appCode: {
    display: 'inline-flex', alignItems: 'center',
    padding: '3px 0', borderRadius: 0,
    background: 'none', border: 'none',
    fontSize: 12, fontWeight: 700, color: '#047880',
    whiteSpace: 'nowrap',
  },

  /* Task title */
  taskTitle: {
    fontSize: 12, fontWeight: 600, color: '#047880',
    cursor: 'pointer', lineHeight: '17px',
    textDecoration: 'none',
  },
  taskDesc: {
    fontSize: 11, color: '#717980', lineHeight: '16px', marginTop: 1,
  },
  taskSubInfo: {
    fontSize: 10, color: '#9DA2A6', marginTop: 2,
  },

  /* Status text */
  statusText: {
    fontSize: 12, fontWeight: 400, color: '#495057',
  },

  /* Type text */
  typeText: {
    fontSize: 12, fontWeight: 400, color: '#495057',
  },

  /* Action pill */
  actionPill: {
    display: 'inline-flex', alignItems: 'center', gap: 5,
    padding: '5px 14px', borderRadius: 20,
    border: '1.5px solid #047880', background: '#fff',
    fontFamily: "'Open Sans', sans-serif",
    fontSize: 11, fontWeight: 700, color: '#047880',
    cursor: 'pointer', whiteSpace: 'nowrap',
  },

  /* Completed row */
  completedRow: {
    opacity: 0.55,
  },
};

window.taskStyles2 = taskStyles2;
