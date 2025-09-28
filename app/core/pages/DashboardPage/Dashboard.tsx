"use client";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { rootState } from "../../store";
import { logout } from "../../store/slices/authSlice";
// import Profile from "../components/Profile/Profile";
// import Orders from "../components/Orders/Orders";
import { Container, Sidebar } from "../../components";
import styles from "./Dashboard.module.scss";
import Link from "next/link";

const Dashboard: React.FC = () => {
	const user = useSelector((state: rootState) => state.auth.user);
	const dispatch = useDispatch();

	const [activeTab, setActiveTab] = useState<"profile" | "orders">("profile");

	const handleLogout = () => {
		dispatch(logout());
	};

	return (
		<Container className={styles.dashboard}>
			<div className={styles.breadcrumbs}>
				<Link href='/'>Главная</Link> /{" "}
				{activeTab === "profile" ? "Личные данные" : "История заказов"}
			</div>

			<div className={styles.content}>
				<Sidebar
					activeTab={activeTab}
					setActiveTab={setActiveTab}
					onLogout={handleLogout}
					role={"user"}
				/>
				<main>
					{/* {activeTab === "profile" && <Profile />}
            {activeTab === "orders" && <Orders />} */}
				</main>
			</div>
		</Container>
	);
};

export default Dashboard;
