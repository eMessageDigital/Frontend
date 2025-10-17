import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import styles from "../core/pages/DashboardPage/Dashboard.module.scss";
import { Container, Sidebar } from "../core/components";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
	const session = (await cookies()).get("session")?.value;

	if (!session) {
		redirect("/");
	}

	const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
	const res = await fetch(`${SERVER_URL}/users/profile`, {
		headers: { cookie: `session=${session}` },
		cache: "no-store",
	});

	if (!res.ok) {
		redirect("/");
	}

	const user = await res.json();

	const pathname = "/dashboard/profile";
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
				<Sidebar role={user.role || "USER"} />
				<main className={styles.main}>{children}</main>
			</div>
		</Container>
	);
}
