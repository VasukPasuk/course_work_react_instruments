export default function CheckBtn({checked, onToggle, t}) {
	return (
		<button onClick={onToggle} style={{
			width: 18, height: 18, borderRadius: "50%",
			border: `1.5px solid ${checked ? t.accent : t.border}`,
			background: checked ? t.accent : "none",
			cursor: "pointer", flexShrink: 0,
			display: "flex", alignItems: "center", justifyContent: "center",
			padding: 0, marginTop: 2, transition: "all 0.15s",
		}}>
			{checked && (
				<svg width="8" height="8" viewBox="0 0 8 8" fill="none">
					<path d="M1 4L3 6L7 2" stroke={t.accentText} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
				</svg>
			)}
		</button>
	);
}