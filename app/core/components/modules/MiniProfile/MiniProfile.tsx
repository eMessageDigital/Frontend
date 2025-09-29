"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { rootState } from "../../../store";
import { logout } from "../../../store/slices/authSlice";
import styles from "./MiniProfile.module.scss";
import { User } from "lucide-react";
import Link from "next/link";

const MiniProfile: React.FC = () => {
	const dispatch = useDispatch();
	const user = useSelector((state: rootState) => state.auth.user);

	if (!user) return null;

	return (
		<Link href={"/dashboard"}>
			<div className={styles.profile}>
				<div className={styles.avatar}>
					<User size={26} color='white' />
				</div>
				<div className={styles.info}>
					<span className={styles.name}>{user.name}</span>
					<span className={styles.email}>{user.email}</span>
				</div>
			</div>
		</Link>
	);
};

export default MiniProfile;
