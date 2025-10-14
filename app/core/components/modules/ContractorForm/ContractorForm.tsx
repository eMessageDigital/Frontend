"use client";

import React, { useState } from "react";
import styles from "../Profile/Profile.module.scss";
import { ContractorCard, Input, Loader } from "../..";
import { FilePlus } from "lucide-react";
import {
	useContractors,
	useCreateContractorMutation,
	useDeleteContractorMutation,
} from "../../backend/hooks";
import { z } from "zod";
import { ContractorSchema } from "../../backend/features/user/schemas";

export const ContractorsForm: React.FC = () => {
	const { data: contractors, isLoading } = useContractors();
	const { createContractor, isCreating } = useCreateContractorMutation();
	const { deleteContractor } = useDeleteContractorMutation();

	const [showForm, setShowForm] = useState(false);
	const [newContractor, setNewContractor] = useState({
		inn: "",
		kpp: "",
		ogrn: "",
		name: "",
	});
	const [errors, setErrors] = useState<Record<string, string>>({});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewContractor({ ...newContractor, [e.target.name]: e.target.value });
		setErrors((prev) => ({ ...prev, [e.target.name]: "" })); // очищаем ошибку при вводе
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const validation = ContractorSchema.safeParse(newContractor);

		if (!validation.success) {
			const formErrors: Record<string, string> = {};

			for (const issue of validation.error.issues) {
				const fieldName = issue.path[0];
				if (typeof fieldName === "string") {
					formErrors[fieldName] = issue.message;
				}
			}

			setErrors(formErrors);
			return;
		}

		await createContractor(newContractor);
		setNewContractor({ inn: "", kpp: "", ogrn: "", name: "" });
		setShowForm(false);
		setErrors({});
	};

	if (isLoading) return <Loader />;

	return (
		<>
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
					<form className={styles.form} onSubmit={handleSubmit}>
						<div className={styles.row}>
							<div>
								<Input
									name='inn'
									label='ИНН'
									value={newContractor.inn}
									onChange={handleChange}
									maxLength={12}
									error={!!errors.inn}
									errorMessage={errors.inn}
								/>
							</div>

							<div>
								<Input
									name='kpp'
									label='КПП'
									value={newContractor.kpp}
									onChange={handleChange}
									maxLength={9}
									error={!!errors.kpp}
									errorMessage={errors.kpp}
								/>
							</div>

							<div>
								<Input
									name='ogrn'
									label='ОГРН / ОГРНИП'
									value={newContractor.ogrn}
									onChange={handleChange}
									maxLength={15}
									error={!!errors.ogrn}
									errorMessage={errors.ogrn}
								/>
							</div>
						</div>

						<div>
							<Input
								name='name'
								label='Название организации'
								value={newContractor.name}
								onChange={handleChange}
								error={!!errors.name}
								errorMessage={errors.name}
							/>
						</div>

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
					<ContractorCard key={c.id} contractor={c} onDelete={() => deleteContractor(c.id)} />
				))}
			</section>
		</>
	);
};
