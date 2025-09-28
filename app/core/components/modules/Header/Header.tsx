"use client";

import { useState } from "react";
import styles from "./Header.module.scss";

import Image from "next/image";
import { Button, Container, HoverLink, Profile } from "../..";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../../store/slices/modalSlice";
import { rootState } from "../../../store";

export const Header = () => {
	const dispatch = useDispatch();
	const user = useSelector((state: rootState) => state.auth.user);

	const [menuOpen, setMenuOpen] = useState(false);

	const loginModal = () => {
		setMenuOpen(false);
		dispatch(openModal("login"));
	};

	const signinModal = () => {
		setMenuOpen(false);
		dispatch(openModal("register"));
	};

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
							<Button onClick={loginModal} className={styles.login}>
								Вход
							</Button>
							<Button onClick={signinModal} className={styles.signin}>
								Регистрация
							</Button>
						</div>
					</nav>
				</div>

				{/* Десктопные кнопки */}
				<div className={styles.buttons}>
					{user ? (
						<Profile />
					) : (
						<>
							<Button onClick={() => dispatch(openModal("login"))} className={styles.login}>
								Вход
							</Button>
							<Button onClick={() => dispatch(openModal("register"))} className={styles.signin}>
								Регистрация
							</Button>
						</>
					)}
				</div>
			</header>
		</Container>
	);
};
