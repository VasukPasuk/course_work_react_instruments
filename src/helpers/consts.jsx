const PRIO_ORDER = { high: 0, med: 1, low: 2 };

const THEMES = {
	dark: {
		bg: "#0e0e0e", bg2: "#141414", bg3: "#1a1a1a",
		border: "#2a2a2a", border2: "#1e1e1e",
		text: "#f0ede6", text2: "#c8c5be", text3: "#555", text4: "#3a3a3a",
		accent: "#c8f064", accentHover: "#d8ff70", accentText: "#0e0e0e",
		del: "#e05555", tagBg: "#1e1e1e", tagText: "#777",
		modalBg: "rgba(0,0,0,0.72)",
		pHigh: "#e05555", pMed: "#e09a30", pLow: "#4a9ade",
		pHighBg: "rgba(224,85,85,0.12)", pMedBg: "rgba(224,154,48,0.12)", pLowBg: "rgba(74,154,222,0.12)",
		overdue: "#e05555", soon: "#e09a30",
	},
	light: {
		bg: "#f4f1ea", bg2: "#ffffff", bg3: "#f0ede5",
		border: "#ddd8ce", border2: "#e8e4dc",
		text: "#1a1a1a", text2: "#444", text3: "#999", text4: "#ccc",
		accent: "#5a9e00", accentHover: "#4a8800", accentText: "#ffffff",
		del: "#c0392b", tagBg: "#ede9e0", tagText: "#777",
		modalBg: "rgba(0,0,0,0.35)",
		pHigh: "#c0392b", pMed: "#c07a00", pLow: "#2170b0",
		pHighBg: "rgba(192,57,43,0.08)", pMedBg: "rgba(192,122,0,0.08)", pLowBg: "rgba(33,112,176,0.08)",
		overdue: "#c0392b", soon: "#c07a00",
	},
};

const prioLabel = { high: "висока", med: "середня", low: "низька" };


export {
	PRIO_ORDER,
	THEMES,
	prioLabel
}