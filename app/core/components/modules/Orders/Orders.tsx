"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { rootState } from "../../../store";
import { cancelOrder } from "../../../store/slices/ordersSlice";
import styles from "./Orders.module.scss";
import Card from "./ui/Card";

const Orders: React.FC = () => {
	const dispatch = useDispatch();
	const orders = useSelector((state: rootState) => state.orders.orders);

	const handleCancel = (id: string) => {
		dispatch(cancelOrder(id));
	};

	return (
		<div className={styles.orders}>
			<h2>История заказов</h2>

			{orders.length === 0 && <p>У вас пока нет заказов.</p>}

			<div className={styles.ordersList}>
				{orders.map((order) => (
					<Card key={order.id} order={order} onCancel={handleCancel} />
				))}
			</div>
		</div>
	);
};

export default Orders;
