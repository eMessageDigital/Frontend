"use client";

import { useParams } from "next/navigation";
import { OrderDetails } from "../../../core/components";
import { useOrder } from "../../../core/components/backend/hooks/useOrder";

export default function OrderDetailsPage() {
	const { id } = useParams<{ id: string }>();
	const { data: order, isLoading, isError } = useOrder(id!);

	if (isLoading) return <p>Загрузка...</p>;
	if (isError || !order) return <p>Заказ не найден</p>;

	return <OrderDetails order={order} />;
}
