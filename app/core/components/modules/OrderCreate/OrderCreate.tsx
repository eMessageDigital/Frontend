"use client";

import React, { useState, useEffect } from "react";
import styles from "./OrderCreate.module.scss";
import { Input, FileCard, Button } from "../..";
import { IMaskInput } from "react-imask";
import { useUsers, User as ServerUser } from "../../backend/hooks/useUsers";

export default function OrderCreate() {
	const [searchValue, setSearchValue] = useState("");
	const [filteredUsers, setFilteredUsers] = useState<ServerUser[]>([]);
	const [selectedUser, setSelectedUser] = useState<ServerUser | null>(null);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		telegram: "",
		phone: "",
		base: "",
		desiredLaunchAt: "",
		offer: "",
		price: "",
		projectDetails: "",
		files: [] as File[],
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { data: usersResponse } = useUsers({ page: 1, limit: 100, search: searchValue });

	useEffect(() => {
		if (usersResponse?.data) {
			const filtered = usersResponse.data.filter(
				(u) =>
					u.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
					u.email.toLowerCase().includes(searchValue.toLowerCase())
			);
			setFilteredUsers(filtered);
		} else {
			setFilteredUsers([]);
		}
	}, [usersResponse, searchValue]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSelectUser = (user: ServerUser) => {
		setSelectedUser(user);
		setFormData({
			...formData,
			name: user.firstName,
			email: user.email,
			telegram: "",
			phone: user.phone || "",
		});
		setSearchValue("");
	};

	const handleFilesChange = (files: FileList | null) => {
		if (!files) return;
		setFormData({ ...formData, files: Array.from(files) });
	};

	const handleSubmit = async () => {
		setIsSubmitting(true);

		try {
			const body: any = {
				base: formData.base,
				desiredLaunchAt: formData.desiredLaunchAt ? new Date(formData.desiredLaunchAt) : undefined,
				offer: formData.offer,
				projectDetails: formData.projectDetails,
			};

			if (selectedUser) {
				body.userId = selectedUser.id;
			} else {
				body.name = formData.name;
				body.email = formData.email;
				body.telegram = formData.telegram;
				body.phone = formData.phone;
			}

			const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/orders`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify(body),
			});

			if (!res.ok) {
				const error = await res.json();
				throw new Error(error.message || "Ошибка при создании заказа");
			}

			alert("Заказ успешно создан!");
			setFormData({
				name: "",
				email: "",
				telegram: "",
				phone: "",
				base: "",
				desiredLaunchAt: "",
				offer: "",
				projectDetails: "",
				files: [],
				price: "",
			});
			setSelectedUser(null);
		} catch (err: any) {
			alert(err.message);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className={styles.container}>
			<h1 className={styles.sectionTitle}>Создать заказ</h1>

			{/* 🔹 Поиск существующего пользователя */}
			<Input
				className={styles.searchInput}
				label='Найти пользователя (по имени или email)'
				placeholder='Например: ivan@mail.ru'
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)}
			/>

			{searchValue && (
				<div className={styles.userResults}>
					{filteredUsers.length ? (
						filteredUsers.map((user) => (
							<div key={user.id} className={styles.userCard}>
								<p>
									<b>{user.firstName}</b> — {user.email}
								</p>
								<button
									className={styles.selectBtn}
									type='button'
									onClick={() => handleSelectUser(user)}>
									Выбрать
								</button>
							</div>
						))
					) : (
						<p className={styles.noUser}>Пользователь не найден</p>
					)}
				</div>
			)}

			{/* 🔹 Форма пользователя */}
			<form className={styles.form} onSubmit={(e) => e.preventDefault()}>
				<div className={styles.grid2}>
					<Input label='Имя' name='name' value={formData.name} onChange={handleChange} />
					<Input
						label='Email'
						name='email'
						type='email'
						value={formData.email}
						onChange={handleChange}
					/>
					<Input
						label='Telegram'
						name='telegram'
						value={formData.telegram}
						onChange={handleChange}
					/>
					<label>
						<span>Телефон</span>
						<IMaskInput
							className={styles.input}
							mask='+{7} (000) 000-00-00'
							type='tel'
							name='phone'
							value={formData.phone}
							onChange={handleChange}
							overwrite
						/>
					</label>
				</div>
			</form>

			{/* 🔹 Вторая форма — детали заказа */}
			<section className={styles.info}>
				<div className={styles.sectionHeader}>
					<div>
						<p>База</p>
						<Input
							className={styles.input}
							name='base'
							value={formData.base}
							onChange={handleChange}
						/>
					</div>
					<div>
						<p>Желаемое время запуска</p>
						<Input
							className={styles.input}
							name='desiredLaunchAt'
							type='datetime-local'
							value={formData.desiredLaunchAt}
							onChange={handleChange}
						/>
					</div>
				</div>

				<div className={styles.offer}>
					<p>Оффер</p>
					<Input name='offer' value={formData.offer} onChange={handleChange} />
				</div>

				<div className={styles.about}>
					<p>О проекте</p>
					<Input name='projectDetails' value={formData.projectDetails} onChange={handleChange} />
				</div>

				<div className={styles.files}>
					<div className={styles.filesHeader}>
						<p className={styles.text}>Выбранные файлы (для скачивания)</p>
						<Input type='file' multiple onChange={(e) => handleFilesChange(e.target.files)} />
					</div>
					<div className={styles.bottomFiles}>
						{formData.files.map((file) => (
							<FileCard key={file.name} name={file.name} />
						))}
					</div>
				</div>

				<div className={styles.price}>
					<p>Цена</p>
					<Input
						type='number'
						name='price'
						value={formData.price || ""}
						onChange={handleChange}
						placeholder='Введите цену'
					/>
				</div>
			</section>

			<div>
				<Button
					className={styles.createOrder}
					type='button'
					onClick={handleSubmit}
					disabled={isSubmitting}>
					{isSubmitting ? "Создание..." : "Создать заказ"}
				</Button>
			</div>
		</div>
	);
}
