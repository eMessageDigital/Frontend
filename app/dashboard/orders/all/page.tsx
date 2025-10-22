"use client";
import React from "react";
import { Orders } from "../../../core/components";
import { useAllOrders } from "../../../core/components/backend/hooks";

export default function page() {
	return <Orders useOrdersHook={useAllOrders} title='Мои заказы' />;
}
