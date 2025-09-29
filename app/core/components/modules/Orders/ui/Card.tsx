import React, { useState } from "react";
import styles from "./Card.module.scss";
import { BaseModal, Button } from "../../..";

interface Order {
	id: string;
	date: string;
	status: string;
	total: number;
	reach: number;
	leads: number;
	ctr: number;
	conversion: number;
}

interface CardProps {
	order: Order;
	onCancel: (id: string) => void;
}

const Card: React.FC<CardProps> = ({ order, onCancel }) => {
	const [isNotesOpen, setIsNotesOpen] = useState(false);
	const [note, setNote] = useState("");

	// Вычисляем количество людей
	const ctrCount = Math.round((order.ctr / 100) * order.reach);
	const conversionCount = Math.round((order.conversion / 100) * order.reach);
	const leadsCount = Math.round((order.ctr / 100) * (order.conversion / 100) * order.reach);

	return (
		<div className={styles.orderCard}>
			<div className={styles.cardHeader}>
				<h3>
					Заказ №{order.id} от {order.date}
				</h3>
				<p>{order.total} ₽</p>
			</div>

			<div className={styles.cardMain}>
				<div className={styles.column}>
					<p>
						<strong>Охват:</strong> {order.reach}
					</p>
					<p>
						<strong>CTR:</strong> {order.ctr}% ({ctrCount} чел.)
					</p>
				</div>

				<div className={styles.column}>
					<p>
						<strong>Конверсия:</strong> {order.conversion}% ({conversionCount} чел.)
					</p>
					<p>
						<strong>Лидогенерация:</strong> {leadsCount} чел.
					</p>
				</div>

				<div className={styles.row}>
					<Button className={styles.secondary} onClick={() => setIsNotesOpen(true)}>
						Заметки
					</Button>
					<Button className={styles.primary}>Детали заказа</Button>
				</div>
			</div>

			{/* Модалка заметок */}
			<BaseModal isOpen={isNotesOpen} onClose={() => setIsNotesOpen(false)}>
				<div className={styles.notesModal}>
					<h2>Заметки к заказу №{order.id}</h2>

					{note ? (
						<>
							<p className={styles.noteText}>{note}</p>
							<div className={styles.addBtnWrapper}>
								<Button
									className={styles.secondary}
									onClick={() => setNote("")} // сброс для добавления новой
								>
									Добавить заметку
								</Button>
							</div>
						</>
					) : (
						<>
							<textarea
								value={note}
								onChange={(e) => setNote(e.target.value)}
								placeholder='Введите заметку...'
								className={styles.textarea}
							/>
							<div className={styles.modalButtons}>
								<Button className={styles.secondary} onClick={() => setIsNotesOpen(false)}>
									Закрыть
								</Button>
								<Button
									className={styles.primary}
									onClick={() => {
										if (note.trim()) {
											console.log("Сохранили заметку:", note);
										}
									}}>
									Сохранить
								</Button>
							</div>
						</>
					)}
				</div>
			</BaseModal>
		</div>
	);
};

export default Card;
