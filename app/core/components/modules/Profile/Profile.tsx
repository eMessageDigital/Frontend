"use client";

import React from "react";
import styles from "./Profile.module.scss";
import { ContractorsForm, Loader, PersonalInfoForm } from "../..";
import { useProfile } from "../../backend/hooks";

export const Profile: React.FC = () => {
	const { user, isLoading } = useProfile();

	if (isLoading) return <Loader />;

	return (
		<div className={styles.profile}>
			<PersonalInfoForm user={user} />
			<ContractorsForm />
		</div>
	);
};

export default Profile;
