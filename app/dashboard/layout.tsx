"use client";

import { useSelector, useDispatch } from "react-redux";
import styles from "../core/pages/DashboardPage/Dashboard.module.scss";
import Link from "next/link";
import { rootState } from "../core/store";
import { logout } from "../core/store/slices/authSlice";
import { Container, Sidebar } from "../core/components";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	const user = useSelector((state: rootState) => state.auth.user);
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logout());
	};

	return (
		<Container className={styles.dashboard}>
			<div className={styles.breadcrumbs}>
				<Link href='/'>Главная</Link> / Личный кабинет
			</div>

			<div className={styles.content}>
				<Sidebar onLogout={handleLogout} role='user' />
				<main className={styles.main}>{children}</main>
			</div>
		</Container>
	);
}
