"use client";

import React, { useState, useMemo } from "react";
import styles from "./Orders.module.scss";
import Card from "./ui/Card";
import { useRouter } from "next/navigation";
import { useOrders, useAllOrders, Order } from "../../backend/hooks";
import { Button } from "../..";

interface OrdersProps {
	isAdmin?: boolean;
	title?: string;
	showCancelButton?: boolean;
}

const Orders: React.FC<OrdersProps> = ({
	isAdmin = false,
	title = "История заказов",
	showCancelButton = false,
}) => {
	const [sortBy, setSortBy] = useState<"createdAt" | "updatedAt">("createdAt");
	const [order, setOrder] = useState<"asc" | "desc">("desc");
	const [filterStatus, setFilterStatus] = useState<string>("ALL");

	// Получаем сырые данные из React Query
	const {
		data: ordersRaw,
		isLoading,
		isError,
		isFetching,
	} = isAdmin ? useAllOrders() : useOrders();

	const router = useRouter();
	const handleGoToOrder = (id: string) => router.push(`/dashboard/orders/${id}`);

	// Локальная сортировка данных без нового запроса
	const sortedOrders = useMemo(() => {
		if (!ordersRaw) return [];
		return [...ordersRaw].sort((a, b) => {
			const aValue = a[sortBy] ?? "";
			const bValue = b[sortBy] ?? "";
			if (order === "asc") return aValue.localeCompare(bValue);
			return bValue.localeCompare(aValue);
		});
	}, [ordersRaw, sortBy, order]);

	// Группировка + фильтрация
	const groupedOrders = useMemo(() => {
		const filtered =
			filterStatus === "ALL" ? sortedOrders : sortedOrders.filter((o) => o.status === filterStatus);
		return filtered.reduce<Record<string, Order[]>>((acc, order) => {
			if (!acc[order.status]) acc[order.status] = [];
			acc[order.status].push(order);
			return acc;
		}, {});
	}, [sortedOrders, filterStatus]);

	if (isLoading) return <p>Загрузка заказов...</p>;
	if (isError) return <p>Ошибка при загрузке заказов</p>;
	if (!ordersRaw || ordersRaw.length === 0)
		return (
			<div className={styles.emptyState}>
				<div className={styles.emptyIcon}>🧾</div>
				<h2 className={styles.emptyTitle}>История заказов пока пустая</h2>
				<p className={styles.emptyText}>
					Здесь будут отображаться все ваши заказы и их статусы. Как только вы оформите первый запрос, он появится в
					этом разделе.
				</p>
			</div>
		);

	return (
		<div className={styles.orders}>
			<h2>{title}</h2>

			{/* Панель управления */}
			<div className={styles.controls}>
				{/* Сортировка */}
				<div className={styles.sortWrapper}>
					<label htmlFor='sortBy'>Сортировать по:</label>
					<select
						id='sortBy'
						value={sortBy}
						onChange={(e) => setSortBy(e.target.value as "createdAt" | "updatedAt")}>
						<option value='createdAt'>Дате оформления</option>
						<option value='updatedAt'>Дате обновления</option>
					</select>

					<button
						className={styles.sortOrderBtn}
						onClick={() => setOrder((o) => (o === "asc" ? "desc" : "asc"))}>
						{order === "asc" ? "↑" : "↓"}
					</button>

					{isFetching && <span className={styles.loading}>⏳</span>}
				</div>

				{/* Фильтр по статусу */}
				<div className={styles.filterWrapper}>
					<label htmlFor='statusFilter'>Статус:</label>
					<select
						id='statusFilter'
						value={filterStatus}
						onChange={(e) => setFilterStatus(e.target.value)}>
						<option value='ALL'>Все</option>
						<option value='CREATED'>Создан</option>
						<option value='PENDING_APPROVAL'>Ожидает подтверждения</option>
						<option value='ACCEPTED'>Принят</option>
						<option value='COMPLETED'>Завершён</option>
					</select>
				</div>
			</div>

			{/* Список заказов по группам */}
			{Object.entries(groupedOrders).map(([status, group]) => (
				<div key={status} className={styles.statusGroup}>
					<div className={styles.ordersList}>
						{group.map((order) => (
							<Card key={order.id} order={order} onGoToOrder={() => handleGoToOrder(order.id)} />
						))}
					</div>
				</div>
			))}

			{/* Кнопка “обновить” */}
			{showCancelButton && (
				<div className={styles.refreshWrapper}>
					<Button onClick={() => window.location.reload()}>Обновить</Button>
				</div>
			)}
		</div>
	);
};

export default Orders;
