/* Tasks for LO v2 — Main App */
const S2 = window.taskStyles2;

const TASKS = [
  { id: 1, code: 'APP-001', title: 'Review Homeowners Insurance (HOI) Policy', desc: 'Description', type: 'Doc Delivery', status: 'Requested', group: 'Ready for Review', assignee: 'Jack Smith', docsToReview: 6, completed: false, flagged: false, condition: 'UW-1042' },
  { id: 2, code: 'APP-002', title: 'Provide Letter of Explanation for Credit Inquiry', desc: 'Description', type: 'Doc Request', status: 'Requested', group: 'Requested', assignee: 'Jack Smith', docsToReview: 6, completed: false, flagged: false, condition: 'UW-1043' },
  { id: 3, code: 'APP-003', title: 'Confirm Primary Residence Occupancy', desc: 'Description', type: 'Confirmation', status: 'Requested', group: 'Requested', assignee: 'Jack Smith', docsToReview: 6, completed: false, flagged: false, condition: null },
  { id: 4, code: 'APP-004', title: 'Explain Recent Credit Inquiry', desc: 'Processor 1 · Responsibility: Borrower', type: 'Doc Request', status: 'Need to Request', group: 'Need to Request', assignee: 'Jack Smith (Borrower)', docsToReview: 4, completed: false, flagged: false, condition: 'UW-1044' },
  { id: 5, code: 'APP-005', title: 'Explain Employment Gap (30+ Days)', desc: 'Processor 1 · Responsibility: Borrower', type: 'Doc Request', status: 'Need to Request', group: 'Need to Request', assignee: 'Jack Smith (Borrower)', docsToReview: 3, completed: false, flagged: false, condition: 'AUS-201' },
  { id: 6, code: 'APP-006', title: 'Confirm Changes in Marital Status', desc: 'Responsibility: Processor', type: 'Confirmation', status: 'Need to Request', group: 'Need to Request', assignee: 'Jane Smith (Co-Borrower)', docsToReview: 2, completed: false, flagged: false, condition: null },
  { id: 7, code: 'APP-007', title: 'Review Large Deposit Documentation', desc: 'Underwriter · Responsibility: Underwriter', type: 'Doc Request', status: 'Need to Request', group: 'Need to Request', assignee: 'Jack Smith (Borrower)', docsToReview: 5, completed: false, flagged: false, condition: 'UW-1046' },
  { id: 8, code: 'APP-008', title: 'W-2 2025 — Uploaded', desc: 'Completed by borrower', type: 'Doc Delivery', status: 'Completed', group: 'Completed', assignee: 'Jack Smith', docsToReview: 0, completed: true, flagged: false, condition: 'AUS-202' },
];

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "showFilterChips": true,
  "showDocsToReview": true,
  "showAppCodes": true,
  "showAppShell": false
}/*EDITMODE-END*/;

function TaskListApp2() {
  const [tasks, setTasks] = React.useState(TASKS);
  const [searchText, setSearchText] = React.useState('');
  const [activeFilter, setActiveFilter] = React.useState('active');
  const [typeFilter, setTypeFilter] = React.useState('all');
  const [filterTags, setFilterTags] = React.useState(['B1: Jack Smith']);
  const [collapsed, setCollapsed] = React.useState({ 'Completed': true });
  const [sendDocModalOpen, setSendDocModalOpen] = React.useState(false);
  const [createDrawerOpen, setCreateDrawerOpen] = React.useState(false);
  const [reviewDocsOpen, setReviewDocsOpen] = React.useState(false);
  const [reviewDocsTask, setReviewDocsTask] = React.useState(null);
  const [invitePortalOpen, setInvitePortalOpen] = React.useState(false);
  const [showDocsConfirm, setShowDocsConfirm] = React.useState(false);
  const [sendBorrowerDD, setSendBorrowerDD] = React.useState(false);
  const [globalToast, setGlobalToast] = React.useState(null);

  const showToast = (message, type = 'success') => {
    setGlobalToast({ message, type });
    setTimeout(() => setGlobalToast(null), 4000);
  };
  const [tweaks, setTweaks] = React.useState(TWEAK_DEFAULTS);
  const [tweaksVisible, setTweaksVisible] = React.useState(false);

  // Tweaks
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

  // Counts
  const activeTasks = tasks.filter(t => !t.completed);
  const needToRequest = tasks.filter(t => t.group === 'Need to Request');
  const requested = tasks.filter(t => t.group === 'Requested' || t.group === 'Ready for Review');

  const flagged = tasks.filter(t => t.flagged);

  const filterDefs = [
    { key: 'active', label: 'Active', count: activeTasks.length, hasDropdown: true },
    { key: 'needToRequest', label: 'Need to Request', count: needToRequest.length },
    { key: 'requested', label: 'Requested', count: requested.length },
    ...(flagged.length > 0 ? [{ key: 'flagged', label: 'Flagged', count: flagged.length }] : []),
  ];

  // Filter
  const filtered = React.useMemo(() => {
    let list = tasks;
    if (searchText) {
      const q = searchText.toLowerCase();
      list = list.filter(t => t.title.toLowerCase().includes(q) || t.desc?.toLowerCase().includes(q) || t.assignee?.toLowerCase().includes(q));
    }
    if (activeFilter === 'needToRequest') list = list.filter(t => t.group === 'Need to Request');
    else if (activeFilter === 'requested') list = list.filter(t => t.group === 'Requested' || t.group === 'Ready for Review');
    else if (activeFilter === 'active') list = list.filter(t => !t.completed);
    if (activeFilter === 'flagged') list = list.filter(t => t.flagged);
    if (typeFilter !== 'all') list = list.filter(t => t.type === typeFilter);
    return list;
  }, [tasks, searchText, activeFilter, typeFilter]);

  const groups = [
    { key: 'Ready for Review', label: 'Ready for Review', tasks: filtered.filter(t => t.group === 'Ready for Review' && !t.completed) },
    { key: 'Requested', label: 'Requested', tasks: filtered.filter(t => t.group === 'Requested' && !t.completed) },
    { key: 'Need to Request', label: 'Need to Request', isNotSent: true, tasks: filtered.filter(t => t.group === 'Need to Request' && !t.completed) },
    { key: 'Completed', label: 'Completed', tasks: filtered.filter(t => t.completed) },
  ];

  const toggleFlag = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, flagged: !t.flagged } : t));
  };

  const handleCreateTask = (newTask) => {
    const nextId = Math.max(...tasks.map(t => t.id)) + 1;
    const code = 'APP-' + String(nextId).padStart(3, '0');
    setTasks(prev => [...prev, {
      id: nextId, code, title: newTask.title, desc: newTask.desc || 'Newly created task',
      type: newTask.type, status: 'Need to Request', group: 'Need to Request',
      assignee: newTask.assignee, docsToReview: 0, completed: false, flagged: false,
    }]);
  };

  const openReviewDocs = (task) => {
    setReviewDocsTask(task);
    setReviewDocsOpen(true);
  };

  const toggleComplete = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? {
      ...t, completed: !t.completed,
      group: !t.completed ? 'Completed' : t.group,
      status: !t.completed ? 'Completed' : t.status,
    } : t));
  };

  const removeFilterTag = (idx) => {
    setFilterTags(prev => prev.filter((_, i) => i !== idx));
  };

  const tweaksPanel = (
    <div style={{
      position: 'fixed', bottom: 20, right: 20, zIndex: 999,
      background: '#fff', borderRadius: 10, padding: 20, width: 240,
      boxShadow: '0 8px 32px rgba(0,0,0,0.15)', border: '1px solid #E4E4E4',
      fontFamily: "'Open Sans', sans-serif",
    }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#171D22', marginBottom: 14 }}>Tweaks</div>
      {[
        { key: 'showFilterChips', label: 'Quick-filter chips' },
        { key: 'showDocsToReview', label: 'Docs to Review pills' },
        { key: 'showAppCodes', label: 'APP codes' },
        { key: 'showAppShell', label: 'Clear app shell' },
      ].map(tw => (
        <label key={tw.key} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '6px 0', fontSize: 12, color: '#495057', cursor: 'pointer',
        }}>
          <span style={{ fontWeight: 600 }}>{tw.label}</span>
          <div style={{ position: 'relative', width: 34, height: 18 }}
            onClick={() => updateTweak(tw.key, !tweaks[tw.key])}>
            <span style={{
              position: 'absolute', inset: 0,
              background: tweaks[tw.key] ? '#32A4AC' : '#9DA2A6',
              borderRadius: 18, transition: 'background 0.2s', cursor: 'pointer',
            }} />
            <span style={{
              position: 'absolute', top: 2, left: tweaks[tw.key] ? 18 : 2,
              width: 14, height: 14, background: '#fff', borderRadius: '50%',
              transition: 'left 0.2s', pointerEvents: 'none',
            }} />
          </div>
        </label>
      ))}
    </div>
  );

  const content = (
    <div style={tweaks.showAppShell ? { minHeight: '100%' } : S2.page}>
      {/* Tabs */}
      <div style={{
        display: 'flex', alignItems: 'center', padding: '0 20px',
        background: '#fff', borderBottom: '1px solid #E4E4E4',
      }}>
        {['Requests', 'Docs'].map((tab, i) => (
          <button key={tab} onClick={() => {
            if (i === 1) setShowDocsConfirm(true);
          }} style={{
            padding: '10px 16px', fontFamily: "'Open Sans', sans-serif",
            fontSize: 13, fontWeight: 600, border: 'none', background: 'none',
            color: i === 0 ? '#047880' : '#717980',
            borderBottom: i === 0 ? '2.5px solid #047880' : '2.5px solid transparent',
            cursor: 'pointer',
          }}>{tab}</button>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: "'Open Sans', sans-serif", fontSize: 12, fontWeight: 600,
            color: '#171D22',
          }}>
            <i className="pi pi-clock" style={{ fontSize: 13, color: '#555D64' }} />
            Edit Auto Reminders
            <span style={{
              fontSize: 10, fontWeight: 700, color: '#717980',
              padding: '2px 8px', border: '1px solid #CED4DA', borderRadius: 4,
              background: '#fff',
            }}>Off</span>
          </button>
          <div style={{ position: 'relative' }}>
            <button style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 16px', border: 'none', borderRadius: 20,
              background: '#047880', color: '#fff',
              fontFamily: "'Open Sans', sans-serif", fontSize: 12, fontWeight: 700,
              cursor: 'pointer', whiteSpace: 'nowrap',
            }} onClick={() => setSendBorrowerDD(!sendBorrowerDD)}>
              Send Borrower Requests
              <span style={{
                background: '#EB1000', color: '#fff', borderRadius: '50%',
                width: 20, height: 20, display: 'inline-flex',
                alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 700,
              }}>{tasks.filter(t => t.group === 'Need to Request').length}</span>
              <i className={`pi pi-chevron-${sendBorrowerDD ? 'up' : 'down'}`} style={{ fontSize: 8 }} />
            </button>
            {sendBorrowerDD && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 6px)', right: 0,
                background: '#fff', borderRadius: 10, minWidth: 260,
                boxShadow: '0 6px 24px rgba(0,0,0,0.14)',
                border: '1px solid #E4E4E4', zIndex: 50, overflow: 'hidden',
                padding: '4px 0',
              }}>
                {[
                  { name: 'Borrower', count: 6, color: '#047880' },
                  { name: 'Borrower Attorney', count: 1, color: '#EB1000' },
                  { name: 'Escrow Company', count: 1, color: '#EB1000' },
                  { name: 'Hazard Insurance Co 1', count: 1, color: '#EB1000' },
                  { name: 'MI Company', count: 1, color: '#047880' },
                ].map((r, i) => (
                  <div key={i}
                    onClick={() => { setSendBorrowerDD(false); setSendDocModalOpen(true); }}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '12px 18px', fontSize: 14, color: '#171D22',
                      cursor: 'pointer', fontWeight: 400,
                    }}>
                    <span>{r.name}</span>
                    <span style={{
                      minWidth: 24, height: 24, borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 12, fontWeight: 700, color: '#fff',
                      background: r.color,
                    }}>{r.count}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filter chip bar */}
      {tweaks.showFilterChips && (
        <FilterChipBar
          filters={filterDefs}
          active={activeFilter}
          onFilter={setActiveFilter}
        />
      )}

      {/* Toolbar */}
      <Toolbar2 searchText={searchText} onSearch={setSearchText} onCreateTask={() => setCreateDrawerOpen(true)} typeFilter={typeFilter} onTypeFilter={setTypeFilter} />

      {/* Section heading */}
      <div style={S2.sectionHeading}>In Progress Tasks</div>

      {/* App label */}
      <div style={S2.appLabel}>APP 1</div>

      {/* Filter list */}
      <FilterList2 tags={filterTags} onRemove={removeFilterTag} />

      {/* Table panel */}
      <div style={S2.tablePanel}>
        {/* Borrower warning */}
        <WarningBanner2
          message={<span><strong>Bob Johnson</strong> has not been invited to the portal. They won't receive task notifications until invited. Only document upload tasks can be sent to them in the meantime.</span>}
          actionLabel="Invite to Home Portal"
          onAction={() => setInvitePortalOpen(true)}
        />

        {/* Column headers */}
        <ColHeaders2 />

        {/* Groups */}
        {groups.map(g => {
          if (g.tasks.length === 0 && activeFilter !== 'active') return null;
          const isCollapsed = collapsed[g.key] || false;
          return (
            <div key={g.key}>
              <GroupHeader2
                label={g.label}
                count={g.tasks.length}
                isNotSent={g.isNotSent}
                collapsed={isCollapsed}
                onToggle={() => setCollapsed(prev => ({ ...prev, [g.key]: !prev[g.key] }))}
              />
              {g.isNotSent && !isCollapsed && g.tasks.length > 0 && (
                <WarningBanner2 message="These tasks have not been sent to the borrower." />
              )}
              {!isCollapsed && g.tasks.map(t => (
                <TaskRow2 key={t.id} task={{
                  ...t,
                  code: tweaks.showAppCodes ? t.code : undefined,
                  docsToReview: tweaks.showDocsToReview ? t.docsToReview : 0,
                }} onToggle={toggleComplete} onFlag={toggleFlag} onReviewDocs={openReviewDocs} />
              ))}
            </div>
          );
        })}

        {/* Empty state */}
        {filtered.length === 0 && (
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            padding: '48px 24px', textAlign: 'center', gap: 10,
          }}>
            <i className="pi pi-check-circle" style={{ fontSize: 28, color: '#9DA2A6' }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: '#171D22' }}>No tasks found</span>
            <span style={{ fontSize: 12, color: '#717980' }}>
              {searchText ? 'Try a different search term.' : 'No tasks match the selected filter.'}
            </span>
          </div>
        )}
      </div>

      {/* Send Doc Requests Modal */}
      <SendDocModal open={sendDocModalOpen} onClose={() => setSendDocModalOpen(false)} onSuccess={() => showToast('Borrower request emails sent successfully.')} />

      {/* Create Task Drawer */}
      <CreateTaskDrawer open={createDrawerOpen} onClose={() => setCreateDrawerOpen(false)} onCreateTask={handleCreateTask} showToast={showToast} />

      {/* Review Docs Overlay */}
      <ReviewDocsOverlay open={reviewDocsOpen} onClose={() => setReviewDocsOpen(false)} taskTitle={reviewDocsTask?.title} />

      {/* Invite to Home Portal */}
      <InvitePortalDrawer open={invitePortalOpen} onClose={() => setInvitePortalOpen(false)} />

      {/* Docs tab confirmation */}
      {showDocsConfirm && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
          zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }} onClick={() => setShowDocsConfirm(false)}>
          <div onClick={e => e.stopPropagation()} style={{
            background: '#fff', borderRadius: 10, width: 400, padding: 24,
            boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
            fontFamily: "'Open Sans', sans-serif",
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 8, background: '#EAF6F7',
                border: '1px solid #D1EDEF', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
              }}>
                <i className="pi pi-file" style={{ fontSize: 16, color: '#047880' }} />
              </div>
              <span style={{ fontSize: 15, fontWeight: 700, color: '#171D22' }}>Navigate to Documents</span>
            </div>
            <p style={{ fontSize: 13, color: '#555D64', lineHeight: '20px', marginBottom: 20 }}>
              You'll be taken to the Documents view. Any unsaved changes in the current view will be preserved.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setShowDocsConfirm(false)} style={{
                flex: 1, padding: '9px 16px', border: '1.5px solid #CBCED1', borderRadius: 6,
                background: '#fff', fontFamily: "'Open Sans', sans-serif",
                fontSize: 12, fontWeight: 600, color: '#555D64', cursor: 'pointer',
              }}>Stay in Requests</button>
              <button onClick={() => setShowDocsConfirm(false)} style={{
                flex: 1, padding: '9px 16px', border: 'none', borderRadius: 6,
                background: '#047880', color: '#fff',
                fontFamily: "'Open Sans', sans-serif", fontSize: 12, fontWeight: 700,
                cursor: 'pointer', display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: 6,
              }}>
                Go to Documents <i className="pi pi-arrow-right" style={{ fontSize: 10 }} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Toast */}
      {globalToast && (
        <div style={{
          position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
          zIndex: 1000, minWidth: 340, maxWidth: 500,
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '14px 18px', borderRadius: 6,
          background: globalToast.type === 'success' ? '#ECFAE8' : '#FFF5F5',
          borderLeft: `4px solid ${globalToast.type === 'success' ? '#2E8120' : '#EB1000'}`,
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
          fontFamily: "'Open Sans', sans-serif",
        }}>
          <i className={`pi ${globalToast.type === 'success' ? 'pi-check' : 'pi-exclamation-circle'}`}
            style={{ fontSize: 18, color: globalToast.type === 'success' ? '#2E8120' : '#EB1000', flexShrink: 0 }} />
          <span style={{ flex: 1, fontSize: 13, color: '#171D22', lineHeight: '18px' }}>
            {globalToast.message}
          </span>
          <button onClick={() => setGlobalToast(null)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#555D64', padding: 4, flexShrink: 0,
          }}>
            <i className="pi pi-times" style={{ fontSize: 12 }} />
          </button>
        </div>
      )}
    </div>
  );

  if (tweaks.showAppShell) {
    return (
      <React.Fragment>
        <ClearAppShell>{content}</ClearAppShell>
        {tweaksVisible && tweaksPanel}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {content}
      {tweaksVisible && tweaksPanel}
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<TaskListApp2 />);
