"use client";

import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { rootState } from "../../../../core/store";
import styles from "./OrderDetails.module.scss";
import { FileCard, Input } from "../..";

export default function OrderDetails() {
	const { id } = useParams<{ id: string }>();
	const dispatch = useDispatch();

	const order = useSelector((state: rootState) => state.orders.orders.find((o) => o.id === id));

	const contractors = useSelector((state: rootState) => state.profile.contractors);

	if (!order) return <p>Заказ не найден</p>;

	const orderContractors = contractors.filter((c) => order.contractorIds.includes(c.id));

	const handleRemoveContractor = (contractorId: string) => {
		dispatch({
			type: "orders/removeContractor",
			payload: { orderId: order.id, contractorId },
		});
	};

	return (
		<div className={styles.orderDetails}>
			{/* Заголовок */}
			<div className={styles.header}>
				<h2>Заказ №{order.id}</h2>
				<span
					className={`${styles.status} ${
						order.status === "Выполнен"
							? styles.done
							: order.status === "В обработке"
							? styles.pending
							: styles.cancelled
					}`}>
					{order.status}
				</span>
			</div>

			<section className={styles.contractorsList}>
				{orderContractors.length > 0 ? (
					orderContractors.map((c) => (
						<div key={c.id} className={styles.contractorCard}>
							<div className={styles.contractorCardHeader}>
								<h4>{c.name}</h4>
							</div>
							<div className={styles.contractorCardText}>
								<p>
									ИНН: <span>{c.inn}</span>
								</p>
								<p>
									КПП: <span>{c.kpp}</span>
								</p>
								<p>
									ОГРН(ОГРНИП): <span>{c.ogrn}</span>
								</p>
							</div>
						</div>
					))
				) : (
					<p className={styles.contractorNone}>Исполнители не добавлены</p>
				)}
			</section>

			<section className={styles.info}>
				<div className={styles.sectionHeader}>
					<div>
						<p>База</p>
						<Input className={styles.input} readOnly />
					</div>
					<div>
						<p>Желаемое время запуска</p>
						<Input className={styles.input} readOnly />
					</div>
				</div>
				<div className={styles.offer}>
					<p>Оффер</p>
					<Input readOnly />
				</div>
				<div className={styles.about}>
					<p>О проекте</p>
					<Input readOnly />
				</div>
				<div className={styles.files}>
					<p className={styles.text}>Прикрепленные файлы</p>
					<div className={styles.bottomFiles}>
						<FileCard name={"main.txt"} />
						<FileCard name={"main.txt"} />
						<FileCard name={"main.txt"} />
						<FileCard name={"main.txt"} />
						<FileCard name={"main.txt"} />
						<FileCard name={"penis.txt"} />
						<FileCard name={"main.txt"} />
						<FileCard name={"tgotchet.txt"} />
						<FileCard name={"main.txt"} />
						<FileCard name={"main.txt"} />
						<FileCard name={"main.txt"} />
					</div>
				</div>
			</section>

			<h1 className={styles.resultsTitle}>Результаты</h1>
			<section className={styles.result}>
				<div className={styles.row}>
					<div>
						<p>Охват</p>
						<Input className={styles.input} readOnly value={order.reach} />
					</div>
					<div>
						<p>Конверсия</p>
						{(() => {
							const conversionCount = Math.round((order.conversion / 100) * order.reach);
							return (
								<Input
									className={styles.input}
									readOnly
									value={`${order.conversion}% (${conversionCount})`}
								/>
							);
						})()}
					</div>
				</div>
				<div className={styles.row}>
					<div>
						<p>CTR</p>
						{(() => {
							const ctrCount = Math.round((order.ctr / 100) * order.reach);
							return (
								<Input className={styles.input} readOnly value={`${order.ctr}% (${ctrCount})`} />
							);
						})()}
					</div>
					<div>
						<p>Лидогенерация</p>
						{(() => {
							const leadsCount = Math.round(
								(order.ctr / 100) * (order.conversion / 100) * order.reach
							);
							return <Input className={styles.input} readOnly value={`${leadsCount}`} />;
						})()}
					</div>
				</div>

				<div className={styles.files}>
					<p className={styles.text}>Прикрепленные файлы</p>
					<div className={styles.bottomFiles}>
						<FileCard name={"main.txt"} />
						<FileCard name={"main.txt"} />
						<FileCard name={"main.txt"} />
						<FileCard name={"main.txt"} />
						<FileCard name={"main.txt"} />
						<FileCard name={"penis.txt"} />
						<FileCard name={"main.txt"} />
						<FileCard name={"tgotchet.txt"} />
						<FileCard name={"main.txt"} />
						<FileCard name={"main.txt"} />
						<FileCard name={"main.txt"} />
					</div>
				</div>
			</section>
		</div>
	);
}
