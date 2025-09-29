"use client";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import styles from "./Profile.module.scss";
import {
	addContractor,
	removeContractor,
	updatePersonalInfo,
} from "../../../store/slices/profileSlice";
import { rootState } from "../../../store";
import { Input } from "../..";
import { FilePlus, PenLine, Trash } from "lucide-react";

const Profile: React.FC = () => {
	const dispatch = useDispatch();
	const { personalInfo, contractors } = useSelector((state: rootState) => state.profile);

	// Форма нового контрагента
	const [showForm, setShowForm] = useState(true);
	const [newContractor, setNewContractor] = useState({
		inn: "",
		kpp: "",
		ogrn: "",
		name: "",
	});

	// Изменение персональной информации
	const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(updatePersonalInfo({ [e.target.name]: e.target.value }));
	};

	// Изменение нового контрагента
	const handleNewContractorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewContractor({ ...newContractor, [e.target.name]: e.target.value });
	};

	// Сохранение нового контрагента
	const handleSaveNewContractor = (e: React.FormEvent) => {
		e.preventDefault();
		if (!newContractor.name || !newContractor.inn) return;

		dispatch(addContractor({ id: uuidv4(), ...newContractor }));
		setNewContractor({ inn: "", kpp: "", ogrn: "", name: "" });
		setShowForm(false); // скрываем форму после сохранения
	};

	return (
		<div className={styles.profile}>
			{/* Персональная информация */}
			<div className={styles.sectionHeader}>
				<h2>Персональная информация</h2>
			</div>
			<section className={styles.section}>
				<form className={styles.form}>
					<div className={styles.grid2}>
						<label>
							<span>Имя</span>
							<Input
								className={styles.input}
								placeholder='Иван'
								type='text'
								name='firstName'
								value={personalInfo.firstName}
								onChange={handlePersonalChange}
							/>
						</label>
						<label>
							<span>Фамилия</span>
							<Input
								className={styles.input}
								placeholder='Иванов'
								type='text'
								name='lastName'
								value={personalInfo.lastName}
								onChange={handlePersonalChange}
							/>
						</label>
						<label>
							<span>Email</span>
							<Input
								className={styles.input}
								placeholder='emessage.adt@yandex.ru'
								type='email'
								name='email'
								value={personalInfo.email}
								onChange={handlePersonalChange}
							/>
						</label>
						<label>
							<span>Телефон</span>
							<Input
								className={styles.input}
								placeholder='+7 (995) 993-83-72'
								type='tel'
								name='phone'
								value={personalInfo.phone}
								onChange={handlePersonalChange}
							/>
						</label>
					</div>

					<div className={styles.buttonsRight}>
						<button type='button' className={styles.secondary}>
							Изменить пароль
						</button>
						<button type='submit' className={styles.primary}>
							Сохранить
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
								onClick={() => dispatch(removeContractor(c.id))}>
								Удалить
							</Trash>
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
