"use client";

import React, { useState, useEffect } from "react";
import styles from "../Profile/Profile.module.scss";
import { Input, Loader } from "../..";
import { IMaskInput } from "react-imask";
import { useUpdateProfileMutation } from "../../backend/hooks";

interface PersonalInfoFormProps {
	user: any;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ user }) => {
	const { updateProfile, isUpdating } = useUpdateProfileMutation();
	const [formData, setFormData] = useState({
		name: "",
		lastName: "",
		email: "",
		phone: "",
	});

	useEffect(() => {
		if (user) {
			setFormData({
				name: user.displayName ?? "",
				lastName: user.lastName ?? "",
				email: user.email ?? "",
				phone: user.phone ?? "",
			});
		}
	}, [user]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await updateProfile(formData);
	};

	return (
		<>
			<div className={styles.sectionHeader}>
				<h2>Персональная информация</h2>
			</div>

			<section className={styles.section}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<div className={styles.grid2}>
						<Input label='Имя' name='name' value={formData.name} onChange={handleChange} />
						<Input
							label='Фамилия'
							name='lastName'
							value={formData.lastName}
							onChange={handleChange}
						/>
						<Input
							label='Email'
							name='email'
							type='email'
							value={formData.email}
							onChange={handleChange}
						/>
						<label>
							<span>Телефон</span>
							<IMaskInput
								className={styles.input}
								mask='+{7} (000) 000 00-00'
								type='tel'
								name='phone'
								value={formData.phone}
								onChange={handleChange}
								placeholder='+7 (999) 999-99-99'
								overwrite
							/>
						</label>
					</div>

					<div className={styles.buttonsRight}>
						<button type='button' className={styles.secondary}>
							Изменить пароль
						</button>
						<button type='submit' className={styles.primary} disabled={isUpdating}>
							{isUpdating ? <Loader /> : "Сохранить"}
						</button>
					</div>
				</form>
			</section>
		</>
	);
};
