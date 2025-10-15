import React from "react";
import { FaBriefcase } from "react-icons/fa";
import styles from "./CasesSection.module.scss";
import Image from "next/image";
import { Container, TrendCard } from "../../../../components";

const trendData1 = [
	{ value: 20 },
	{ value: 40 },
	{ value: 75 },
	{ value: 130 },
	{ value: 110 },
	{ value: 160 },
	{ value: 200 },
];
const trendData2 = [
	{ value: 20 },
	{ value: 60 },
	{ value: 90 },
	{ value: 30 },
	{ value: 90 },
	{ value: 130 },
	{ value: 200 },
];
const trendData3 = [
	{ value: 80 },
	{ value: 20 },
	{ value: 50 },
	{ value: 123 },
	{ value: 190 },
	{ value: 300 },
	{ value: 280 },
];
const trendData4 = [
	{ value: 20 },
	{ value: 40 },
	{ value: 70 },
	{ value: 90 },
	{ value: 130 },
	{ value: 150 },
	{ value: 200 },
];

export default function CasesSection() {
	return (
		<Container className={styles.sectionContainer}>
			<h1 id='cases' className={styles.sectionTitle}>
				<span className={styles.titleRow}>
					Кейсы
					<FaBriefcase className={styles.icon} size={42} color='#4EBAC3' />, которые
				</span>
				<br />
				говорят сами за себя
			</h1>
			<div className={styles.cardsWrapper}>
				<div className={styles.card}>
					<Image src={"/ico/companies/vk.svg"} width={60} height={60} alt='icon'></Image>
					<h1>Запуск продукта во VK</h1>
					<p>Более 5000 подписчиков за 2 недели</p>
				</div>
				<div className={styles.card}>
					<Image src={"/ico/trandmonitor.svg"} width={60} height={60} alt='icon'></Image>
					<h1>Рекламная кампания</h1>
					<p>+40% к конверсии за месяц</p>
				</div>
				<div className={styles.card}>
					<Image src={"/ico/cart.svg"} width={60} height={60} alt='icon'></Image>
					<h1>Онлайн-магазин</h1>
					<p>950+ заказов за 7 дней</p>
				</div>
				<div className={styles.bigCard}>
					<TrendCard
						title='Конверсия'
						number='3,2%'
						stats='+19,5%'
						description=' за месяц'
						data={trendData1}
					/>
					<TrendCard
						title='Лидогенерация'
						number='952 заявки'
						stats='+22,1%'
						description=' к прошлому периоду'
						data={trendData2}
					/>
					<TrendCard
						title='Охваты'
						number='67 тыс.'
						stats='+16,5%'
						description='за неделю'
						data={trendData3}
					/>
					<TrendCard
						title='ROI / ROMI'
						number='X2,7'
						description='рост прибыли с рекламы'
						data={trendData4}
					/>
				</div>
			</div>
		</Container>
	);
}
