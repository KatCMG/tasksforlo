/* Tasks for LO v2 — Components */
const S2 = window.taskStyles2;

/* ── Filter Chip Bar ── */
function FilterChipBar({ filters, active, onFilter }) {
  return (
    <div style={S2.filterChipBar}>
      {filters.map(f => (
        <button key={f.key} style={S2.filterChip(active === f.key)}
          onClick={() => onFilter(f.key)}>
          {f.label} <span style={S2.filterChipCount(active === f.key)}>{f.count}</span>
          {f.hasDropdown && <i className="pi pi-chevron-down" style={{ fontSize: 9 }} />}
        </button>
      ))}
    </div>
  );
}

/* ── Toolbar ── */
function Toolbar2({ searchText, onSearch, onCreateTask, typeFilter, onTypeFilter }) {
  return (
    <div style={S2.toolbar}>
      <div style={S2.toolbarLeft}>
        <button style={S2.createLink} onClick={onCreateTask}>
          <i className="pi pi-plus-circle" style={{ fontSize: 14 }} /> Create Task
        </button>
        <div style={{ width: 1, height: 20, background: '#E4E4E4', margin: '0 6px' }} />
        <button style={S2.refreshLink}>
          <i className="pi pi-refresh" style={{ fontSize: 13 }} /> Refresh
        </button>
        <div style={{ width: 1, height: 20, background: '#E4E4E4', margin: '0 6px' }} />
        <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
          <select value={typeFilter} onChange={e => onTypeFilter(e.target.value)}
            style={{
              padding: '5px 28px 5px 10px', border: '1.5px solid #CED4DA', borderRadius: 5,
              fontFamily: "'Open Sans', sans-serif", fontSize: 11, fontWeight: 600,
              color: typeFilter === 'all' ? '#717980' : '#047880',
              background: typeFilter === 'all' ? '#fff' : '#EAF6F7',
              outline: 'none', appearance: 'none', cursor: 'pointer',
            }}>
            <option value="all">All Types</option>
            <option value="Doc Request">Doc Request</option>
            <option value="Doc Delivery">Doc Delivery</option>
            <option value="Confirmation">Confirmation</option>
            <option value="Text Response">Text Response</option>
          </select>
          <i className="pi pi-chevron-down" style={{
            position: 'absolute', right: 9, fontSize: 9, color: '#717980', pointerEvents: 'none',
          }} />
        </div>
      </div>
      <div style={S2.searchWrap}>
        <i className="pi pi-search" style={{ position: 'absolute', left: 9, color: '#9DA2A6', fontSize: 12, pointerEvents: 'none' }} />
        <input style={S2.searchInput} placeholder="Search Tasks"
          value={searchText} onChange={e => onSearch(e.target.value)} />
        {searchText && (
          <button onClick={() => onSearch('')} style={{
            position: 'absolute', right: 8, background: 'none', border: 'none',
            cursor: 'pointer', color: '#717980', padding: 2,
          }}>
            <i className="pi pi-times" style={{ fontSize: 10 }} />
          </button>
        )}
      </div>
    </div>
  );
}

/* ── Filter List (borrower) ── */
function FilterList2({ tags, onRemove }) {
  return (
    <div style={S2.filterList}>
      <div style={S2.filterListLabel}>Filter List</div>
      <div style={S2.filterField}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, flex: 1 }}>
          {tags.length === 0 && <span style={{ fontSize: 12, color: '#9DA2A6', fontStyle: 'italic' }}>No filters applied</span>}
          {tags.map((t, i) => (
            <span key={i} style={S2.filterTag}>
              {t}
              <button style={S2.filterTagRemove} onClick={() => onRemove(i)}>
                <i className="pi pi-times" style={{ fontSize: 9 }} />
              </button>
            </span>
          ))}
        </div>
        <i className="pi pi-chevron-down" style={{ fontSize: 12, color: '#717980', flexShrink: 0, cursor: 'pointer' }} />
      </div>
    </div>
  );
}

/* ── Column Headers ── */
function ColHeaders2() {
  return (
    <div style={S2.tableHeader}>
      <span></span>
      <span></span>
      <span style={S2.colLabel}>Task</span>
      <span style={S2.colLabel}>Assigned To</span>
      <span style={S2.colLabel}>Status</span>
      <span style={S2.colLabel}>Type</span>
      <span style={S2.colLabel}>Associated{'\n'}Condition</span>
      <span style={S2.colLabel}>Actions</span>
    </div>
  );
}

/* ── Group Header ── */
function GroupHeader2({ label, count, isNotSent, collapsed, onToggle }) {
  return (
    <div style={{ ...S2.groupHeader, cursor: 'pointer' }} onClick={onToggle}>
      <i className={`pi pi-chevron-${collapsed ? 'right' : 'down'}`}
        style={{ fontSize: 10, color: '#555D64' }} />
      <span>{label} ({count})</span>
      {isNotSent && (
        <span style={S2.groupNotSent}>
          <i className="pi pi-exclamation-triangle" style={{ fontSize: 10 }} />
          Not sent to borrower
        </span>
      )}
    </div>
  );
}

/* ── Warning Banner ── */
function WarningBanner2({ message, actionLabel, onAction }) {
  return (
    <div style={{
      ...S2.warningBanner,
      margin: '8px 16px', borderRadius: 6,
      border: '1px solid #FBDE0B',
    }}>
      <i className="pi pi-exclamation-triangle" style={{ fontSize: 12, color: '#8F5F17', flexShrink: 0 }} />
      <span>{message}</span>
      {actionLabel && <button style={S2.warningLink} onClick={onAction}>{actionLabel}</button>}
    </div>
  );
}

/* ── Task Row ── */
function TaskRow2({ task, onToggle, onFlag, onReviewDocs }) {
  const [hovered, setHovered] = React.useState(false);
  const isCompleted = task.completed;
  const rowStyle = {
    ...S2.taskRow,
    background: hovered ? '#F7FAFA' : '#fff',
    ...(isCompleted ? S2.completedRow : {}),
  };

  return (
    <div style={rowStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      {/* Checkbox */}
      <div>
        <input type="checkbox" checked={isCompleted || false}
          onChange={() => onToggle(task.id)}
          style={{ width: 15, height: 15, accentColor: '#32A4AC', cursor: 'pointer' }} />
      </div>

      {/* App code */}
      <div>
        <span style={S2.appCode}>{task.code}</span>
      </div>

      {/* Task name + desc */}
      <div style={{ paddingRight: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ ...S2.taskTitle, textDecoration: isCompleted ? 'line-through' : 'none', color: isCompleted ? '#9DA2A6' : '#047880' }}>
            {task.title}
          </span>
          {onFlag && !isCompleted && (
            <button onClick={(e) => { e.stopPropagation(); onFlag(task.id); }}
              title={task.flagged ? 'Unflag' : 'Flag for yourself'}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: 2, display: 'flex', alignItems: 'center',
                color: task.flagged ? '#EB1000' : '#CED4DA',
                transition: 'color 0.15s',
              }}>
              <i className={`pi ${task.flagged ? 'pi-flag-fill' : 'pi-flag'}`}
                style={{ fontSize: 11 }} />
            </button>
          )}
        </div>
        <div style={S2.taskDesc}>{task.desc}</div>
        {task.subInfo && <div style={S2.taskSubInfo}>{task.subInfo}</div>}
      </div>

      {/* Assigned To */}
      <div style={{ fontSize: 12, color: isCompleted ? '#9DA2A6' : '#495057' }}>
        {task.assignee}
      </div>

      {/* Status */}
      <div style={{ ...S2.statusText, color: isCompleted ? '#9DA2A6' : '#495057' }}>
        {task.status}
      </div>

      {/* Type */}
      <div style={{ ...S2.typeText, color: isCompleted ? '#9DA2A6' : '#495057' }}>
        {task.type}
      </div>

      {/* Condition */}
      <div>
        {task.condition ? (
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            padding: '2px 8px', borderRadius: 4,
            background: '#EAF6F7', border: '1px solid #D1EDEF',
            fontSize: 11, fontWeight: 700, color: isCompleted ? '#9DA2A6' : '#047880',
            cursor: 'pointer',
          }}>
            <i className="pi pi-link" style={{ fontSize: 9 }} />
            {task.condition}
          </span>
        ) : (
          <span style={{ fontSize: 11, color: '#CED4DA' }}>—</span>
        )}
      </div>

      {/* Actions */}
      <div>
        {task.docsToReview > 0 && !isCompleted && (
          <button style={S2.actionPill}
            onClick={() => onReviewDocs && onReviewDocs(task)}>
            {task.docsToReview} Docs to Review
          </button>
        )}
      </div>
    </div>
  );
}

Object.assign(window, {
  FilterChipBar, Toolbar2, FilterList2, ColHeaders2,
  GroupHeader2, WarningBanner2, TaskRow2,
});
