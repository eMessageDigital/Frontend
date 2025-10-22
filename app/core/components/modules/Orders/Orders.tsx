"use client";

import React from "react";
import styles from "./Orders.module.scss";
import Card from "./ui/Card";
import { useRouter } from "next/navigation";

export interface Order {
	id: string;
	userId: string;
	base?: string;
	desiredLaunchAt?: string;
	offer?: string;
	projectDetails?: string;
	status: "CREATED" | "PENDING_APPROVAL" | "ACCEPTED" | "COMPLETED";
	createdAt: string;
	updatedAt: string;
	user?: {
		id: string;
		displayName?: string;
		email?: string;
	};
}

interface OrdersProps {
	useOrdersHook: () => {
		data?: Order[];
		isLoading: boolean;
		isError: boolean;
	};
	title?: string;
	showCancelButton?: boolean;
}

const Orders: React.FC<OrdersProps> = ({
	useOrdersHook,
	title = "История заказов",
	showCancelButton = false,
}) => {
	const { data: orders, isLoading, isError } = useOrdersHook();
	const router = useRouter();

	const handleGoToOrder = (id: string) => {
		router.push(`/dashboard/orders/${id}`);
	};

	const handleCancel = (id: string) => {
		console.log("Cancel order", id);
	};

	if (isLoading) return <p>Загрузка заказов...</p>;
	if (isError) return <p>Ошибка при загрузке заказов</p>;

	if (!orders || orders.length === 0) return <p>Заказов пока нет.</p>;

	return (
		<div className={styles.orders}>
			<h2>{title}</h2>

			<div className={styles.ordersList}>
				{orders.map((order: Order) => (
					<Card
						key={order.id}
						order={order}
						onCancel={showCancelButton ? () => handleCancel(order.id) : undefined}
						onGoToOrder={() => handleGoToOrder(order.id)}
					/>
				))}
			</div>
		</div>
	);
};

export default Orders;
