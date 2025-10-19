"use client";

import { useState } from "react";
import styles from "./Header.module.scss";

import Image from "next/image";
import { Button, Container, HoverLink, MiniProfile } from "../..";
import { useDispatch } from "react-redux";
import { openModal } from "../../../store/slices/modalSlice";
import Link from "next/link";
import { useProfile } from "../../backend/hooks/useProfile";

export const Header = () => {
	const dispatch = useDispatch();

	const { user, isLoading } = useProfile();

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
						<Link href='/'>
							<Image
								className={styles.logoImg}
								src='/img/logo.svg'
								alt='Logo'
								width={78}
								height={30}
							/>
						</Link>
					</div>

					<button className={styles.burger} onClick={() => setMenuOpen(true)}>
						<span></span>
						<span></span>
						<span></span>
					</button>

					<nav className={`${styles.nav} ${menuOpen ? styles.active : ""}`}>
						<button className={styles.close} onClick={() => setMenuOpen(false)}>
							×
						</button>

						<HoverLink onClick={() => setMenuOpen(false)} href='/'>
							Главная
						</HoverLink>
						<HoverLink onClick={() => setMenuOpen(false)} href='/services'>
							Услуги
						</HoverLink>
						{/* <HoverLink onClick={() => setMenuOpen(false)} href='#'>
							Кейсы
						</HoverLink> */}
						<HoverLink onClick={() => setMenuOpen(false)} href='/faq'>
							FAQ
						</HoverLink>
						<HoverLink onClick={() => setMenuOpen(false)} href='/contact'>
							Контакты
						</HoverLink>

						<div className={styles.mobileButtons}>
							{user ? (
								<span onClick={() => setMenuOpen(false)}>
									<MiniProfile user={user} />
								</span>
							) : (
								<>
									<Button onClick={loginModal} className={styles.login}>
										Вход
									</Button>
									<Button onClick={signinModal} className={styles.signin}>
										Регистрация
									</Button>
								</>
							)}
						</div>
					</nav>
				</div>

				<div className={styles.buttons}>
					{isLoading ? (
						<MiniProfile loading={true} user={user} />
					) : user ? (
						<MiniProfile user={user} />
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
