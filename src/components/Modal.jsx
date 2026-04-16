import {useEffect, useRef, useState} from "react";

export default function Modal({open, onClose, onSave, initial, t}) {
	const [text, setText] = useState("");
	const [priority, setPriority] = useState("med");
	const [deadline, setDeadline] = useState("");
	const [category, setCategory] = useState("");
	const [tagInput, setTagInput] = useState("");
	const [tags, setTags] = useState([]);
	const inputRef = useRef(null);
	
	useEffect(() => {
		if (open) {
			setText(initial?.text ?? "");
			setPriority(initial?.priority ?? "med");
			setDeadline(initial?.deadline ?? "");
			setCategory(initial?.category ?? "");
			setTags(initial?.tags ? [...initial.tags] : []);
			setTagInput("");
			setTimeout(() => inputRef.current?.focus(), 50);
		}
	}, [open, initial]);
	
	const addTag = () => {
		const v = tagInput.trim();
		if (!v || tags.includes(v)) return;
		setTags(prev => [...prev, v]);
		setTagInput("");
	};
	
	const save = () => {
		if (!text.trim()) {
			inputRef.current?.focus();
			return;
		}
		onSave({text: text.trim(), priority, deadline, category: category.trim(), tags});
	};
	
	const prios = [
		{key: "high", label: "🔴 Висока", color: t.pHigh, bg: t.pHighBg},
		{key: "med", label: "🟡 Середня", color: t.pMed, bg: t.pMedBg},
		{key: "low", label: "🔵 Низька", color: t.pLow, bg: t.pLowBg},
	];
	
	const field = {marginBottom: "1rem"};
	const labelStyle = {
		display: "block",
		fontSize: 11,
		color: t.text3,
		textTransform: "uppercase",
		letterSpacing: "0.08em",
		marginBottom: 5
	};
	const inputStyle = {
		width: "100%",
		background: t.bg3,
		border: `1px solid ${t.border}`,
		borderRadius: 6,
		color: t.text,
		fontFamily: "'DM Mono', monospace",
		fontSize: 13,
		padding: "9px 12px",
		outline: "none"
	};
	
	return (
		<div onClick={e => e.target === e.currentTarget && onClose()} style={{
			position: "fixed", inset: 0, background: t.modalBg,
			display: "flex", alignItems: "center", justifyContent: "center",
			zIndex: 100, padding: "1rem",
			opacity: open ? 1 : 0, pointerEvents: open ? "all" : "none",
			transition: "opacity 0.2s",
		}}>
			<div style={{
				background: t.bg2, border: `1px solid ${t.border}`,
				borderRadius: 12, padding: "1.5rem", width: "100%", maxWidth: 440,
				transform: open ? "translateY(0)" : "translateY(12px)", transition: "transform 0.2s",
			}}>
				<h2
					style={{fontFamily: "'DM Serif Display', serif", fontSize: "1.4rem", color: t.text, marginBottom: "1.25rem"}}>
					{initial ? "Редагувати завдання" : "Нове завдання"}
				</h2>
				
				<div style={field}>
					<label style={labelStyle}>Завдання</label>
					<input ref={inputRef} style={inputStyle} value={text} onChange={e => setText(e.target.value)}
					       onKeyDown={e => e.key === "Enter" && save()} placeholder="Що потрібно зробити?"/>
				</div>
				
				<div style={field}>
					<label style={labelStyle}>Пріоритет</label>
					<div style={{display: "flex", gap: 6}}>
						{prios.map(p => (
							<button key={p.key} onClick={() => setPriority(p.key)} style={{
								flex: 1, padding: 8, borderRadius: 6, cursor: "pointer",
								fontFamily: "'DM Mono', monospace", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em",
								border: `1.5px solid ${priority === p.key ? p.color : t.border}`,
								background: priority === p.key ? p.bg : "none",
								color: priority === p.key ? p.color : t.text3,
								transition: "all 0.15s",
							}}>{p.label}</button>
						))}
					</div>
				</div>
				
				<div style={field}>
					<label style={labelStyle}>Дедлайн</label>
					<input type="date" style={{...inputStyle, colorScheme: "dark"}} value={deadline}
					       onChange={e => setDeadline(e.target.value)}/>
				</div>
				
				<div style={field}>
					<label style={labelStyle}>Категорія</label>
					<input style={inputStyle} value={category} onChange={e => setCategory(e.target.value)}
					       placeholder="Робота, Особисте..."/>
				</div>
				
				<div style={field}>
					<label style={labelStyle}>Теги</label>
					<div style={{display: "flex", gap: 6}}>
						<input style={{...inputStyle, flex: 1}} value={tagInput} onChange={e => setTagInput(e.target.value)}
						       onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addTag())} placeholder="Введіть тег..."/>
						<button onClick={addTag} style={{
							background: t.bg3, border: `1px solid ${t.border}`, borderRadius: 6,
							color: t.text2, fontFamily: "'DM Mono', monospace", fontSize: 13,
							padding: "9px 14px", cursor: "pointer", whiteSpace: "nowrap",
						}}>+ Тег
						</button>
					</div>
					{tags.length > 0 && (
						<div style={{display: "flex", gap: 5, flexWrap: "wrap", marginTop: 7}}>
							{tags.map((g, i) => (
								<span key={i} onClick={() => setTags(prev => prev.filter((_, j) => j !== i))} style={{
									background: t.tagBg, color: t.tagText, fontSize: 11,
									padding: "3px 8px", borderRadius: 10, cursor: "pointer",
									display: "flex", alignItems: "center", gap: 4,
								}}>{g} ✕</span>
							))}
						</div>
					)}
				</div>
				
				<div style={{display: "flex", gap: 8, marginTop: "1.25rem"}}>
					<button onClick={onClose} style={{
						background: "none", border: `1px solid ${t.border}`, borderRadius: 6,
						color: t.text2, fontFamily: "'DM Mono', monospace", fontSize: 13,
						padding: "11px 18px", cursor: "pointer",
					}}>Скасувати
					</button>
					<button onClick={save} style={{
						flex: 1, background: t.accent, color: t.accentText, border: "none",
						borderRadius: 6, fontFamily: "'DM Mono', monospace", fontSize: 13,
						fontWeight: 500, padding: 11, cursor: "pointer",
					}}>Зберегти
					</button>
				</div>
			</div>
		</div>
	);
}