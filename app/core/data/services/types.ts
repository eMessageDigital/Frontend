export type Plan = {
	title: string;
	items: string[];
	price: string;
	buttonText: string;
	theme: "dark" | "light";
};

export type Tool = {
	title: string;
	description: string;
	imageSrc: string;
};

export type ServiceData = {
	hero: {
		title: string;
		subtitle: string;
		about: string;
		buttonText: string;
	};
	plans: {
		title: string;
		list: Plan[];
		href: string;
	};
	tools: {
		title: string;
		list: Tool[];
	};
};
