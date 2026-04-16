function today() {
	return new Date().toISOString().split("T")[0];
}

function fmtDate(daysOffset) {
	const d = new Date();
	d.setDate(d.getDate() + daysOffset);
	return d.toISOString().split("T")[0];
}

function deadlineStatus(dl) {
	if (!dl) return null;
	if (dl < today()) return "overdue";
	const diff = (new Date(dl) - new Date(today())) / 86400000;
	return diff <= 2 ? "soon" : "ok";
}

function formatDeadline(dl) {
	if (!dl) return "";
	const [y, m, d] = dl.split("-");
	return `${d}.${m}.${y}`;
}

function highlight(text, q) {
	if (!q) return <span>{text}</span>;
	const idx = text.toLowerCase().indexOf(q.toLowerCase());
	if (idx === -1) return <span>{text}</span>;
	return (
		<span>
      {text.slice(0, idx)}
			<mark style={{ background: "rgba(200,240,100,0.28)", color: "inherit", borderRadius: 2 }}>
        {text.slice(idx, idx + q.length)}
      </mark>
			{text.slice(idx + q.length)}
    </span>
	);
}

export {
	today,
	fmtDate,
	deadlineStatus,
	formatDeadline,
	highlight
}