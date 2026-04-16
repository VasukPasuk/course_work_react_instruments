import CheckBtn from "./CheckButton.jsx";
import Badge from "./Badge.jsx";
import {prioLabel} from "../helpers/consts.jsx";
import {deadlineStatus, formatDeadline, highlight} from "../helpers/functions.jsx";
import IconBtn from "./IconButton.jsx";

export default function TodoItem({todo, onToggle, onEdit, onDelete, searchQ, t}) {
	const ds = deadlineStatus(todo.deadline);
	const pColor = todo.priority === "high" ? t.pHigh : todo.priority === "med" ? t.pMed : t.pLow;
	const pBg = todo.priority === "high" ? t.pHighBg : todo.priority === "med" ? t.pMedBg : t.pLowBg;
	
	return (
		<div style={{
			display: "flex", alignItems: "flex-start", gap: 12,
			background: t.bg2, border: `1px solid ${t.border2}`,
			borderRadius: 8, padding: "12px 14px", marginBottom: 5,
			opacity: todo.done ? 0.45 : 1,
			transition: "border-color 0.15s, opacity 0.2s",
		}}>
			{/* Priority bar */}
			<div style={{width: 3, borderRadius: 3, alignSelf: "stretch", flexShrink: 0, minHeight: 20, background: pColor}}/>
			
			<CheckBtn checked={todo.done} onToggle={onToggle} t={t}/>
			
			<div style={{flex: 1, minWidth: 0}}>
				<div style={{
					fontSize: 13, lineHeight: 1.5, wordBreak: "break-word",
					color: todo.done ? t.text3 : t.text2,
					textDecoration: todo.done ? "line-through" : "none",
				}}>
					{highlight(todo.text, searchQ)}
				</div>
				<div style={{display: "flex", alignItems: "center", gap: 6, marginTop: 6, flexWrap: "wrap"}}>
					<Badge label={prioLabel[todo.priority]} color={pColor} bg={pBg}/>
					{todo.category && <Badge label={todo.category} color={t.tagText} bg={t.tagBg}/>}
					{todo.tags.map(g => <Badge key={g} label={g} color={t.tagText} bg={t.tagBg}/>)}
					{todo.deadline && (
						<span style={{
							fontSize: 10, display: "flex", alignItems: "center", gap: 3,
							color: ds === "overdue" ? t.overdue : ds === "soon" ? t.soon : t.text3,
						}}>
              📅 {formatDeadline(todo.deadline)}
							{ds === "overdue" && " (прострочено)"}
							{ds === "soon" && " (скоро)"}
            </span>
					)}
				</div>
			</div>
			
			<div style={{display: "flex", gap: 2, flexShrink: 0, marginTop: 1}}>
				<IconBtn title="Редагувати" onClick={onEdit} t={t}>✎</IconBtn>
				<IconBtn title="Видалити" onClick={onDelete} t={t} danger>×</IconBtn>
			</div>
		</div>
	);
}