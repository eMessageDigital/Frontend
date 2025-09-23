import { Container } from "@/app/core/components";
import styles from "./OurServices.module.scss";

import React from "react";
import Card from "./ui/Card";

export default function OurServices() {
	return (
		<Container className={styles.container}>
			<h1 className={styles.title}>
				Выбор <br /> социальной сети
			</h1>
			<div className={styles.servicesList}>
				<Card
					src={"/ico/companies/tg.png"}
					title={"Telegram"}
					description={
						"Мы создаём персонализированные рассылки, которые цепляют внимание, вызывают отклик и приводят клиентов."
					}
					buttonText={"Перейти"}
					buttonLink={"/services/telegram"}
				/>
				<Card
					src={"/ico/companies/whatsapp.png"}
					title={"WhatsApp"}
					description={
						"Мы создаём персонализированные рассылки, которые цепляют внимание, вызывают отклик и приводят клиентов."
					}
					buttonText={"Перейти"}
					buttonLink={"/services/whatsapp"}
				/>
				<Card
					src={"/ico/companies/vk.png"}
					title={"VK"}
					description={
						"Мы создаём персонализированные рассылки, которые цепляют внимание, вызывают отклик и приводят клиентов."
					}
					buttonText={"Перейти"}
					buttonLink={"/services/vk"}
				/>
			</div>
		</Container>
	);
}
