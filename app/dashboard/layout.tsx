import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import styles from "../core/pages/DashboardPage/Dashboard.module.scss";
import { Container, Sidebar } from "../core/components";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
	// получаем cookie
	const session = (await cookies()).get("session")?.value;

	// если нет сессии — серверный редирект
	if (!session) {
		redirect("/");
	}

	// тут можно серверно получить данные пользователя, если нужно
	const user = { name: "Пользователь" }; // пример, обычно fetch на сервере

	// Хлебные крошки (можно оставить как есть)
	const pathname = "/dashboard/profile"; // или динамически через params на сервере
	const parts = pathname.split("/").filter(Boolean);

	const labels: Record<string, string> = {
		dashboard: "Личный кабинет",
		orders: "Заказы",
		profile: "Профиль",
	};

	const breadcrumbs = parts.map((part, index) => {
		const href = "/" + parts.slice(0, index + 1).join("/");
		const isLast = index === parts.length - 1;

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
				<Sidebar role='user' />
				<main className={styles.main}>{children}</main>
			</div>
		</Container>
	);
}
