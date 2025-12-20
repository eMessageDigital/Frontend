"use client";
import React from "react";
import { Orders } from "../../../core/components";

export default function page() {
	return <Orders isAdmin={true} title='Мои заказы' />;
}
