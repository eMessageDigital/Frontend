"use client";

import React from "react";
import { Orders } from "../../core/components";
import { useOrders } from "../../core/components/backend/hooks";

export default function page() {
	return <Orders useOrdersHook={useOrders} title='История заказов' />;
}
