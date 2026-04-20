/* Task List — Sub-components */
const TS = window.taskStyles;
const TC = window.TASK_COLORS;

/* ── Status Pill ── */
function StatusPill({ status }) {
  const s = TC.status[status] || TC.status['Not Sent'];
  return (
    <span style={TS.statusPill(status)}>
      <i className={`pi ${s.icon}`} style={{ fontSize: 10 }} />
      {status}
    </span>
  );
}

/* ── Progress mini-bar ── */
function MiniProgress({ completed, total, color }) {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <div style={TS.progressBar}>
        <div style={TS.progressFill(pct, color)} />
      </div>
      <span style={{ fontSize: 10, color: '#717980', fontWeight: 600 }}>{pct}%</span>
    </div>
  );
}

/* ── Group Header ── */
function GroupHeader({ groupKey, count, collapsed, onToggle, completedCount, totalCount }) {
  const gc = TC.groups[groupKey] || { accent: '#555D64' };
  return (
    <div style={TS.groupHeader(groupKey)} onClick={onToggle}>
      <i className={`pi pi-chevron-${collapsed ? 'right' : 'down'}`}
        style={{ fontSize: 11, color: '#555D64', transition: 'transform 0.2s', flexShrink: 0 }} />
      <span style={TS.groupTitle}>{groupKey}</span>
      <span style={TS.groupCount(groupKey)}>{count}</span>
      {groupKey !== 'Completed' && totalCount > 0 && (
        <MiniProgress completed={completedCount || 0} total={totalCount} color={gc.accent} />
      )}
    </div>
  );
}

/* ── Column Headers ── */
function ColumnHeaders() {
  return (
    <div style={TS.colHeaders}>
      <span></span>
      <span style={TS.colLabel}>Task</span>
      <span style={TS.colLabel}>Type</span>
      <span style={TS.colLabel}>Status</span>
      <span style={TS.colLabel}>Assigned To</span>
      <span style={TS.colLabel}>Due</span>
      <span></span>
    </div>
  );
}

/* ── Task Row ── */
function TaskRow({ task, onToggleComplete, onFlag }) {
  const [hovered, setHovered] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const isOverdue = task.overdue && !task.completed;
  const hasAttention = task.status === 'Not Sent' || task.status === 'Needs Action';

  const rowBg = task.completed ? '#FAFAFA'
    : hovered ? '#F7FAFA'
    : hasAttention ? '#FFFDF5'
    : '#fff';

  return (
    <div
      style={{
        ...TS.taskRow(task.completed, false),
        background: rowBg,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMenuOpen(false); }}
    >
      {/* Checkbox */}
      <div>
        <input type="checkbox" checked={task.completed || false}
          onChange={() => onToggleComplete(task.id)}
          style={{ width: 15, height: 15, accentColor: '#32A4AC', cursor: 'pointer' }} />
      </div>

      {/* Task info */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, paddingRight: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={TS.taskLink(task.completed)}>{task.title}</span>
          {task.reviewBadge && !task.completed && (
            <span style={{
              display: 'inline-flex', alignItems: 'center', padding: '1px 7px',
              background: '#32A4AC', color: '#fff', borderRadius: 3,
              fontSize: 10, fontWeight: 700, gap: 3,
            }}>
              <i className="pi pi-eye" style={{ fontSize: 9 }} /> Review
            </span>
          )}
          {task.flagged && (
            <i className="pi pi-flag-fill" style={{ fontSize: 10, color: '#EB1000' }} />
          )}
        </div>
        {task.desc && <span style={TS.taskDesc}>{task.desc}</span>}
        {task.source && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 1 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#047880' }}>{task.source}</span>
            {task.sourceLabel && <span style={{ fontSize: 10, color: '#9DA2A6' }}>{task.sourceLabel}</span>}
          </div>
        )}
      </div>

      {/* Type */}
      <div>
        <span style={TS.taskType}>{task.type}</span>
      </div>

      {/* Status */}
      <div>
        <StatusPill status={task.completed ? 'Completed' : task.status} />
        {task.statusDate && !task.completed && (
          <div style={{ fontSize: 10, color: '#9DA2A6', marginTop: 2 }}>{task.statusDate}</div>
        )}
      </div>

      {/* Assigned */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{
            width: 20, height: 20, borderRadius: '50%',
            background: task.completed ? '#CED4DA' : '#047880',
            color: '#fff', display: 'inline-flex',
            alignItems: 'center', justifyContent: 'center',
            fontSize: 8, fontWeight: 700, flexShrink: 0,
          }}>
            {task.assignee ? task.assignee.split(' ').map(w => w[0]).join('') : '?'}
          </span>
          <span style={{ fontSize: 11, fontWeight: 600, color: task.completed ? '#9DA2A6' : '#171D22' }}>
            {task.assignee}
          </span>
        </div>
      </div>

      {/* Due */}
      <div>
        <span style={TS.dueDate(isOverdue)}>
          {isOverdue && <i className="pi pi-exclamation-circle" style={{ fontSize: 10, marginRight: 3 }} />}
          {task.due}
        </span>
      </div>

      {/* Kebab */}
      <div style={{ position: 'relative' }}>
        <button style={{ ...TS.kebab, background: menuOpen ? '#F4F4F5' : 'none' }}
          onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }}>
          <i className="pi pi-ellipsis-v" style={{ fontSize: 13 }} />
        </button>
        {menuOpen && (
          <div style={{
            position: 'absolute', right: 0, top: 'calc(100% + 4px)',
            background: '#fff', border: '1px solid #CBCED1',
            borderRadius: 6, boxShadow: '0 3px 12px rgba(0,0,0,0.12)',
            zIndex: 50, minWidth: 160, overflow: 'hidden',
          }}>
            <button style={kebabItemStyle} onClick={() => { onFlag(task.id); setMenuOpen(false); }}>
              <i className="pi pi-flag" style={{ fontSize: 11, color: '#717980' }} />
              {task.flagged ? 'Unflag' : 'Flag for myself'}
            </button>
            <button style={kebabItemStyle} onClick={() => setMenuOpen(false)}>
              <i className="pi pi-pencil" style={{ fontSize: 11, color: '#717980' }} />
              Edit Task
            </button>
            <div style={{ height: 1, background: '#E4E4E4', margin: '2px 0' }} />
            <button style={kebabItemStyle} onClick={() => { onToggleComplete(task.id); setMenuOpen(false); }}>
              <i className="pi pi-check" style={{ fontSize: 11, color: '#717980' }} />
              {task.completed ? 'Reopen' : 'Mark Complete'}
            </button>
            <button style={{ ...kebabItemStyle, color: '#EB1000' }}
              onClick={() => setMenuOpen(false)}>
              <i className="pi pi-trash" style={{ fontSize: 11, color: '#EB1000' }} />
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const kebabItemStyle = {
  display: 'flex', alignItems: 'center', gap: 8,
  padding: '9px 14px', fontSize: 12, fontWeight: 600,
  color: '#171D22', cursor: 'pointer', background: 'none',
  border: 'none', width: '100%', textAlign: 'left',
  fontFamily: "'Open Sans', sans-serif",
};

/* ── Warning Banner ── */
function WarningBanner({ message }) {
  return (
    <div style={TS.warningBanner}>
      <i className="pi pi-exclamation-triangle" style={{ fontSize: 12, color: '#8F5F17', flexShrink: 0 }} />
      <span style={TS.warningText}>{message}</span>
    </div>
  );
}

/* ── Borrower Alert ── */
function BorrowerAlert({ name, onInvite }) {
  return (
    <div style={TS.borrowerAlert}>
      <i className="pi pi-info-circle" style={{ fontSize: 13, color: '#8F5F17', flexShrink: 0 }} />
      <span style={{ fontSize: 12, color: '#8F5F17', lineHeight: '17px', flex: 1 }}>
        <strong>{name}</strong> has not been invited to the Borrower Portal.
        Tasks assigned to this borrower cannot be sent until they are invited.
      </span>
      <button onClick={onInvite} style={{
        fontSize: 12, fontWeight: 700, color: '#047880',
        textDecoration: 'underline', background: 'none',
        border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
        fontFamily: "'Open Sans', sans-serif",
      }}>
        Invite Borrower
      </button>
    </div>
  );
}

/* ── Quick Filter Chips (summary bar) ── */
function SummaryBar({ counts, activeFilter, onFilter }) {
  const chips = [
    { key: 'all', label: 'All Tasks', count: counts.all, color: '#555D64' },
    { key: 'action', label: 'Needs Action', count: counts.action, color: '#F97316' },
    { key: 'notSent', label: 'Not Sent', count: counts.notSent, color: '#AB9400' },
    { key: 'requested', label: 'Requested', count: counts.requested, color: '#3B82F6' },
    { key: 'completed', label: 'Completed', count: counts.completed, color: '#2E8120' },
  ];
  return (
    <div style={TS.summaryBar}>
      {chips.map(c => (
        <button key={c.key}
          style={TS.summaryChip(activeFilter === c.key)}
          onClick={() => onFilter(c.key)}>
          {c.label}
          <span style={TS.summaryCount(activeFilter === c.key ? '#047880' : c.color)}>
            {c.count}
          </span>
        </button>
      ))}
    </div>
  );
}

Object.assign(window, {
  StatusPill, MiniProgress, GroupHeader, ColumnHeaders,
  TaskRow, WarningBanner, BorrowerAlert, SummaryBar,
});
