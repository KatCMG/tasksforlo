/* Task List — Main App */
const TS = window.taskStyles;

const INITIAL_TASKS = [
  { id: 1, title: 'Homeowners Insurance (HOI) Policy', desc: 'Upload proof of homeowners insurance policy for the subject property.', type: 'Doc Upload', status: 'In Review', group: 'In Review', assignee: 'Jack Smith', due: '4/18/26', source: 'UW-1042', sourceLabel: 'Condition', reviewBadge: true, flagged: false, completed: false, overdue: true, statusDate: 'Uploaded 4/16' },
  { id: 2, title: 'Flood Certification', desc: 'Upload flood zone certification for the property.', type: 'Doc Upload', status: 'In Review', group: 'In Review', assignee: 'Jack Smith', due: '4/22/26', source: 'UW-1043', sourceLabel: 'Condition', reviewBadge: true, flagged: false, completed: false, overdue: false, statusDate: 'Uploaded 4/17' },
  { id: 3, title: 'Verify Employment — Current Employer', desc: 'Confirm borrower is currently employed at stated employer.', type: 'Confirmation', status: 'Requested', group: 'Requested', assignee: 'Jack Smith', due: '4/25/26', source: 'AUS-201', sourceLabel: 'Finding', flagged: true, completed: false, overdue: false, statusDate: 'Sent 4/12' },
  { id: 4, title: 'Bank Statement — March 2026', desc: 'Most recent bank statement showing 2 months reserves.', type: 'Doc Upload', status: 'Requested', group: 'Requested', assignee: 'Jack Smith', due: '4/28/26', source: 'UW-1044', sourceLabel: 'Condition', flagged: false, completed: false, overdue: false, statusDate: 'Sent 4/14' },
  { id: 5, title: 'Pay Stub — Most Recent', desc: 'Most recent pay stub within 30 days.', type: 'Doc Upload', status: 'Requested', group: 'Requested', assignee: 'Jane Smith', due: '4/22/26', source: 'AUS-202', sourceLabel: 'Finding', flagged: false, completed: false, overdue: false, statusDate: 'Sent 4/10' },
  { id: 6, title: 'Gift Letter', desc: 'Signed gift letter from donor for down payment funds.', type: 'Doc Upload', status: 'Not Sent', group: 'Need to Request', assignee: 'Jack Smith', due: '4/30/26', source: 'UW-1045', sourceLabel: 'Condition', flagged: false, completed: false, overdue: false },
  { id: 7, title: 'Confirm Intent to Proceed', desc: 'Borrower confirms intent to proceed after receiving Loan Estimate.', type: 'Confirmation', status: 'Not Sent', group: 'Need to Request', assignee: 'Jack Smith', due: '4/26/26', flagged: false, completed: false, overdue: false },
  { id: 8, title: 'Explain Large Deposit — $12,400', desc: 'Provide written LOE for large deposit on 3/15 statement.', type: 'Text Response', status: 'Not Sent', group: 'Need to Request', assignee: 'Jane Smith', due: '4/28/26', source: 'UW-1046', sourceLabel: 'Condition', flagged: false, completed: false, overdue: false },
  { id: 9, title: 'W-2 — 2025', desc: 'W-2 wage statement for tax year 2025.', type: 'Doc Upload', status: 'Completed', group: 'Completed', assignee: 'Jack Smith', due: '4/10/26', flagged: false, completed: true, overdue: false, statusDate: 'Done 4/8' },
  { id: 10, title: 'Tax Return — 2025', desc: 'Federal tax return for 2025.', type: 'Doc Upload', status: 'Completed', group: 'Completed', assignee: 'Jack Smith', due: '4/10/26', flagged: false, completed: true, overdue: false, statusDate: 'Done 4/9' },
  { id: 11, title: 'Photo ID — Driver License', desc: 'Valid government-issued photo identification.', type: 'Doc Upload', status: 'Completed', group: 'Completed', assignee: 'Jane Smith', due: '4/08/26', flagged: false, completed: true, overdue: false, statusDate: 'Done 4/5' },
  { id: 12, title: 'Credit Authorization', desc: 'Signed credit authorization form.', type: 'Confirmation', status: 'Completed', group: 'Completed', assignee: 'Jack Smith', due: '4/05/26', flagged: false, completed: true, overdue: false, statusDate: 'Done 4/3' },
];

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "showSummaryBar": true,
  "colorGroupHeaders": true,
  "showProgressBars": true,
  "showAvatars": true,
  "compactRows": false
}/*EDITMODE-END*/;

function TaskListApp() {
  const [tasks, setTasks] = React.useState(INITIAL_TASKS);
  const [searchText, setSearchText] = React.useState('');
  const [activeFilter, setActiveFilter] = React.useState('all');
  const [collapsed, setCollapsed] = React.useState({ 'Completed': true });
  const [sendDocOpen, setSendDocOpen] = React.useState(false);
  const [tweaks, setTweaks] = React.useState(TWEAK_DEFAULTS);
  const [tweaksVisible, setTweaksVisible] = React.useState(false);

  // Tweaks integration
  React.useEffect(() => {
    const handler = (e) => {
      if (e.data?.type === '__activate_edit_mode') setTweaksVisible(true);
      if (e.data?.type === '__deactivate_edit_mode') setTweaksVisible(false);
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', handler);
  }, []);

  const updateTweak = (key, val) => {
    const next = { ...tweaks, [key]: val };
    setTweaks(next);
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [key]: val } }, '*');
  };

  // Derived
  const filtered = React.useMemo(() => {
    let list = tasks;
    if (searchText) {
      const q = searchText.toLowerCase();
      list = list.filter(t => t.title.toLowerCase().includes(q) || t.desc?.toLowerCase().includes(q) || t.assignee?.toLowerCase().includes(q));
    }
    if (activeFilter === 'action') list = list.filter(t => t.status === 'Needs Action' || t.overdue);
    else if (activeFilter === 'notSent') list = list.filter(t => t.status === 'Not Sent');
    else if (activeFilter === 'requested') list = list.filter(t => t.status === 'Requested');
    else if (activeFilter === 'completed') list = list.filter(t => t.completed);
    return list;
  }, [tasks, searchText, activeFilter]);

  const counts = React.useMemo(() => ({
    all: tasks.length,
    action: tasks.filter(t => t.status === 'Needs Action' || (t.overdue && !t.completed)).length,
    notSent: tasks.filter(t => t.status === 'Not Sent').length,
    requested: tasks.filter(t => t.status === 'Requested').length,
    completed: tasks.filter(t => t.completed).length,
  }), [tasks]);

  const groups = [
    { key: 'In Review', tasks: filtered.filter(t => t.group === 'In Review' && !t.completed) },
    { key: 'Requested', tasks: filtered.filter(t => t.group === 'Requested' && !t.completed) },
    { key: 'Need to Request', tasks: filtered.filter(t => t.group === 'Need to Request' && !t.completed) },
    { key: 'Completed', tasks: filtered.filter(t => t.completed) },
  ];

  const toggleComplete = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? {
      ...t,
      completed: !t.completed,
      group: !t.completed ? 'Completed' : t.group,
      status: !t.completed ? 'Completed' : t.status,
    } : t));
  };

  const toggleFlag = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, flagged: !t.flagged } : t));
  };

  const toggleGroup = (key) => {
    setCollapsed(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const notSentCount = counts.notSent;

  return (
    <div style={TS.page}>
      {/* Page Header */}
      <div style={TS.pageHeader}>
        <div style={TS.headerTabs}>
          <button style={TS.headerTab(true)}>Tasks and Docs</button>
          <button style={TS.headerTab(false)}>Docs</button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: "'Open Sans', sans-serif", fontSize: 12,
            fontWeight: 600, color: '#171D22',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <i className="pi pi-clock" style={{ fontSize: 13, color: '#555D64' }} />
            Edit Auto Reminders
          </button>
          <div style={{ position: 'relative' }}>
            <button style={TS.sendDocBtn(sendDocOpen)}
              onClick={() => setSendDocOpen(!sendDocOpen)}>
              Send Doc Requests
              {notSentCount > 0 && <span style={TS.badge}>{notSentCount}</span>}
              <i className={`pi pi-chevron-${sendDocOpen ? 'up' : 'down'}`} style={{ fontSize: 10 }} />
            </button>
            {sendDocOpen && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 6px)', right: 0,
                background: '#fff', borderRadius: 8,
                boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                minWidth: 250, border: '1px solid #E4E4E4',
                zIndex: 50, overflow: 'hidden',
              }}>
                {['Borrower', 'Borrower Attorney', 'Closing Attorney'].map(r => (
                  <div key={r} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '11px 16px', fontSize: 12, color: '#171D22',
                    borderBottom: '1px solid #F4F4F5', cursor: 'pointer',
                  }}>
                    <span>{r}</span>
                    <span style={{
                      minWidth: 20, height: 20, borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 10, fontWeight: 700, color: '#fff',
                      background: r === 'Borrower' ? '#EB1000' : '#32A4AC',
                    }}>
                      {r === 'Borrower' ? 2 : r === 'Borrower Attorney' ? 1 : 0}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div style={TS.toolbar}>
        <div style={TS.toolbarLeft}>
          <button style={TS.btnCreate}>
            <i className="pi pi-plus" style={{ fontSize: 11 }} /> Create Task
          </button>
          <div style={TS.searchWrap}>
            <i className="pi pi-search" style={{
              position: 'absolute', left: 9, color: '#9DA2A6', fontSize: 12, pointerEvents: 'none',
            }} />
            <input style={TS.searchInput} placeholder="Search tasks..."
              value={searchText} onChange={e => setSearchText(e.target.value)} />
            {searchText && (
              <button onClick={() => setSearchText('')} style={{
                position: 'absolute', right: 8, background: 'none', border: 'none',
                cursor: 'pointer', color: '#717980', fontSize: 11, padding: 2,
              }}>
                <i className="pi pi-times" style={{ fontSize: 10 }} />
              </button>
            )}
          </div>
          <button style={TS.btn}>
            <i className="pi pi-sort-amount-down" style={{ fontSize: 11 }} /> Sort
          </button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#717980' }}>
          <span style={{ fontWeight: 600 }}>{tasks.filter(t => t.completed).length}</span>
          <span>of</span>
          <span style={{ fontWeight: 600 }}>{tasks.length}</span>
          <span>completed</span>
          <div style={{ ...TS.progressBar, width: 80, marginLeft: 4 }}>
            <div style={TS.progressFill(Math.round(tasks.filter(t => t.completed).length / tasks.length * 100), '#047880')} />
          </div>
        </div>
      </div>

      {/* Summary Bar (quick filters) */}
      {tweaks.showSummaryBar && (
        <SummaryBar counts={counts} activeFilter={activeFilter} onFilter={setActiveFilter} />
      )}

      {/* Main */}
      <div style={TS.main}>
        {/* Section bar */}
        <div style={TS.sectionBar}>
          <span>Loan #1042891 — 123 Main St, Shiloh HI 81063</span>
        </div>

        {/* App panel */}
        <div style={TS.appPanel}>
          {/* Borrower alert */}
          <BorrowerAlert name="Jane Smith (Co-Borrower)" onInvite={() => {}} />

          {/* Column headers */}
          <ColumnHeaders />

          {/* Groups */}
          {groups.map(g => {
            if (g.tasks.length === 0 && activeFilter !== 'all') return null;
            const isCollapsed = collapsed[g.key] || false;
            return (
              <div key={g.key}>
                <GroupHeader
                  groupKey={g.key}
                  count={g.tasks.length}
                  collapsed={isCollapsed}
                  onToggle={() => toggleGroup(g.key)}
                  completedCount={g.key === 'Completed' ? g.tasks.length : g.tasks.filter(t => t.completed).length}
                  totalCount={g.tasks.length}
                />
                {g.key === 'Need to Request' && !isCollapsed && g.tasks.length > 0 && (
                  <WarningBanner message={`${g.tasks.length} tasks have not been sent to borrowers. Use "Send Doc Requests" to send them.`} />
                )}
                {!isCollapsed && g.tasks.map(t => (
                  <TaskRow key={t.id} task={t}
                    onToggleComplete={toggleComplete}
                    onFlag={toggleFlag}
                  />
                ))}
              </div>
            );
          })}

          {/* Empty state */}
          {filtered.length === 0 && (
            <div style={TS.emptyState}>
              <div style={{
                width: 48, height: 48, background: '#F4F4F5', borderRadius: 12,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <i className="pi pi-check-circle" style={{ fontSize: 22, color: '#9DA2A6' }} />
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#171D22' }}>No tasks found</span>
              <span style={{ fontSize: 12, color: '#717980', maxWidth: 280 }}>
                {searchText ? 'Try a different search term.' : 'No tasks match the selected filter.'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Tweaks Panel */}
      {tweaksVisible && (
        <div style={{
          position: 'fixed', bottom: 20, right: 20, zIndex: 999,
          background: '#fff', borderRadius: 10, padding: 20, width: 260,
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)', border: '1px solid #E4E4E4',
          fontFamily: "'Open Sans', sans-serif",
        }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#171D22', marginBottom: 14 }}>Tweaks</div>
          {[
            { key: 'showSummaryBar', label: 'Quick-filter chips' },
            { key: 'colorGroupHeaders', label: 'Color group headers' },
            { key: 'showProgressBars', label: 'Progress indicators' },
            { key: 'showAvatars', label: 'Assignee avatars' },
            { key: 'compactRows', label: 'Compact rows' },
          ].map(tw => (
            <label key={tw.key} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '6px 0', fontSize: 12, color: '#495057', cursor: 'pointer',
            }}>
              <span style={{ fontWeight: 600 }}>{tw.label}</span>
              <div style={{ position: 'relative', width: 34, height: 18 }}>
                <input type="checkbox" checked={tweaks[tw.key]}
                  onChange={(e) => updateTweak(tw.key, e.target.checked)}
                  style={{ opacity: 0, width: 0, height: 0 }} />
                <span style={{
                  position: 'absolute', inset: 0,
                  background: tweaks[tw.key] ? '#32A4AC' : '#9DA2A6',
                  borderRadius: 18, transition: 'background 0.2s',
                  cursor: 'pointer',
                }} onClick={() => updateTweak(tw.key, !tweaks[tw.key])} />
                <span style={{
                  position: 'absolute', top: 2, left: tweaks[tw.key] ? 18 : 2,
                  width: 14, height: 14, background: '#fff', borderRadius: '50%',
                  transition: 'left 0.2s', pointerEvents: 'none',
                }} />
              </div>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<TaskListApp />);
