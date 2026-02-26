"use client";

import React, { useState, useEffect } from "react";
import styles from "./OrderCreate.module.scss";
import { Input, Button } from "../..";
import { IMaskInput } from "react-imask";
import { useUsers, User as ServerUser } from "../../backend/hooks/useUsers";
import { toastMessageHandler } from "../../backend/utils/toast-message-handler";

type FieldType = "text" | "file";

type UploadedFile = {
	name: string;
	type: string;
	size: number;
	dataUrl: string;
};

type BlockField = {
	id: string;
	label: string;
	type: FieldType;
	value?: string;
	file?: File | UploadedFile;
};

type Block = {
	id: string;
	title: string;
	fields: BlockField[];
};

const createId = () =>
	typeof crypto !== "undefined" && "randomUUID" in crypto
		? crypto.randomUUID()
		: `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;

const createField = (type: FieldType = "text"): BlockField => ({
	id: createId(),
	label: "",
	type,
	value: "",
});

const createDefaultBlocks = (): Block[] => [
	{
		id: createId(),
		title: "Название",
		fields: [{ ...createField("text"), label: "Название" }],
	},
	{
		id: createId(),
		title: "Вводные данные",
		fields: [{ ...createField("text"), label: "Описание" }],
	},
	{
		id: createId(),
		title: "Отчет",
		fields: [{ ...createField("text"), label: "Комментарий" }],
	},
];

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const fileToDataUrl = (file: File) =>
	new Promise<string>((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(String(reader.result));
		reader.onerror = () => reject(new Error("Не удалось прочитать файл"));
		reader.readAsDataURL(file);
	});

export default function OrderCreate() {
	const [searchValue, setSearchValue] = useState("");
	const [filteredUsers, setFilteredUsers] = useState<ServerUser[]>([]);
	const [selectedUser, setSelectedUser] = useState<ServerUser | null>(null);

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		telegram: "",
		phone: "",
		desiredLaunchAt: "",
		price: "",
	});

	const [blocks, setBlocks] = useState<Block[]>(() => createDefaultBlocks());
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { data: usersResponse } = useUsers({ page: 1, limit: 100, search: searchValue });

	// 🔹 Фильтрация пользователей по имени или email
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
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	// 🔹 Выбор существующего пользователя
	const handleSelectUser = (user: ServerUser) => {
		setSelectedUser(user);
		setFormData((prev) => ({
			...prev,
			name: user.firstName,
			email: user.email,
			telegram: "",
			phone: user.phone || "",
		}));
		setSearchValue("");
	};

	const handleAddBlock = () => {
		setBlocks((prev) => [
			...prev,
			{ id: createId(), title: "Новый блок", fields: [createField("text")] },
		]);
	};

	const handleRemoveBlock = (blockId: string) => {
		setBlocks((prev) => prev.filter((block) => block.id !== blockId));
	};

	const handleBlockTitleChange = (blockId: string, value: string) => {
		setBlocks((prev) =>
			prev.map((block) => (block.id === blockId ? { ...block, title: value } : block))
		);
	};

	const handleAddField = (blockId: string) => {
		setBlocks((prev) =>
			prev.map((block) =>
				block.id === blockId
					? { ...block, fields: [...block.fields, createField("text")] }
					: block
			)
		);
	};

	const handleRemoveField = (blockId: string, fieldId: string) => {
		setBlocks((prev) =>
			prev.map((block) =>
				block.id === blockId
					? { ...block, fields: block.fields.filter((field) => field.id !== fieldId) }
					: block
			)
		);
	};

	const handleFieldLabelChange = (blockId: string, fieldId: string, value: string) => {
		setBlocks((prev) =>
			prev.map((block) =>
				block.id === blockId
					? {
							...block,
							fields: block.fields.map((field) =>
								field.id === fieldId ? { ...field, label: value } : field
							),
					  }
					: block
			)
		);
	};

	const handleFieldTypeChange = (blockId: string, fieldId: string, value: FieldType) => {
		setBlocks((prev) =>
			prev.map((block) =>
				block.id === blockId
					? {
							...block,
							fields: block.fields.map((field) =>
								field.id === fieldId
									? {
											...field,
											type: value,
											value: value === "text" ? field.value ?? "" : "",
											file: value === "file" ? field.file : undefined,
									  }
									: field
							),
					  }
					: block
			)
		);
	};

	const handleFieldValueChange = (blockId: string, fieldId: string, value: string) => {
		setBlocks((prev) =>
			prev.map((block) =>
				block.id === blockId
					? {
							...block,
							fields: block.fields.map((field) =>
								field.id === fieldId ? { ...field, value } : field
							),
					  }
					: block
			)
		);
	};

	const handleFieldFileChange = (blockId: string, fieldId: string, file?: File) => {
		if (file && file.size > MAX_FILE_SIZE) {
			toastMessageHandler({
				message: "Файл слишком большой. Максимум 5 МБ.",
				status: "error",
			});
			return;
		}
		setBlocks((prev) =>
			prev.map((block) =>
				block.id === blockId
					? {
							...block,
							fields: block.fields.map((field) =>
								field.id === fieldId ? { ...field, file } : field
							),
					  }
					: block
			)
		);
	};

	const handleClearFieldFile = (blockId: string, fieldId: string) => {
		setBlocks((prev) =>
			prev.map((block) =>
				block.id === blockId
					? {
							...block,
							fields: block.fields.map((field) =>
								field.id === fieldId ? { ...field, file: undefined } : field
							),
					  }
					: block
			)
		);
	};

	const handleSubmit = async () => {
		setIsSubmitting(true);

		try {
			const blocksPayload = await Promise.all(
				blocks.map(async (block) => {
					const normalizedFields = await Promise.all(
						block.fields.map(async (field) => {
							const label = field.label.trim();
							if (field.type === "file") {
								if (!field.file) {
									if (!label) return null;
									return { id: field.id, label, type: "file" as const, file: null };
								}

								const filePayload =
									field.file instanceof File
										? {
												name: field.file.name,
												type: field.file.type,
												size: field.file.size,
												dataUrl: await fileToDataUrl(field.file),
										  }
										: field.file;

								return { id: field.id, label, type: "file" as const, file: filePayload };
							}

							const value = (field.value ?? "").trim();
							if (!label && !value) return null;
							return { id: field.id, label, type: "text" as const, value };
						})
					);

					const fields = normalizedFields.filter(Boolean) as Array<{
						id: string;
						label: string;
						type: "text" | "file";
						value?: string;
						file?: UploadedFile | null;
					}>;

					return {
						id: block.id,
						title: block.title.trim() || "Без названия",
						fields,
					};
				})
			);

			const body: any = {
				desiredLaunchAt: formData.desiredLaunchAt ? new Date(formData.desiredLaunchAt) : undefined,
				price: formData.price ? parseFloat(formData.price) : undefined,
				blocks: blocksPayload,
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

			toastMessageHandler("Заказ успешно создан");

			// Сброс формы
			setFormData({
				name: "",
				email: "",
				telegram: "",
				phone: "",
				desiredLaunchAt: "",
				price: "",
			});
			setBlocks(createDefaultBlocks());
			setSelectedUser(null);
		} catch (err: any) {
			toastMessageHandler({ message: err.message, status: "error" });
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className={styles.container}>
			<h1 className={styles.sectionTitle}>Создать заказ</h1>

			{/* 🔹 Поиск пользователя */}
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

			{/* 🔹 Данные пользователя */}
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

			{/* 🔹 Блоки заказа */}
			<section className={styles.blocksSection}>
				<div className={styles.blocksHeader}>
					<h2>Блоки заказа</h2>
					<Button className={styles.blocksAddBtn} onClick={handleAddBlock}>
						Добавить блок
					</Button>
				</div>
				<p className={styles.blocksHint}>
					В блоке &quot;Вводные данные&quot; можно добавлять произвольные поля с текстом или файлами.
				</p>

				<div className={styles.blocksList}>
					{blocks.map((block) => (
						<div key={block.id} className={styles.blockCard}>
							<div className={styles.blockHeader}>
								<div className={styles.blockTitle}>
									<label>
										<span>Название блока</span>
										<input
											type='text'
											value={block.title}
											onChange={(e) => handleBlockTitleChange(block.id, e.target.value)}
											className={styles.blockInput}
											placeholder='Например: Вводные данные'
										/>
									</label>
								</div>
								<Button
									className={styles.blockRemoveBtn}
									onClick={() => handleRemoveBlock(block.id)}>
									Удалить блок
								</Button>
							</div>

							<div className={styles.fieldsList}>
								{block.fields.map((field) => (
									<div key={field.id} className={styles.fieldRow}>
										<div className={styles.fieldCol}>
											<label>
												<span>Название поля</span>
												<input
													type='text'
													value={field.label}
													onChange={(e) =>
														handleFieldLabelChange(block.id, field.id, e.target.value)
													}
													className={styles.blockInput}
													placeholder='Например: Описание'
												/>
											</label>
										</div>

										<div className={styles.fieldCol}>
											<label>
												<span>Тип</span>
												<select
													className={styles.blockSelect}
													value={field.type}
													onChange={(e) =>
														handleFieldTypeChange(block.id, field.id, e.target.value as FieldType)
													}>
													<option value='text'>Текст</option>
													<option value='file'>Файл</option>
												</select>
											</label>
										</div>

										<div className={styles.fieldCol}>
											<label>
												<span>Значение</span>
												{field.type === "file" ? (
													<div className={styles.fileInputWrap}>
														<input
															type='file'
															className={styles.fileInput}
															onChange={(e) =>
																handleFieldFileChange(
																	block.id,
																	field.id,
																	e.target.files?.[0]
																)
															}
														/>
														{field.file && (
															<div className={styles.fileMeta}>
																<span>{field.file.name}</span>
																<button
																	type='button'
																	className={styles.fileRemoveBtn}
																	onClick={() => handleClearFieldFile(block.id, field.id)}>
																	Удалить
																</button>
															</div>
														)}
													</div>
												) : (
													<input
														type='text'
														value={field.value ?? ""}
														onChange={(e) =>
															handleFieldValueChange(block.id, field.id, e.target.value)
														}
														className={styles.blockInput}
														placeholder='Введите текст'
													/>
												)}
											</label>
										</div>

										<div className={styles.fieldActions}>
											<Button
												className={styles.fieldRemoveBtn}
												onClick={() => handleRemoveField(block.id, field.id)}>
												Удалить поле
											</Button>
										</div>
									</div>
								))}
							</div>

							<Button className={styles.fieldAddBtn} onClick={() => handleAddField(block.id)}>
								Добавить поле
							</Button>
						</div>
					))}
				</div>
			</section>

			<section className={styles.extraSection}>
				<h2>Дополнительно</h2>
				<div className={styles.extraGrid}>
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
					<div>
						<p>Цена</p>
						<Input
							type='number'
							name='price'
							value={formData.price}
							onChange={handleChange}
							placeholder='Введите цену'
						/>
					</div>
				</div>
			</section>

			{/* 🔹 Кнопка отправки */}
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
