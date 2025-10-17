"use client";

import React from "react";
import styles from "./Users.module.scss";

interface User {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	ordersCount: number;
}

interface Props {
	users: User[];
}

const Users: React.FC<Props> = ({ users }) => {
	return (
		<div className={styles.tableWrapper}>
			<h1 className={styles.title}>Все пользователи</h1>
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
								<div className={styles.userInfo}>ID: {user.id}</div>
							</td>
							<td>{user.email}</td>
							<td>{user.phone}</td>
							<td>{user.ordersCount}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Users;
