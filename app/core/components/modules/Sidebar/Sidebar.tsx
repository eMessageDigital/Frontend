"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.scss";
import { Button } from "../..";
import { LogOut, SquareMousePointer, User } from "lucide-react";

export const Sidebar = ({ onLogout, role }: { onLogout: () => void; role: string }) => {
	const pathname = usePathname(); // для подсветки активного таба

	return (
		<aside className={styles.sidebar}>
			<div className={styles.top}>
				<Link
					href='/dashboard/profile'
					className={`${styles.tab} ${pathname === "/dashboard/profile" ? styles.active : ""}`}>
					<User />
					<span>Профиль</span>
				</Link>

				<Link
					href='/dashboard/orders'
					className={`${styles.tab} ${
						pathname?.startsWith("/dashboard/orders") ? styles.active : ""
					}`}>
					<SquareMousePointer />
					<span>Заказы</span>
				</Link>
			</div>

			<div className={styles.bottom}>
				<Button className={styles.logout} onClick={onLogout}>
					<LogOut />
					<span>Выйти</span>
				</Button>
			</div>
		</aside>
	);
};
