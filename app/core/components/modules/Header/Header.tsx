import styles from "./Header.module.scss";

import Image from "next/image";
import Link from "next/link";
import { Button, Container, HoverLink } from "../..";

export const Header = () => {
	return (
		<header className={styles.headerWrapper}>
			<Container className={styles.header}>
				<div className={styles["logo-nav"]}>
					<div className={styles.logo}>
						<Image src='/img/logo.png' alt='Logo' width={42} height={42} />
					</div>

					<nav className={styles.nav}>
						<HoverLink href='/'>Главная</HoverLink>
						<HoverLink href='/services'>Услуги</HoverLink>
						<HoverLink href='#'>Кейсы</HoverLink>
						<HoverLink href='/faq'>FAQ</HoverLink>
						<HoverLink href='#'>Контакты</HoverLink>
					</nav>
				</div>

				<div className={styles.buttons}>
					<Button className={styles.login}>Вход</Button>
					<Button className={styles.signin}>Регистрация</Button>
				</div>
			</Container>
		</header>
	);
};
