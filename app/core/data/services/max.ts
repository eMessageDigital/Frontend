import { ServiceData } from "./types";

export const max: ServiceData & {
	extraServices: { id: string; name: string; dependsOn?: string }[];
} = {
	hero: {
		title: "MAX",
		subtitle: "Инвайтинг пользователей \nв чаты MAX",
		about: "Приглашаем живых пользователей \nчерез безопасный инвайтинг",
		buttonText: "Выбрать тариф",
	},
	plans: {
		title: "Инвайтинг в Макс",
		list: [
			{
				title: "Инвайтинг пользователей в чаты MAX",
				items: [
					"Приглашаем живых пользователей в чаты MAX",
					"Работаем через безопасный инвайтинг без спама",
					"Помогаем быстро набрать аудиторию",
					"Подходит для проверки гипотез и теста ниши",
				],
				price: "7₽ / подписчик",
				buttonText: "Перейти к оформлению",
				theme: "light",
			},
		],
		href: "",
	},
	tools: {
		title: "Инструменты MAX",
		list: [
			{
				title: "Точный подбор аудитории",
				description: "Подбираем релевантные чаты и сегменты для инвайтинга под вашу нишу.",
				imageSrc: "/ico/tools/people.svg",
			},
			{
				title: "Безопасный сценарий запуска",
				description: "Выстраиваем инвайтинг с учетом лимитов, чтобы минимизировать риски блокировок.",
				imageSrc: "/ico/tools/magnifier.svg",
			},
			{
				title: "Отслеживание отклика",
				description:
					"Фиксируем динамику прироста, чтобы вы могли оценить эффективность и скорректировать воронку.",
				imageSrc: "/ico/tools/messages.svg",
			},
		],
	},
	extraServices: [],
};
