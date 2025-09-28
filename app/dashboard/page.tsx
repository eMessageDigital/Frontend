"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { rootState } from "../core/store";
import Dashboard from "../core/pages/DashboardPage/Dashboard";

const DashboardPage = () => {
	const router = useRouter();
	const user = useSelector((state: rootState) => state.auth.user);

	// useEffect(() => {
	// 	if (!user) {
	// 		router.replace("/");
	// 	}
	// }, [user, router]);

	// if (!user) return null; // пока редирект не произошёл

	return <Dashboard />;
};

export default DashboardPage;
