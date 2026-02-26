"use client";

import React, { useEffect, useState } from "react";
import styles from "./OrderDetails.module.scss";
import { Button, Input } from "../..";
import { orderStatus } from "../../backend/utils/orderStatus";
import { toastMessageHandler } from "../../backend/utils/toast-message-handler";
import { useQueryClient } from "@tanstack/react-query";

const formatDisplayDateTime = (value?: string) => {
	if (!value) return "";
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return value;
	return date.toLocaleString("ru-RU", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
	});
};

const toDateTimeLocalValue = (value?: string) => {
	if (!value) return "";
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return "";
	const pad = (n: number) => String(n).padStart(2, "0");
	return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
		date.getDate()
	)}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

export interface Order {
	id: string;
	userId: string;
	base?: string;
	desiredLaunchAt?: string;
	offer?: string;
	projectDetails?: string;
	status: "CREATED" | "PENDING_APPROVAL" | "ACCEPTED" | "COMPLETED" | string;
	reach?: number;
	views?: number;
	clicks?: number;
	ctr?: number;
	contractorIds?: string[];
	createdAt: string;
	updatedAt: string;
	price?: number;
	files?: unknown;
	user?: {
		id: string;
		displayName?: string;
		email?: string;
	};
}

export interface Contractor {
	id: string;
	name: string;
	inn?: string;
	kpp?: string;
	ogrn?: string;
}

interface OrderDetailsProps {
	order: Order;
	contractors?: Contractor[];
	onRemoveContractor?: (contractorId: string) => void;
}

type CustomField = {
	id?: string;
	label?: string;
	type?: "text" | "file";
	value?: string;
	file?: {
		name?: string;
		type?: string;
		size?: number;
		dataUrl?: string;
	};
};

type CustomBlock = {
	id?: string;
	title?: string;
	fields?: CustomField[];
};

const getCustomBlocks = (raw: unknown): CustomBlock[] => {
	if (!raw) return [];
	if (Array.isArray(raw)) return raw as CustomBlock[];
	if (typeof raw === "object" && raw !== null) {
		const maybeBlocks = (raw as { blocks?: unknown }).blocks;
		if (Array.isArray(maybeBlocks)) return maybeBlocks as CustomBlock[];
	}
	return [];
};

const OrderDetails: React.FC<OrderDetailsProps> = ({
	order,
	contractors = [],
	onRemoveContractor,
}) => {
	const [editableOrder, setEditableOrder] = useState<Partial<Order>>({
		base: order.base,
		desiredLaunchAt: order.desiredLaunchAt,
		offer: order.offer,
		projectDetails: order.projectDetails,
		status: order.status,
		reach: order.reach,
		views: order.views,
		clicks: order.clicks,
		price: order.price,
	});
	const [isAdmin, setIsAdmin] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const queryClient = useQueryClient();

	useEffect(() => {
		const fetchUserRole = async () => {
			try {
				const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/me`, {
					credentials: "include",
				});
				if (!res.ok) return;
				const user = await res.json();
				setIsAdmin(user.role === "ADMIN");
			} catch (err) {
				console.error(err);
			}
		};
		fetchUserRole();
	}, []);

	const handleChange = (field: keyof Order, value: any) => {
		setEditableOrder((prev) => ({ ...prev, [field]: value }));
	};

	const handleSave = async () => {
		setIsSaving(true);
		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/orders/${order.id}`, {
				method: "PATCH",
				credentials: "include",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(editableOrder),
			});
			if (!res.ok) {
				const error = await res.json().catch(() => ({ message: "Не удалось сохранить заказ" }));
				throw new Error(error.message || "Не удалось сохранить заказ");
			}
			toastMessageHandler("Изменения сохранены");
			queryClient.invalidateQueries({ queryKey: ["order", String(order.id)] });
			queryClient.invalidateQueries({ queryKey: ["orders"] });
			queryClient.invalidateQueries({ queryKey: ["orders", "all"] });
			queryClient.invalidateQueries({ queryKey: ["orders", "by-user"] });
		} catch (err) {
			const message = err instanceof Error ? err.message : "Ошибка при сохранении заказа";
			toastMessageHandler(message);
		} finally {
			setIsSaving(false);
		}
	};

	const orderContractors = contractors.filter((c) => order.contractorIds?.includes(c.id));
	const customBlocks = getCustomBlocks(order.files);

	const calculateCtr = () => {
		const reach = editableOrder.reach ?? 0;
		const clicks = editableOrder.clicks ?? 0;
		if (!reach) return 0;
		return Math.round((clicks / reach) * 10000) / 100;
	};

	return (
		<div className={styles.orderDetails}>
			<div className={styles.header}>
				<h2>Заказ №{order.id}</h2>

				<div className={styles.statusAndPrice}>
					<span
						className={`${styles.status} ${
							(editableOrder.status ?? order.status) === "COMPLETED"
								? styles.done
								: (editableOrder.status ?? order.status) === "ACCEPTED"
								? styles.pending
								: (editableOrder.status ?? order.status) === "PENDING_APPROVAL"
								? styles.waiting
								: styles.created
						}`}>
						{orderStatus[editableOrder.status ?? order.status] ||
							(editableOrder.status ?? order.status)}
					</span>
				</div>
			</div>

			{order.user && (
				<div className={styles.owner}>
					<span>Клиент:</span>{" "}
					<strong>{order.user.displayName || order.user.email || order.user.id}</strong>
				</div>
			)}

			{/* Исполнители */}
			<section className={styles.contractorsList}>
				{orderContractors.length > 0 ? (
					orderContractors.map((c) => (
						<div key={c.id} className={styles.contractorCard}>
							<div className={styles.contractorCardHeader}>
								<h4>{c.name}</h4>
								{isAdmin && onRemoveContractor && (
									<button onClick={() => onRemoveContractor(c.id)}>Удалить</button>
								)}
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
					))
				) : (
					<p className={styles.contractorNone}>Исполнители не добавлены</p>
				)}
			</section>

			{/* Основная информация */}
			<section className={styles.info}>
				<div className={styles.sectionHeader}>
					<div>
						<p>База</p>
						<Input
							readOnly={!isAdmin}
							value={editableOrder.base || ""}
							onChange={(e) => handleChange("base", e.target.value)}
						/>
					</div>
					<div>
						<p>Желаемое время запуска</p>
						<Input
							readOnly={!isAdmin}
							type={isAdmin ? "datetime-local" : "text"}
							value={
								isAdmin
									? toDateTimeLocalValue(editableOrder.desiredLaunchAt)
									: formatDisplayDateTime(editableOrder.desiredLaunchAt)
							}
							onChange={(e) => {
								if (!isAdmin) return;
								const nextIso = e.target.value
									? new Date(e.target.value).toISOString()
									: "";
								handleChange("desiredLaunchAt", nextIso);
							}}
						/>
					</div>
				</div>
				<div className={styles.offer}>
					<p>Оффер</p>
					<Input
						readOnly={!isAdmin}
						value={editableOrder.offer || ""}
						onChange={(e) => handleChange("offer", e.target.value)}
					/>
				</div>
				<div className={styles.about}>
					<p>О проекте</p>
					<Input
						readOnly={!isAdmin}
						value={editableOrder.projectDetails || ""}
						onChange={(e) => handleChange("projectDetails", e.target.value)}
					/>
				</div>
			</section>

			{customBlocks.length > 0 && (
				<section className={styles.customBlocks}>
					<h3>Блоки заказа</h3>
					<div className={styles.customBlocksList}>
						{customBlocks.map((block, blockIndex) => (
							<div key={block.id ?? `${block.title}-${blockIndex}`} className={styles.customBlockCard}>
								<h4>{block.title || "Без названия"}</h4>
								{block.fields && block.fields.length > 0 ? (
									<div className={styles.customBlockFields}>
										{block.fields.map((field, fieldIndex) => (
											<div
												key={field.id ?? `${field.label}-${fieldIndex}`}
												className={styles.customBlockField}>
												<span className={styles.customBlockLabel}>
													{field.label || "Поле"}
												</span>
												{field.type === "file" ? (
													field.file?.dataUrl ? (
														<a
															className={styles.customBlockFile}
															href={field.file.dataUrl}
															download={field.file.name || "file"}>
															{field.file.name || "Скачать файл"}
														</a>
													) : (
														<span className={styles.customBlockValue}>Файл не загружен</span>
													)
												) : (
													<span className={styles.customBlockValue}>
														{field.value || "—"}
													</span>
												)}
											</div>
										))}
									</div>
								) : (
									<p className={styles.customBlockEmpty}>Поля отсутствуют</p>
								)}
							</div>
						))}
					</div>
				</section>
			)}

			{isAdmin && (
				<section className={styles.statusSection}>
					<p>Статус заказа</p>
					<select
						className={styles.statusSelect}
						value={editableOrder.status ?? order.status}
						onChange={(e) => handleChange("status", e.target.value)}>
						<option value='CREATED'>Создан</option>
						<option value='PENDING_APPROVAL'>Ожидает подтверждения</option>
						<option value='ACCEPTED'>В работе</option>
						<option value='COMPLETED'>Выполнен</option>
					</select>
				</section>
			)}

			{/* Результаты */}
			<h1 className={styles.resultsTitle}>Результаты</h1>
			<section className={styles.result}>
				<div className={styles.row}>
					<div>
						<p>Охват (объем рассылки)</p>
						<Input
							readOnly={!isAdmin}
							type='number'
							value={editableOrder.reach || 0}
							onChange={(e) => handleChange("reach", Number(e.target.value))}
						/>
					</div>
					<div>
						<p>Просмотры сообщений</p>
						<Input
							readOnly={!isAdmin}
							type='number'
							value={editableOrder.views || 0}
							onChange={(e) => handleChange("views", Number(e.target.value))}
						/>
					</div>
				</div>
				<div className={styles.row}>
					<div>
						<p>Клики по ссылке</p>
						<Input
							readOnly={!isAdmin}
							type='number'
							value={editableOrder.clicks || 0}
							onChange={(e) => handleChange("clicks", Number(e.target.value))}
						/>
					</div>
					<div>
						<p>CTR</p>
						<Input readOnly value={`${calculateCtr()}%`} />
					</div>
				</div>
			</section>

			{isAdmin && (
				<Button className={styles.saveButton} onClick={handleSave} disabled={isSaving}>
					{isSaving ? "Сохранение..." : "Сохранить изменения"}
				</Button>
			)}
		</div>
	);
};

export default OrderDetails;
