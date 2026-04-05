import React from "react";
import Link from "next/link";
import styles from "./Content.module.scss";
import { Container } from "../../..";

export default function Content() {
	const MAX_LINK =
		"https://max.ru/u/f9LHodD0cOJ8hbNzSUB1LpUdBTJ0tAAGGUsVJKchLw4F9AkCVjBvMOPSKbY";

	return (
		<div className={styles.contentWrapper}>
			<Container>
				<div className={styles.top}>
					<div className={styles.column}>
						<Link href='/#about'>О нас</Link>
						<Link href='/services'>Наши услуги</Link>
					</div>

					<div className={styles.column}>
						<Link href='/#cases'>Кейсы</Link>
						<Link href='/contact'>Контакты</Link>
					</div>

					<div className={styles.column}>
						<Link href='/privacy-policy'>Политика конфиденциальности</Link>
						<Link href='/personal-data'>Обработка и хранение персональных данных</Link>
					</div>

					<div className={styles.column}>
						<a href='tel:+79959338372'>+7 (995) 933-83-72</a>
						<a href='https://t.me/emessage_advt' target='_blank' rel='noopener noreferrer'>
							Telegram: @emessage_advt
						</a>
						<a href={MAX_LINK} target='_blank' rel='noopener noreferrer'>
							MAX: перейти в профиль
						</a>
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
