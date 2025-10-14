"use client";

import React from "react";
import styles from "./MiniProfile.module.scss";
import { User, LogOut } from "lucide-react";
import Link from "next/link";
import { IUser } from "../../backend/api/types";

interface MiniProfileProps {
	user?: IUser;
	loading?: boolean;
}

const MiniProfile: React.FC<MiniProfileProps> = ({ user, loading }) => {
	if (loading) {
		return (
			<div className={styles.profile}>
				<div className={`${styles.avatar} ${styles.skeleton}`} />
				<div className={styles.info}>
					<span className={`${styles.name} ${styles.skeleton}`} />
					<span className={`${styles.email} ${styles.skeleton}`} />
				</div>
			</div>
		);
	}

	if (!user) return null;

	return (
		<Link href='/dashboard'>
			<div className={styles.profile}>
				<div className={styles.avatar}>
					{user.picture ? (
						<img src={user.picture} className={styles.avatarImg} />
					) : (
						<User size={42} color='white' />
					)}
				</div>
				<div className={styles.info}>
					<span className={styles.name}>{user.displayName}</span>
					<span className={styles.email}>{user.email}</span>
				</div>
			</div>
		</Link>
	);
};

export default MiniProfile;
