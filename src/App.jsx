import {useMemo, useState} from 'react'
import {PRIO_ORDER, THEMES} from "./helpers/consts.jsx";
import Modal from "./components/Modal.jsx";
import TodoItem from "./components/TodoButton.jsx";
import INITIAL_TODOS from "./helpers/example-data.jsx";

export default function TodoApp() {
	const [todos, setTodos] = useState(INITIAL_TODOS);
	const [filter, setFilter] = useState("all");
	const [catFilter, setCatFilter] = useState("all");
	const [sortBy, setSortBy] = useState("created");
	const [searchQ, setSearchQ] = useState("");
	const [theme, setTheme] = useState("dark");
	const [modalOpen, setModalOpen] = useState(false);
	const [editTodo, setEditTodo] = useState(null);
	
	const t = THEMES[theme];
	
	const categories = useMemo(() => [...new Set(todos.map(x => x.category).filter(Boolean))], [todos]);
	
	const visible = useMemo(() => {
		let list = todos.filter(todo => {
			if (filter === "active") return !todo.done;
			if (filter === "done") return todo.done;
			if (filter === "overdue") return !todo.done && deadlineStatus(todo.deadline) === "overdue";
			return true;
		});
		if (catFilter !== "all") list = list.filter(t => t.category === catFilter);
		if (searchQ) {
			const q = searchQ.toLowerCase();
			list = list.filter(t => t.text.toLowerCase().includes(q) || t.tags.some(g => g.toLowerCase().includes(q)));
		}
		return [...list].sort((a, b) => {
			if (sortBy === "priority") return PRIO_ORDER[a.priority] - PRIO_ORDER[b.priority];
			if (sortBy === "deadline") {
				if (!a.deadline) return 1;
				if (!b.deadline) return -1;
				return a.deadline.localeCompare(b.deadline);
			}
			return b.created - a.created;
		});
	}, [todos, filter, catFilter, searchQ, sortBy]);
	
	const activeCount = todos.filter(t => !t.done).length;
	const doneCount = todos.filter(t => t.done).length;
	const pct = todos.length ? Math.round((doneCount / todos.length) * 100) : 0;
	
	const toggle = id => setTodos(prev => prev.map(t => t.id === id ? {...t, done: !t.done} : t));
	const remove = id => setTodos(prev => prev.filter(t => t.id !== id));
	
	const openAdd = () => {
		setEditTodo(null);
		setModalOpen(true);
	};
	const openEdit = todo => {
		setEditTodo(todo);
		setModalOpen(true);
	};
	const closeModal = () => setModalOpen(false);
	
	const saveModal = (data) => {
		if (editTodo) {
			setTodos(prev => prev.map(t => t.id === editTodo.id ? {...t, ...data} : t));
		} else {
			setTodos(prev => [{id: Date.now(), done: false, created: Date.now(), ...data}, ...prev]);
		}
		setModalOpen(false);
	};
	
	const mono = "'DM Mono', monospace";
	const filters = [
		{key: "all", label: "Всі"},
		{key: "active", label: "Активні"},
		{key: "done", label: "Виконані"},
		{key: "overdue", label: "Прострочені"},
	];
	
	return (
		<div style={{
			height: "100",
			background: t.bg,
			width: "100%",
			color: t.text,
			fontFamily: mono,
			margin: '0 auto',
			display: "flex",
			justifyContent: "center",
			padding: "5rem 0rem",
			transition: "background 0.25s",
		}}>
			<div style={{display: 'flex', flexDirection: 'column', width: "100%", maxWidth: 1000, gap: 8}}>
				
				{/* Header */}
				<div
					style={{display: "flex", justifyContent: "space-between", alignItems: "flex-start"}}>
					<div>
						<h1 style={{
							fontFamily: "'DM Serif Display', serif",
							fontSize: "2.8rem",
							lineHeight: 1.05,
							color: t.text,
							margin: 0
						}}>
							Tasks manager
						</h1>
						<p style={{marginTop: "0.45rem", fontSize: 12, color: t.text3, letterSpacing: "0.04em"}}>
							{activeCount} залишилось · {doneCount} виконано
						</p>
					</div>
					<button onClick={() => setTheme(th => th === "dark" ? "light" : "dark")} style={{
						background: t.bg3, border: `1px solid ${t.border}`, borderRadius: 20,
						color: t.text2, fontFamily: mono, fontSize: 12,
						padding: "6px 14px", cursor: "pointer",
						transition: "border-color 0.15s",
					}}>
						{theme === "dark" ? "☀ Світла" : "🌙 Темна"}
					</button>
				</div>
				
				{/* Progress */}
				<div style={{marginBottom: "1.25rem"}}>
					<div
						style={{display: "flex", justifyContent: "space-between", fontSize: 11, color: t.text3, marginBottom: 5}}>
						<span>Прогрес</span><span>{pct}%</span>
					</div>
					<div style={{height: 4, background: t.border2, borderRadius: 2, overflow: "hidden"}}>
						<div style={{
							height: "100%",
							width: `${pct}%`,
							background: t.accent,
							borderRadius: 2,
							transition: "width 0.4s ease"
						}}/>
					</div>
				</div>
				
				{/* Search */}
				<div style={{display: 'flex'}}>
					<input value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Пошук завдань..."
					       style={{
						       width: "100%",
						       background: t.bg3,
						       border: `1px solid ${t.border}`,
						       borderRadius: 6,
						       color: t.text,
						       fontFamily: mono,
						       fontSize: 13,
						       padding: "10px 20px",
						       outline: "none"
					       }}/>
				</div>
				
				
				{/* Add button */}
				<button onClick={openAdd} style={{
					width: "100%", background: t.accent, color: t.accentText, border: "none", borderRadius: 6,
					fontFamily: mono, fontSize: 13, fontWeight: 500, padding: 11,
					cursor: "pointer", letterSpacing: "0.04em",
				}}>+ Додати завдання
				</button>
				
				{/* Category pills */}
				<div style={{display: "flex", gap: 6, flexWrap: "wrap"}}>
					{["all", ...categories].map(c => (
						<button key={c} onClick={() => setCatFilter(c)} style={{
							background: catFilter === c ? t.accent : t.tagBg,
							border: `1px solid ${catFilter === c ? t.accent : t.border}`,
							borderRadius: 20, color: catFilter === c ? t.accentText : t.tagText,
							fontFamily: mono, fontSize: 11, padding: "4px 12px",
							cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.05em",
							transition: "all 0.15s",
						}}>{c === "all" ? "Всі" : c}</button>
					))}
				</div>
				
				{/* Status filters + sort */}
				<div style={{display: "flex", gap: 4, flexWrap: "wrap", alignItems: "center"}}>
					{filters.map(f => (
						<button key={f.key} onClick={() => setFilter(f.key)} style={{
							background: filter === f.key ? t.bg2 : "none",
							border: `1px solid ${filter === f.key ? t.accent : t.border}`,
							borderRadius: 4, color: filter === f.key ? t.accent : t.text3,
							fontFamily: mono, fontSize: 11, letterSpacing: "0.06em",
							padding: "5px 12px", cursor: "pointer", textTransform: "uppercase",
							transition: "all 0.15s",
						}}>{f.label}</button>
					))}
					<select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{
						marginLeft: "auto", background: t.bg3, border: `1px solid ${t.border}`,
						borderRadius: 4, color: t.text2, fontFamily: mono, fontSize: 11,
						padding: "5px 8px", cursor: "pointer", outline: "none",
					}}>
						<option value="created">За датою</option>
						<option value="priority">За пріоритетом</option>
						<option value="deadline">За дедлайном</option>
					</select>
				</div>
				
				{/* List */}
				<div>
					{visible.length === 0 ? (
						<div style={{
							textAlign: "center",
							padding: "3rem 0",
							color: t.text3,
							fontSize: 12,
							letterSpacing: "0.06em",
							textTransform: "uppercase"
						}}>
							{searchQ ? "Нічого не знайдено" : filter === "overdue" ? "Немає прострочених" : "Завдань немає"}
						</div>
					) : visible.map(todo => (
						<TodoItem
							key={todo.id}
							todo={todo}
							searchQ={searchQ}
							t={t}
							onToggle={() => toggle(todo.id)}
							onEdit={() => openEdit(todo)}
							onDelete={() => remove(todo.id)}
						/>
					))}
				</div>
				
				{/* Footer */}
				<div style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					paddingTop: "1rem",
					borderTop: `1px solid ${t.border2}`,
					fontSize: 11,
					color: t.text3,
					letterSpacing: "0.04em"
				}}>
					<span>{activeCount} завдань залишилось</span>
					<button onClick={() => setTodos(prev => prev.filter(t => !t.done))} disabled={doneCount === 0} style={{
						background: "none", border: "none", color: t.text3,
						fontFamily: mono, fontSize: 11, cursor: doneCount === 0 ? "default" : "pointer",
						letterSpacing: "0.04em", opacity: doneCount === 0 ? 0.35 : 1,
						transition: "color 0.15s", padding: 0,
					}}>Очистити виконані
					</button>
				</div>
			</div>
			
			{/* Modal */}
			<Modal open={modalOpen} onClose={closeModal} onSave={saveModal} initial={editTodo} t={t}/>
		</div>
	);
}
 