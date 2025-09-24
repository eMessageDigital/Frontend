import React from "react";
import styles from "./ApproachSection.module.scss";

import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { Button, Container } from "../../../../components";
import Link from "next/link";

export default function ApproachSection() {
	return (
		<Container className={styles.sectionContainer}>
			<h1 className={styles.sectionTitle}>
				Как мы помогаем <br /> бизнесу расти
			</h1>
			<div className={styles.cardContainer}>
				<div className={styles.card1}>
					<div>
						<Image
							className={styles.icon}
							src={"/ico/companies/tg.svg"}
							width={48}
							height={48}
							alt='icon'
						/>
						<Image
							className={styles.icon}
							src={"/ico/companies/vk.svg"}
							width={48}
							height={48}
							alt='icon'
						/>
						<Image
							className={styles.icon}
							src={"/ico/companies/whatsapp.svg"}
							width={48}
							height={48}
							alt='icon'
						/>
					</div>
					<h1>
						Рассылка в социальных <br /> сетях
					</h1>
					<p>
						Мы создаём персонализированные рассылки, которые цепляют внимание, вызывают отклик и
						приводят клиентов.
					</p>
				</div>
				<div className={styles.card2}>
					<div className={styles.cardTop}>
						<div className={styles.iconContainer}>
							<Image
								className={styles.icon}
								src={"/ico/companies/soon/yandex.svg"}
								width={48}
								height={48}
								alt='icon'
							/>
							<Image
								className={styles.icon}
								src={"/ico/companies/soon/xz.svg"}
								width={48}
								height={48}
								alt='icon'
							/>
							<Image
								className={styles.icon}
								src={"/ico/companies/soon/vk.svg"}
								width={48}
								height={48}
								alt='icon'
							/>
							<Image
								className={styles.icon}
								src={"/ico/companies/soon/tg.svg"}
								width={48}
								height={48}
								alt='icon'
							/>
						</div>
						{/* <div className={`${styles.badge} ${styles.blue}`}>скоро 🔥</div> */}
					</div>
					<h1>Настройка таргетированной рекламы</h1>
					<p>Точечный таргетинг на вашу целевую аудиторию с оптимизацией бюджета и высоким ROI.</p>
				</div>
				<div className={styles.card3}>
					<div className={styles.cardTop}>
						<Image
							className={styles.icon}
							src={"/ico/companies/soon/trandline.svg"}
							width={48}
							height={48}
							alt='icon'></Image>
						{/* <div className={`${styles.badge} ${styles.dark}`}>скоро 🔥</div> */}
					</div>
					<h1>Развитие проекта под ключ</h1>
					<p>
						Берём ваш проект от идеи до стабильных продаж: стратегия, контент, реклама, аналитика.
					</p>
				</div>
			</div>
			<div className={styles.buttonContainer}>
				<Link href='/services'>
					<Button className={styles.button}>
						Посмотреть все услуги <FaArrowRight style={{ marginLeft: "8px" }} />
					</Button>
				</Link>
			</div>
		</Container>
	);
}
