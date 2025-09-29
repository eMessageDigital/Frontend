import React, { useState } from "react";
import styles from "./Card.module.scss";
import { BaseModal, Button } from "../../..";
import { PenLine, Save, Trash } from "lucide-react"; // иконка кнопки сохранения

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
	const [draftNote, setDraftNote] = useState("");
	const [isEditing, setIsEditing] = useState(false);
	const [isNotesOpen, setIsNotesOpen] = useState(false);
	const [notes, setNotes] = useState<string[]>([]); // массив заметок

	const ctrCount = Math.round((order.ctr / 100) * order.reach);
	const conversionCount = Math.round((order.conversion / 100) * order.reach);
	const leadsCount = Math.round((order.ctr / 100) * (order.conversion / 100) * order.reach);

	const handleSaveNote = () => {
		if (draftNote.trim()) {
			setNotes([...notes, draftNote.trim()]);
			setDraftNote("");
			setIsEditing(false);
		}
	};

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

			<BaseModal isOpen={isNotesOpen} onClose={() => setIsNotesOpen(false)}>
				<div className={styles.notesModal}>
					<h2>Заметки к заказу №{order.id}</h2>

					{/* Список существующих заметок */}
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
											<span>
												<Trash />
											</span>
										</Button>

										<Button
											type='button'
											className={styles.actionBtn}
											onClick={() => {
												setDraftNote(n);
												setIsEditing(true);
												setNotes(notes.filter((_, idx) => idx !== i));
											}}>
											<span>
												<PenLine />
											</span>
										</Button>
									</div>
								</div>
							))}
						</div>
					)}

					{/* Инпут для добавления новой заметки */}
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

					{/* Если нет заметок и не редактируем */}
					{notes.length === 0 && !isEditing && (
						<div className={styles.noNotes}>
							<p>У вас пока нет заметок к данному заказу :(</p>
						</div>
					)}

					{/* Кнопка "Добавить заметку" */}
					<div className={styles.addBtnWrapper}>
						<Button className={styles.primary} onClick={() => setIsEditing(true)}>
							Добавить
						</Button>
					</div>
				</div>
			</BaseModal>
		</div>
	);
};

export default Card;
