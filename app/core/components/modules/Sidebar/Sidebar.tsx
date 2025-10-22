"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.scss";
import { Button, Loader } from "../..";
import { LogOut, SquareMousePointer, User, Users, CheckSquare, Plus } from "lucide-react";
import { useLogoutMutation } from "../../backend/hooks/useLogoutMutation";

interface SidebarProps {
	role: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ role }) => {
	const pathname = usePathname();
	const { logout, isLoadingLogout } = useLogoutMutation();
	const isAdmin = role === "ADMIN";

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
					className={`${styles.tab} ${pathname === "/dashboard/orders" ? styles.active : ""}`}>
					<SquareMousePointer />
					<span>Заказы</span>
				</Link>

				{/* Админские ссылки */}
				{isAdmin && (
					<div className={styles.adminRoutes}>
						<Link
							href='/dashboard/users'
							className={`${styles.tab} ${pathname === "/dashboard/users" ? styles.active : ""}`}>
							<Users />
							<span>Пользователи</span>
						</Link>

						<Link
							href='/dashboard/orders/all'
							className={`${styles.tab} ${
								pathname === "/dashboard/orders/all" ? styles.active : ""
							}`}>
							<CheckSquare />
							<span>Все заказы</span>
						</Link>

						<Link
							href='/dashboard/orders/create'
							className={`${styles.tab} ${
								pathname === "/dashboard/orders/create" ? styles.active : ""
							}`}>
							<Plus />
							<span>Создать заказ</span>
						</Link>
					</div>
				)}
			</div>

			<div className={styles.bottom}>
				<Button className={styles.logout} onClick={() => logout()} disabled={isLoadingLogout}>
					<LogOut />
					<span>{isLoadingLogout ? <Loader /> : "Выйти"}</span>
				</Button>
			</div>
		</aside>
	);
};
