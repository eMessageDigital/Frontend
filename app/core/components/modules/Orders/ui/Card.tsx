import React, { useState } from "react";
import styles from "./Card.module.scss";
import { BaseModal, Button } from "../../..";
import { PenLine, Save, Trash } from "lucide-react";

interface Order {
	id: string;
	createdAt: string;
	status: string;
	price?: number;
	reach?: number;
	leads?: number;
	ctr?: number;
	conversion?: number;
}

interface CardProps {
	order: Order;
	onCancel?: (id: string) => void;
	onGoToOrder?: (id: string) => void;
}

const formatToMoscowTime = (dateString: string): string => {
	if (!dateString) return "—";
	try {
		return new Date(dateString).toLocaleString("ru-RU", {
			timeZone: "Europe/Moscow",
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	} catch {
		return "Некорректная дата";
	}
};

const Card: React.FC<CardProps> = ({ order, onCancel, onGoToOrder }) => {
	const [draftNote, setDraftNote] = useState("");
	const [isEditing, setIsEditing] = useState(false);
	const [isNotesOpen, setIsNotesOpen] = useState(false);
	const [notes, setNotes] = useState<string[]>([]);

	const ctrCount =
		order.ctr && order.reach ? Math.round((order.ctr / 100) * order.reach) : undefined;
	const conversionCount =
		order.conversion && order.reach
			? Math.round((order.conversion / 100) * order.reach)
			: undefined;
	const leadsCount =
		order.ctr && order.conversion && order.reach
			? Math.round((order.ctr / 100) * (order.conversion / 100) * order.reach)
			: undefined;

	const handleSaveNote = () => {
		if (draftNote.trim()) {
			setNotes([...notes, draftNote.trim()]);
			setDraftNote("");
			setIsEditing(false);
		}
	};

	const createdDate = formatToMoscowTime(order.createdAt);

	return (
		<div className={styles.orderCard}>
			<div className={styles.cardHeader}>
				<h3 onClick={() => onGoToOrder?.(order.id)}>
					Заказ №{order.id} от {createdDate}
				</h3>
				<p>{order.price != null ? `${Number(order.price).toLocaleString("ru-RU")} ₽` : "—"}</p>
			</div>

			<div className={styles.cardMain}>
				<div className={styles.column}>
					<p>
						<strong>Охват:</strong> {order.reach ?? "Скоро появится"}
					</p>
					<p>
						<strong>CTR:</strong> {order.ctr ?? "Скоро появится"}
						{ctrCount !== undefined ? ` (${ctrCount} чел.)` : ""}
					</p>
				</div>

				<div className={styles.column}>
					<p>
						<strong>Конверсия:</strong> {order.conversion ?? "Скоро появится"}
						{conversionCount !== undefined ? ` (${conversionCount} чел.)` : ""}
					</p>
					<p>
						<strong>Лидогенерация:</strong> {leadsCount ?? "Скоро появится"}
					</p>
				</div>

				<div className={styles.row}>
					<Button className={styles.secondary} onClick={() => setIsNotesOpen(true)}>
						Заметки
					</Button>
					<Button onClick={() => onGoToOrder?.(order.id)} className={styles.primary}>
						Детали заказа
					</Button>
				</div>
			</div>

			<BaseModal isOpen={isNotesOpen} onClose={() => setIsNotesOpen(false)}>
				<div className={styles.notesModal}>
					<h2>Заметки к заказу №{order.id}</h2>

					{notes.length > 0 && (
						<div className={styles.notesList}>
							{notes.map((n, i) => (
								<div key={i} className={styles.noteItem}>
									<span className={styles.noteText}>{n}</span>
									<div className={styles.noteActions}>
										<Button
											type='button'
											className={styles.actionBtn}
											onClick={() => setNotes(notes.filter((_, idx) => idx !== i))}>
											<Trash />
										</Button>
										<Button
											type='button'
											className={styles.actionBtn}
											onClick={() => {
												setDraftNote(n);
												setIsEditing(true);
												setNotes(notes.filter((_, idx) => idx !== i));
											}}>
											<PenLine />
										</Button>
									</div>
								</div>
							))}
						</div>
					)}

					{isEditing && (
						<div className={styles.addingNote}>
							<div className={styles.noteInputWrapper}>
								<input
									type='text'
									value={draftNote}
									onChange={(e) => setDraftNote(e.target.value)}
									placeholder='Введите заметку...'
									className={styles.noteInput}
								/>
								<Button className={styles.saveIconBtn} onClick={handleSaveNote}>
									<Save size={16} />
								</Button>
							</div>
						</div>
					)}

					{notes.length === 0 && !isEditing && <p>У вас пока нет заметок к данному заказу :(</p>}

					<Button className={styles.primary} onClick={() => setIsEditing(true)}>
						Добавить
					</Button>
				</div>
			</BaseModal>
		</div>
	);
};

export default Card;
