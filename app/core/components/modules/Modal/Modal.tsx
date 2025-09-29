"use client";

import React from "react";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { rootState } from "../../../store";
import { closeModal, toggleMode } from "../../../store/slices/modalSlice";
import styles from "./Modal.module.scss";
import Input from "../../ui/Input/Input";
import Image from "next/image";
import { login } from "../../../store/slices/authSlice";

const Modal: React.FC = () => {
	const dispatch = useDispatch();
	const { isOpen, mode } = useSelector((state: rootState) => state.modal);

	if (!isOpen) return null;

	const modalRoot = document.getElementById("modal-root-auth");
	if (!modalRoot) return null;

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (mode === "register") {
			dispatch(login({ name: "Новый пользователь", email: "new@mail.com" }));
		} else {
			dispatch(login({ name: "Demo", email: "demo@mail.com" }));
		}

		dispatch(closeModal());
	};

	const heroBgColor = mode === "register" ? "#828EFF" : "#53BBFF";

	return ReactDOM.createPortal(
		<div className={styles.overlay} onClick={() => dispatch(closeModal())}>
			<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
				<div className={styles.hero} style={{ backgroundColor: heroBgColor }}>
					<Image
						src='/img/assets/planeblue.svg'
						alt='Airplane'
						width={370}
						height={246}
						className={styles.heroPlane}
					/>
					<h2 className={styles.heroTitle}>{mode === "login" ? "Вход" : "Регистрация"}</h2>

					<button className={styles.heroClose} onClick={() => dispatch(closeModal())}>
						✕
					</button>
				</div>

				{/* Форма */}
				<form className={styles.form} onSubmit={handleSubmit}>
					{mode === "register" && (
						<div className={styles.inputGroup}>
							<label htmlFor='name'>Имя</label>
							<Input className={styles.input} type='text' id='name' name='name' />
						</div>
					)}

					<div className={styles.inputGroup}>
						<label htmlFor='email'>Email</label>
						<Input className={styles.input} type='email' id='email' name='email' />
					</div>

					<div className={styles.inputGroup}>
						<label htmlFor='password'>Пароль</label>
						<Input className={styles.input} type='password' id='password' name='password' />
					</div>

					{/* Нижний блок с кнопкой и текстом */}
					<div className={styles.bottomRow}>
						<button
							type='submit'
							className={styles.submitBtn}
							style={{
								backgroundColor: mode === "register" ? "#828EFF" : "#53BBFF",
							}}>
							{mode === "login" ? "Войти" : "Зарегистрироваться"}
						</button>

						{mode === "register" && (
							<span className={styles.infoText}>
								Нажимая на кнопку, Вы принимаете условия пользовательского соглашения
							</span>
						)}
					</div>
				</form>

				<p className={styles.toggle} onClick={() => dispatch(toggleMode())}>
					{mode === "login" ? "Нет аккаунта? Зарегистрироваться" : "Есть аккаунт? Войти"}
				</p>
			</div>
		</div>,
		modalRoot
	);
};

export default Modal;
