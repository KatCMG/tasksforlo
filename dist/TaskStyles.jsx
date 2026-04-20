/* Task List — Shared Styles */

const TASK_COLORS = {
  // Status semantic colors
  status: {
    'Not Sent':     { bg: '#FEF5B3', color: '#8F5F17', icon: 'pi-exclamation-triangle' },
    'Requested':    { bg: '#D0E1FD', color: '#245098', icon: 'pi-send' },
    'In Review':    { bg: '#F3E8FF', color: '#581C87', icon: 'pi-eye' },
    'Completed':    { bg: '#C8E8C3', color: '#155D0A', icon: 'pi-check-circle' },
    'Overdue':      { bg: '#FFE0DF', color: '#C00B14', icon: 'pi-clock' },
    'Needs Action': { bg: '#FFEDD5', color: '#9A3412', icon: 'pi-bolt' },
  },
  // Group header accents
  groups: {
    'In Review':        { accent: '#9747FF', bg: '#FAF5FF' },
    'Requested':        { accent: '#3B82F6', bg: '#F0F6FF' },
    'Need to Request':  { accent: '#F97316', bg: '#FFF8F0' },
    'Completed':        { accent: '#2E8120', bg: '#F2FCF0' },
  }
};

const taskStyles = {
  page: {
    fontFamily: "'Open Sans', sans-serif",
    fontSize: 12,
    color: '#495057',
    background: '#F4F4F5',
    minHeight: '100vh',
  },

  /* Page header */
  pageHeader: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '8px 20px', background: '#fff',
    borderBottom: '1px solid #E4E4E4',
    boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
  },
  headerTabs: { display: 'flex', gap: 2 },
  headerTab: (active) => ({
    padding: '8px 16px', fontFamily: "'Open Sans', sans-serif",
    fontSize: 12, fontWeight: 600, border: 'none', background: 'none',
    color: active ? '#047880' : '#717980',
    borderBottom: active ? '2px solid #047880' : '2px solid transparent',
    cursor: 'pointer', lineHeight: '17px',
  }),

  /* Toolbar */
  toolbar: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '10px 20px', background: '#fff',
    borderBottom: '1px solid #E4E4E4',
  },
  toolbarLeft: { display: 'flex', alignItems: 'center', gap: 8 },

  /* Buttons */
  btn: {
    display: 'inline-flex', alignItems: 'center', gap: 5,
    padding: '6px 12px', border: '1.5px solid #CED4DA', borderRadius: 5,
    background: '#fff', fontFamily: "'Open Sans', sans-serif",
    fontSize: 12, fontWeight: 600, color: '#495057', cursor: 'pointer',
    lineHeight: '17px',
  },
  btnCreate: {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    padding: '6px 14px', border: '1.5px solid #32A4AC', borderRadius: 20,
    background: '#fff', fontFamily: "'Open Sans', sans-serif",
    fontSize: 12, fontWeight: 600, color: '#32A4AC', cursor: 'pointer',
  },
  btnPrimary: {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    padding: '7px 14px', background: '#047880', color: '#fff',
    border: 'none', borderRadius: 5,
    fontFamily: "'Open Sans', sans-serif", fontSize: 12, fontWeight: 700,
    cursor: 'pointer', boxShadow: '0 3px 6px rgba(0,0,0,0.10)',
  },

  /* Search */
  searchWrap: { position: 'relative', display: 'flex', alignItems: 'center' },
  searchInput: {
    padding: '6px 10px 6px 30px', border: '1.5px solid #CED4DA',
    borderRadius: 5, fontFamily: "'Open Sans', sans-serif",
    fontSize: 12, color: '#64748B', width: 220, outline: 'none',
    background: '#fff', lineHeight: '17px',
  },

  /* Summary bar */
  summaryBar: {
    display: 'flex', gap: 12, padding: '12px 20px',
    background: '#fff', borderBottom: '1px solid #E4E4E4',
  },
  summaryChip: (active) => ({
    display: 'inline-flex', alignItems: 'center', gap: 6,
    padding: '5px 12px', borderRadius: 20,
    border: active ? '1.5px solid #047880' : '1.5px solid #E4E4E4',
    background: active ? '#EAF6F7' : '#fff',
    fontFamily: "'Open Sans', sans-serif", fontSize: 11, fontWeight: 600,
    color: active ? '#047880' : '#555D64',
    cursor: 'pointer', lineHeight: '16px',
    transition: 'all 0.15s ease',
  }),
  summaryCount: (color) => ({
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    minWidth: 20, height: 18, borderRadius: 9,
    background: color || '#E4E4E4', color: '#fff',
    fontSize: 10, fontWeight: 700, padding: '0 5px',
  }),

  /* Filter bar */
  filterBar: {
    padding: '10px 20px 12px', background: '#fff',
    borderBottom: '1px solid #E4E4E4',
  },
  filterLabel: {
    fontSize: 10, fontWeight: 700, color: '#64748B',
    textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 6,
  },
  filterField: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    border: '1.5px solid #CED4DA', borderRadius: 5,
    padding: '5px 10px', minHeight: 34, background: '#fff',
  },
  filterTag: {
    display: 'inline-flex', alignItems: 'center', gap: 4,
    padding: '2px 4px 2px 8px', background: '#fff',
    border: '1px solid #CBCED1', borderRadius: 4,
    fontSize: 12, fontWeight: 600, color: '#555D64',
  },

  /* Main area */
  main: { padding: 20 },
  sectionBar: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '10px 16px', background: '#F4F4F5',
    border: '1px solid #E4E4E4', borderRadius: '6px 6px 0 0',
    fontSize: 13, fontWeight: 700, color: '#171D22',
  },
  appPanel: {
    border: '1px solid #E4E4E4', borderTop: 'none',
    borderRadius: '0 0 6px 6px', background: '#fff',
    overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
  },

  /* Group headers */
  groupHeader: (groupKey) => {
    const gc = TASK_COLORS.groups[groupKey] || { accent: '#555D64', bg: '#F4F4F5' };
    return {
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '9px 16px', background: gc.bg,
      borderBottom: '1px solid #E4E4E4',
      borderLeft: `3px solid ${gc.accent}`,
      cursor: 'pointer', userSelect: 'none',
    };
  },
  groupTitle: { fontSize: 12, fontWeight: 700, color: '#171D22' },
  groupCount: (groupKey) => {
    const gc = TASK_COLORS.groups[groupKey] || { accent: '#555D64' };
    return {
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      minWidth: 22, height: 18, borderRadius: 9,
      background: gc.accent, color: '#fff',
      fontSize: 10, fontWeight: 700, padding: '0 6px',
    };
  },

  /* Column headers */
  colHeaders: {
    display: 'grid',
    gridTemplateColumns: '28px 1fr 110px 150px 140px 120px 40px',
    padding: '6px 16px', borderBottom: '1px solid #E4E4E4',
    background: '#FCFCFC',
  },
  colLabel: {
    fontSize: 10, fontWeight: 700, color: '#717980',
    textTransform: 'uppercase', letterSpacing: '0.03em',
  },

  /* Task row */
  taskRow: (isCompleted, hasAttention) => ({
    display: 'grid',
    gridTemplateColumns: '28px 1fr 110px 150px 140px 120px 40px',
    alignItems: 'center', padding: '10px 16px',
    borderBottom: '1px solid #F4F4F5',
    minHeight: 52, background: hasAttention ? '#FFFBE5' : '#fff',
    opacity: isCompleted ? 0.6 : 1,
    transition: 'background 0.1s',
  }),

  /* Status pill */
  statusPill: (statusKey) => {
    const s = TASK_COLORS.status[statusKey] || TASK_COLORS.status['Not Sent'];
    return {
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '3px 10px', borderRadius: 20,
      background: s.bg, color: s.color,
      fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap',
    };
  },

  /* Task title link */
  taskLink: (completed) => ({
    fontSize: 12, fontWeight: 600,
    color: completed ? '#9DA2A6' : '#047880',
    textDecoration: completed ? 'line-through' : 'none',
    cursor: 'pointer', lineHeight: '17px',
  }),
  taskDesc: {
    fontSize: 11, color: '#717980', lineHeight: '16px', marginTop: 2,
  },
  taskType: {
    fontSize: 10, fontWeight: 700, color: '#555D64',
    padding: '2px 7px', borderRadius: 3,
    background: '#F4F4F5', border: '1px solid #E4E4E4',
    display: 'inline-block', whiteSpace: 'nowrap',
  },

  /* Source cell */
  sourceCode: { fontSize: 12, fontWeight: 700, color: '#047880' },
  sourceLabel: { fontSize: 10, color: '#9DA2A6' },

  /* Assign cell */
  assignDot: {
    width: 7, height: 7, borderRadius: '50%', background: '#047880', flexShrink: 0,
  },
  assignName: { fontSize: 12, fontWeight: 600, color: '#171D22' },

  /* Due date */
  dueDate: (overdue) => ({
    fontSize: 12, fontWeight: overdue ? 700 : 400,
    color: overdue ? '#C00B14' : '#495057',
  }),

  /* Kebab */
  kebab: {
    background: 'none', border: 'none', cursor: 'pointer',
    color: '#717980', padding: 5, borderRadius: 4,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },

  /* Progress bar for groups */
  progressBar: {
    height: 3, borderRadius: 2, background: '#E4E4E4',
    overflow: 'hidden', width: 60,
  },
  progressFill: (pct, color) => ({
    height: '100%', borderRadius: 2,
    background: color || '#047880',
    width: `${pct}%`, transition: 'width 0.3s ease',
  }),

  /* Warning banner */
  warningBanner: {
    display: 'flex', alignItems: 'center', gap: 8,
    padding: '9px 16px', background: '#FFFBE5',
    borderBottom: '1px solid #E4E4E4',
  },
  warningText: { fontSize: 12, color: '#8F5F17', lineHeight: '17px' },

  /* Borrower alert */
  borrowerAlert: {
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '10px 16px', background: '#FFFBE5',
    borderBottom: '1px solid #FBDE0B',
  },

  /* Send doc dropdown */
  sendDocBtn: (isOpen) => ({
    display: 'inline-flex', alignItems: 'center', gap: 8,
    padding: '7px 14px', border: '1.5px solid #32A4AC',
    borderRadius: 20, background: isOpen ? '#EAF6F7' : '#fff',
    color: '#047880', fontFamily: "'Open Sans', sans-serif",
    fontSize: 12, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap',
  }),
  badge: {
    background: '#EB1000', color: '#fff', borderRadius: '50%',
    width: 18, height: 18, display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    fontSize: 10, fontWeight: 700, flexShrink: 0,
  },

  /* Empty state */
  emptyState: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    justifyContent: 'center', padding: '56px 24px',
    textAlign: 'center', gap: 12,
  },
};

window.TASK_COLORS = TASK_COLORS;
window.taskStyles = taskStyles;
