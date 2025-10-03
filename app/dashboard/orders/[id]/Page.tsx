"use client";

import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { rootState } from "../../../core/store";
import { OrderDetails } from "../../../core/components";

export const dynamic = "force-dynamic";

export default function OrderDetailsPage() {
	const { id } = useParams<{ id: string }>();
	const order = useSelector((state: rootState) => state.orders.orders.find((o) => o.id === id));

	if (!order) {
		return <p>Заказ не найден</p>;
	}

	return <OrderDetails />;
}
