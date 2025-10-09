"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import styles from "./Profile.module.scss";
import { addContractor, removeContractor } from "../../../store/slices/profileSlice";
import { rootState } from "../../../store";
import { Input, Loader } from "../..";
import { FilePlus, PenLine, Trash } from "lucide-react";
import { useProfile, useUpdateProfileMutation } from "../../auth/hooks";
import { IMaskInput } from "react-imask";

const Profile: React.FC = () => {
	const dispatch = useDispatch();
	const { contractors } = useSelector((state: rootState) => state.profile);

	const { user, isLoading } = useProfile();
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

	const [showForm, setShowForm] = useState(true);
	const [newContractor, setNewContractor] = useState({
		inn: "",
		kpp: "",
		ogrn: "",
		name: "",
	});

	const handleNewContractorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewContractor({ ...newContractor, [e.target.name]: e.target.value });
	};

	const handleSaveNewContractor = (e: React.FormEvent) => {
		e.preventDefault();
		if (!newContractor.name || !newContractor.inn) return;

		dispatch(addContractor({ id: uuidv4(), ...newContractor }));
		setNewContractor({ inn: "", kpp: "", ogrn: "", name: "" });
		setShowForm(false);
	};

	if (isLoading) return <Loader />;

	return (
		<div className={styles.profile}>
			{/* Персональная информация */}
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
								name='displayName'
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
							<button type='submit' className={styles.primary}>
								<FilePlus size={16} /> Сохранить
							</button>
						</div>
					</form>
				</section>
			)}

			{/* Список сохранённых контрагентов */}
			<section className={styles.contractorsList}>
				{contractors.map((c) => (
					<div key={c.id} className={styles.contractorCard}>
						<div className={styles.contractorCardHeader}>
							<h3>
								{c.name} <PenLine className={styles.iconBtnSecondary} />
							</h3>
							<Trash
								className={styles.iconBtn}
								type='button'
								onClick={() => dispatch(removeContractor(c.id))}
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
