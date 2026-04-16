export default function Badge({ label, color, bg }) {
	return (
		<span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 10, background: bg, color, letterSpacing: "0.04em", textTransform: "uppercase" }}>
      {label}
    </span>
	);
}