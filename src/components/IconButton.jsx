import {useState} from "react";

export default function IconBtn({ children, onClick, t, danger, title }) {
	const [hov, setHov] = useState(false);
	return (
		<button onClick={onClick} title={title} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{
			background: hov ? t.bg3 : "none", border: "none",
			color: hov ? (danger ? t.del : t.text2) : t.text4,
			cursor: "pointer", fontSize: 15, padding: "3px 6px",
			borderRadius: 4, transition: "all 0.15s", lineHeight: 1,
			fontFamily: "'DM Mono', monospace",
		}}>{children}</button>
	);
}