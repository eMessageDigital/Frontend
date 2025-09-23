import React from "react";
import styles from "./Content.module.scss";
import { Container } from "../../..";

export default function Content() {
	return (
		<div className={styles.contentWrapper}>
			<Container>
				<div className={styles.top}>
					<div className={styles.column}>
						<p>О нас</p>
						<p>Наши услуги</p>
					</div>

					<div className={styles.column}>
						<p>Кейсы</p>
						<p>Контакты</p>
					</div>

					<div className={styles.column}>
						<p>Оферта</p>
						<p>Политика конфиденциальности</p>
					</div>

					<div className={styles.column}>
						<p>+7 (995) 933-83-72</p>
						<p>emessage.adt@yandex.ru</p>
					</div>
				</div>

				<div className={styles.divider}></div>

				<div className={styles.bottom}>
					<h1>eMessage</h1>
				</div>
			</Container>
		</div>
	);
}
