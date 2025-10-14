"use client";

import React, { useState, useEffect } from "react";
import styles from "./Profile.module.scss";
import { Input, Loader } from "../..";
import { FilePlus, PenLine, Trash } from "lucide-react";
import { IMaskInput } from "react-imask";
import {
	useContractors,
	useCreateContractorMutation,
	useDeleteContractorMutation,
	useProfile,
	useUpdateProfileMutation,
} from "../../backend/hooks";
import { IContractor } from "../../backend/features/user/services";

const Profile: React.FC = () => {
	const { user, isLoading } = useProfile();
	const { updateProfile, isUpdating } = useUpdateProfileMutation();

	const { data: contractors, isLoading: isLoadingContractors } = useContractors();
	const { createContractor, isCreating } = useCreateContractorMutation();
	const { deleteContractor, isDeleting } = useDeleteContractorMutation();

	const [formData, setFormData] = useState({
		name: "",
		lastName: "",
		email: "",
		phone: "",
	});

	const [showForm, setShowForm] = useState(false);
	const [newContractor, setNewContractor] = useState<Partial<IContractor>>({
		inn: "",
		kpp: "",
		ogrn: "",
		name: "",
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

	const handleNewContractorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewContractor({ ...newContractor, [e.target.name]: e.target.value });
	};

	const handleSaveNewContractor = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!newContractor.name || !newContractor.inn) return;

		await createContractor(newContractor);
		setNewContractor({ inn: "", kpp: "", ogrn: "", name: "" });
		setShowForm(false);
	};

	if (isLoading || isLoadingContractors) return <Loader />;

	return (
		<div className={styles.profile}>
			<div className={styles.sectionHeader}>
				<h2>Персональная информация</h2>
			</div>

			<section className={styles.section}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<div className={styles.grid2}>
						<label>
							<span>Имя</span>
							<Input
								className={styles.input}
								type='text'
								name='name'
								value={formData.name}
								onChange={handleChange}
								placeholder='Иван'
							/>
						</label>

						<label>
							<span>Фамилия</span>
							<Input
								className={styles.input}
								type='text'
								name='lastName'
								value={formData.lastName}
								onChange={handleChange}
								placeholder='Иванов'
							/>
						</label>

						<label>
							<span>Email</span>
							<Input
								className={styles.input}
								type='email'
								name='email'
								value={formData.email}
								onChange={handleChange}
								placeholder='example@mail.ru'
							/>
						</label>

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

			{/* Контрагенты */}
			<div className={styles.sectionHeader}>
				<h2>Контрагенты (ООО, ИП)</h2>
				{!showForm && (
					<button type='button' className={styles.add} onClick={() => setShowForm(true)}>
						<FilePlus size={16} /> Добавить организацию
					</button>
				)}
			</div>

			{showForm && (
				<section className={styles.section}>
					<form className={styles.form} onSubmit={handleSaveNewContractor}>
						<div className={styles.row}>
							<label>
								<span>ИНН</span>
								<Input
									className={styles.input}
									type='text'
									name='inn'
									value={newContractor.inn}
									onChange={handleNewContractorChange}
								/>
							</label>
							<label>
								<span>КПП</span>
								<Input
									className={styles.input}
									type='text'
									name='kpp'
									value={newContractor.kpp}
									onChange={handleNewContractorChange}
								/>
							</label>
							<label>
								<span>ОГРН / ОГРНИП</span>
								<Input
									className={styles.input}
									type='text'
									name='ogrn'
									value={newContractor.ogrn}
									onChange={handleNewContractorChange}
								/>
							</label>
						</div>

						<label>
							<span>Название организации</span>
							<Input
								className={styles.input}
								type='text'
								name='name'
								value={newContractor.name}
								onChange={handleNewContractorChange}
								placeholder=''
							/>
						</label>

						<div className={styles.buttonsRight}>
							<button type='submit' className={styles.primary} disabled={isCreating}>
								<FilePlus size={16} /> Сохранить
							</button>
						</div>
					</form>
				</section>
			)}

			<section className={styles.contractorsList}>
				{contractors?.map((c) => (
					<div key={c.id} className={styles.contractorCard}>
						<div className={styles.contractorCardHeader}>
							<h3>
								{c.name} <PenLine className={styles.iconBtnSecondary} />
							</h3>
							<Trash
								className={styles.iconBtn}
								type='button'
								onClick={() => deleteContractor(c.id)}
							/>
						</div>
						<div className={styles.contractorCardText}>
							<p>
								ИНН: <span>{c.inn}</span>
							</p>
							<p>
								КПП: <span>{c.kpp}</span>
							</p>
							<p>
								ОГРН(ОГРНИП): <span>{c.ogrn}</span>
							</p>
						</div>
					</div>
				))}
			</section>
		</div>
	);
};

export default Profile;
