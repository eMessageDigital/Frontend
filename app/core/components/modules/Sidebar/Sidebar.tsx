"use client";

import React from "react";
import styles from "./Sidebar.module.scss";
import { LogOut, SquareMousePointer, User } from "lucide-react";

interface SidebarProps {
	activeTab: "profile" | "orders";
	setActiveTab: (tab: "profile" | "orders") => void;
	onLogout: () => void;
	role: "user" | "admin";
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogout, role }) => {
	return (
		<aside className={styles.sidebar}>
			<ul>
				<div className={styles.top}>
					<li
						className={activeTab === "profile" ? styles.active : ""}
						onClick={() => setActiveTab("profile")}>
						<User scale={14} />
						<span>Личные данные</span>
					</li>
					<li
						className={activeTab === "orders" ? styles.active : ""}
						onClick={() => setActiveTab("orders")}>
						<SquareMousePointer />
						<span>История заказов</span>
					</li>
				</div>
				<div className={styles.bottom}>
					<li className={styles.logout} onClick={onLogout}>
						<LogOut />
						<span>Выйти</span>
					</li>
				</div>
			</ul>
		</aside>
	);
};

export default Sidebar;
