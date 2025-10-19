"use client";

import React, { useState, useEffect } from "react";
import styles from "./Users.module.scss";
import { useUsers, User } from "../../backend/hooks";
import { Button, Input } from "../..";

const Users: React.FC = () => {
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState("");
	const [debouncedSearch, setDebouncedSearch] = useState("");
	const [sortBy, setSortBy] = useState<"createdAt" | "ordersCount">("createdAt");
	const [order, setOrder] = useState<"asc" | "desc">("desc");

	useEffect(() => {
		const handler = setTimeout(() => setDebouncedSearch(search), 500);
		return () => clearTimeout(handler);
	}, [search]);

	const { data, isLoading, error } = useUsers({
		page,
		limit: 10,
		search: debouncedSearch,
		sortBy,
		order,
	});

	if (isLoading) return <div>Загрузка...</div>;
	if (error) return <div>{error.message}</div>;
	if (!data) return null;

	const users: User[] = data.data ?? [];
	const totalPages = data.totalPages ?? 1;

	return (
		<div className={styles.tableWrapper}>
			<h1 className={styles.title}>Все пользователи</h1>

			<div className={styles.controls}>
				<div className={styles.searchWrapper}>
					<Input
						type='text'
						placeholder='Поиск по имени или e-mail'
						value={search}
						onChange={(e) => {
							setSearch(e.target.value);
							setPage(1);
						}}
						className={styles.searchInput}
					/>
				</div>

				<div className={styles.sortWrapper}>
					<label htmlFor='sort' className={styles.sortLabel}>
						Сортировать по:
					</label>
					<select
						id='sort'
						className={styles.sortSelect}
						value={sortBy}
						onChange={(e) => {
							setSortBy(e.target.value as "createdAt" | "ordersCount");
							setPage(1);
						}}>
						<option value='createdAt'>Дате регистрации</option>
						<option value='ordersCount'>Кол-ву заказов</option>
					</select>

					<button
						className={styles.sortOrderBtn}
						onClick={() => setOrder((o) => (o === "asc" ? "desc" : "asc"))}>
						{order === "asc" ? "↑" : "↓"}
					</button>
				</div>
			</div>

			<table className={styles.table}>
				<thead>
					<tr>
						<th className={styles.headerCell}>Имя Фамилия</th>
						<th className={styles.headerCell}>E-mail</th>
						<th className={styles.headerCell}>Телефон</th>
						<th className={styles.headerCell}>Кол-во заказов</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<tr className={styles.row} key={user.id}>
							<td>
								<div className={styles.userInfo}>
									{user.firstName} {user.lastName}
								</div>
								<div className={styles.userInfoId}>ID: {user.id}</div>
							</td>
							<td>{user.email}</td>
							<td>{user.phone}</td>
							<td>{user.ordersCount}</td>
						</tr>
					))}
				</tbody>
			</table>

			<div className={styles.pagination}>
				<Button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
					Назад
				</Button>
				<span>
					{page} / {totalPages}
				</span>
				<Button
					onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
					disabled={page === totalPages}>
					Вперед
				</Button>
			</div>
		</div>
	);
};

export default Users;
