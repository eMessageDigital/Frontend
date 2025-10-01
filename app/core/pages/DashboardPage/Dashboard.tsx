"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { rootState } from "../../store";
import { logout } from "../../store/slices/authSlice";
// import Profile from "../components/Profile/Profile";
// import Orders from "../components/Orders/Orders";
import { Container, Orders, Profile, Sidebar } from "../../components";
import styles from "./Dashboard.module.scss";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const Dashboard: React.FC = () => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const tab = searchParams.get("tab");

	useEffect(() => {
		if (!tab) {
			router.replace("?tab=profile");
		}
	}, [tab, router]);

	const user = useSelector((state: rootState) => state.auth.user);
	const dispatch = useDispatch();

	const [activeTab, setActiveTab] = useState<"profile" | "orders">("profile");

	useEffect(() => {
		if (tab === "profile" || tab === "orders") {
			setActiveTab(tab);
		}
	}, [tab]);

	const handleChangeTab = (newTab: "profile" | "orders") => {
		setActiveTab(newTab);

		const params = new URLSearchParams(searchParams.toString());
		params.set("tab", newTab);
		router.push(`?${params.toString()}`);
	};

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
				<main className={styles.main}>
					{activeTab === "profile" && <Profile />}
					{activeTab === "orders" && <Orders />}
				</main>
			</div>
		</Container>
	);
};

export default Dashboard;
