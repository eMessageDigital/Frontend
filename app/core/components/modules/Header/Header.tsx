"use client";

import { useState } from "react";
import styles from "./Header.module.scss";

import Image from "next/image";
import { Button, Container, HoverLink } from "../..";

export const Header = () => {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<Container>
			<header className={styles.header}>
				<div className={styles["logo-nav"]}>
					<div className={styles.logo}>
						<Image src='/img/logo.svg' alt='Logo' width={42} height={42} />
					</div>

					{/* Гамбургер */}
					<button className={styles.burger} onClick={() => setMenuOpen(true)}>
						<span></span>
						<span></span>
						<span></span>
					</button>

					{/* Навигация */}
					<nav className={`${styles.nav} ${menuOpen ? styles.active : ""}`}>
						{/* Кнопка закрытия */}
						<button className={styles.close} onClick={() => setMenuOpen(false)}>
							×
						</button>

						<HoverLink onClick={() => setMenuOpen(false)} href='/'>
							Главная
						</HoverLink>
						<HoverLink onClick={() => setMenuOpen(false)} href='/services'>
							Услуги
						</HoverLink>
						<HoverLink onClick={() => setMenuOpen(false)} href='#'>
							Кейсы
						</HoverLink>
						<HoverLink onClick={() => setMenuOpen(false)} href='/faq'>
							FAQ
						</HoverLink>
						<HoverLink onClick={() => setMenuOpen(false)} href='/contact'>
							Контакты
						</HoverLink>

						{/* Мобильные кнопки */}
						<div className={styles.mobileButtons}>
							<Button className={styles.login}>Вход</Button>
							<Button className={styles.signin}>Регистрация</Button>
						</div>
					</nav>
				</div>

				{/* Десктопные кнопки */}
				<div className={styles.buttons}>
					<Button className={styles.login}>Вход</Button>
					<Button className={styles.signin}>Регистрация</Button>
				</div>
			</header>
		</Container>
	);
};
