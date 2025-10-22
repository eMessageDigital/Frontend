"use client";

import React, { useEffect, useState } from "react";
import styles from "./OrderDetails.module.scss";
import { Button, Input } from "../..";
import { orderStatus } from "../../backend/utils/orderStatus";
import { toastMessageHandler } from "../../backend/utils/toast-message-handler";

export interface Order {
	id: string;
	userId: string;
	base?: string;
	desiredLaunchAt?: string;
	offer?: string;
	projectDetails?: string;
	status: "CREATED" | "PENDING_APPROVAL" | "ACCEPTED" | "COMPLETED" | string;
	reach?: number;
	ctr?: number;
	conversion?: number;
	contractorIds?: string[];
	createdAt: string;
	updatedAt: string;
	price?: number;
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
		reach: order.reach,
		ctr: order.ctr,
		conversion: order.conversion,
		price: order.price,
	});
	const [isAdmin, setIsAdmin] = useState(false);
	const [isSaving, setIsSaving] = useState(false);

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
			if (!res.ok) throw new Error("Не удалось сохранить заказ");
			toastMessageHandler("Изменения сохранены");
		} catch (err) {
			toastMessageHandler("Ошибка при сохранении заказа");
		} finally {
			setIsSaving(false);
		}
	};

	const orderContractors = contractors.filter((c) => order.contractorIds?.includes(c.id));

	const calculateLeads = () => {
		const { reach = 0, ctr = 0, conversion = 0 } = editableOrder;
		return Math.round((reach * ctr * conversion) / 10000);
	};

	return (
		<div className={styles.orderDetails}>
			<div className={styles.header}>
				<h2>Заказ №{order.id}</h2>

				<div className={styles.statusAndPrice}>
					<span
						className={`${styles.status} ${
							order.status === "COMPLETED"
								? styles.done
								: order.status === "ACCEPTED"
								? styles.pending
								: order.status === "PENDING_APPROVAL"
								? styles.waiting
								: styles.created
						}`}>
						{orderStatus[order.status] || order.status}
					</span>
				</div>
			</div>

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
							value={editableOrder.desiredLaunchAt || ""}
							onChange={(e) => handleChange("desiredLaunchAt", e.target.value)}
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

			{/* Результаты */}
			<h1 className={styles.resultsTitle}>Результаты</h1>
			<section className={styles.result}>
				<div className={styles.row}>
					<div>
						<p>Охват</p>
						<Input
							readOnly={!isAdmin}
							type='number'
							value={editableOrder.reach || 0}
							onChange={(e) => handleChange("reach", Number(e.target.value))}
						/>
					</div>
					<div>
						<p>Конверсия</p>
						<Input
							readOnly={!isAdmin}
							type='number'
							value={editableOrder.conversion || 0}
							onChange={(e) => handleChange("conversion", Number(e.target.value))}
						/>
					</div>
				</div>
				<div className={styles.row}>
					<div>
						<p>CTR</p>
						<Input
							readOnly={!isAdmin}
							type='number'
							value={editableOrder.ctr || 0}
							onChange={(e) => handleChange("ctr", Number(e.target.value))}
						/>
					</div>
					<div>
						<p>Лидогенерация</p>
						<Input readOnly value={calculateLeads()} />
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
