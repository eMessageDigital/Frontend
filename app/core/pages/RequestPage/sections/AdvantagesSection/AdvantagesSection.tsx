import React from "react";

import styles from "./AdvantagesSection.module.scss";
import { Container } from "@/app/core/components";
import Card from "./ui/Card";

export default function AdvantagesSection() {
	return (
		<Container className={styles.container}>
			<h1 className={styles.sectionTitle}>
				Преимущества <br />
				работы с нами
			</h1>
			<div className={styles.cards}>
				<Card
					title={"Быстро"}
					text={"Мгновенная доставка сообщений вашей аудитории без задержек."}
					src={"/ico/speed.png"}
					variant='primary'
				/>
				<Card
					title={"Безопасно"}
					text={"Надежная защита данных и гарантированная конфиденциальность."}
					src={"/ico/close.png"}
					variant='primary'
				/>
				<Card
					title={"Лояльно"}
					text={"Бережное отношение к вашей базе клиентов, без спама и блокировок."}
					src={"/ico/smile.png"}
					variant='light'
				/>
				<Card
					title={"Поддержка 24/7"}
					text={"Оперативная помощь в любое время суток и по любому вопросу."}
					src={"/ico/monitortime.png"}
					variant='light'
				/>
			</div>
		</Container>
	);
}
