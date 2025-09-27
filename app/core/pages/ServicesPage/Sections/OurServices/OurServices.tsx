import styles from "./OurServices.module.scss";

import React from "react";
import Card from "./ui/Card";
import { Container } from "../../../../components";

export default function OurServices() {
	return (
		<div className={styles.one}>
			<Container className={styles.container}>
				<h1 className={styles.title}>
					Выбор <br /> социальной сети
				</h1>
				<div className={styles.servicesList}>
					<Card
						src={"/ico/companies/tg.svg"}
						title={"Telegram"}
						description={
							"Рассылка в Telegram — персональные сообщения в личные чаты, которые привлекают внимание, вызывают отклик и приводят клиентов."
						}
						buttonText={"Перейти"}
						buttonLink={"/services/telegram"}
					/>
					<Card
						src={"/ico/companies/whatsapp.svg"}
						title={"WhatsApp"}
						description={
							"Рассылка в WhatsApp — мгновенная доставка персонализированных сообщений, которые читают все, удерживают внимание и стимулируют продажи."
						}
						buttonText={"Перейти"}
						buttonLink={"/services/whatsapp"}
					/>
					<Card
						src={"/ico/companies/vk.svg"}
						title={"VK"}
						description={
							"Рассылка во ВКонтакте — прямое обращение к аудитории, которое повышает вовлечённость, вызывает отклик и помогает привлекать клиентов."
						}
						buttonText={"Перейти"}
						buttonLink={"/services/vk"}
					/>
				</div>
			</Container>
		</div>
	);
}
