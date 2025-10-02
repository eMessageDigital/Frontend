"use client";

import { useSelector, useDispatch } from "react-redux";
import styles from "../core/pages/DashboardPage/Dashboard.module.scss";
import Link from "next/link";
import { rootState } from "../core/store";
import { logout } from "../core/store/slices/authSlice";
import { Container, Sidebar } from "../core/components";
import { usePathname } from "next/navigation";
import React from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	const user = useSelector((state: rootState) => state.auth.user);
	const dispatch = useDispatch();
	const pathname = usePathname();

	const handleLogout = () => {
		dispatch(logout());
	};

	// разбиваем путь на части
	const parts = pathname.split("/").filter(Boolean); // ["dashboard","orders","001"]

	// словарь для красивых названий
	const labels: Record<string, string> = {
		dashboard: "Личный кабинет",
		orders: "Заказы",
		profile: "Профиль",
	};

	// создаём хлебные крошки
	const breadcrumbs = parts.map((part, index) => {
		const href = "/" + parts.slice(0, index + 1).join("/");
		const isLast = index === parts.length - 1;

		// преобразуем slug
		let label = labels[part] || part;
		if (/^\d+$/.test(part)) label = `Заказ №${part}`;

		return isLast ? (
			<span key={href} className={styles.activeCrumb}>
				{label}
			</span>
		) : (
			<Link key={href} href={href} className={styles.crumb}>
				{label}
			</Link>
		);
	});

	return (
		<Container className={styles.dashboard}>
			<div className={styles.breadcrumbs}>
				<Link href='/' className={styles.crumb}>
					Главная
				</Link>
				{breadcrumbs.length > 0 && " / "}
				{breadcrumbs.map((crumb, i) => (
					<React.Fragment key={i}>
						{crumb}
						{i < breadcrumbs.length - 1 && " / "}
					</React.Fragment>
				))}
			</div>

			<div className={styles.content}>
				<Sidebar onLogout={handleLogout} role='user' />
				<main className={styles.main}>{children}</main>
			</div>
		</Container>
	);
}
