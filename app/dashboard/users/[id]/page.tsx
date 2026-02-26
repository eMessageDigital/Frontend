"use client";

import { useParams } from "next/navigation";
import { Orders } from "../../../core/components";

export default function UserOrdersPage() {
	const { id } = useParams<{ id: string }>();

	if (!id) return null;

	return <Orders title='История заказов пользователя' userId={id} />;
}
