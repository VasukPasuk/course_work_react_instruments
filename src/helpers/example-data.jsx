import {fmtDate} from "./functions.jsx";

const INITIAL_TODOS = [
	{
		id: 1,
		text: "Розробити новий лендінг",
		done: false,
		priority: "high",
		deadline: fmtDate(1),
		category: "Робота",
		tags: ["дизайн", "ui"],
		created: Date.now() - 3e5
	},
	{
		id: 2,
		text: "Переглянути pull requests",
		done: true,
		priority: "med",
		deadline: "",
		category: "Робота",
		tags: ["код"],
		created: Date.now() - 6e5
	},
	{
		id: 3,
		text: "Зробити покупки",
		done: false,
		priority: "low",
		deadline: fmtDate(3),
		category: "Особисте",
		tags: [],
		created: Date.now() - 1e5
	},
	{
		id: 4,
		text: "Зустріч із командою",
		done: false,
		priority: "high",
		deadline: fmtDate(-1),
		category: "Робота",
		tags: ["зустріч"],
		created: Date.now() - 9e5
	},
];

export default INITIAL_TODOS;