"use client";

import React from "react";
import styles from "./RequestForm.module.scss";
import { FaTelegramPlane, FaPhoneAlt } from "react-icons/fa";
import { Container } from "../../ui/Container/Container";
import { Button } from "../..";

export const RequestForm: React.FC = () => {
	return (
		<Container className={styles.sectionContainer}>
			<div className={styles.requestWrapper}>
				{/* Левая часть */}
				<div className={styles.left}>
					<h1>
						Начните управлять <br />
						бизнесом, <br /> <span>а не рутинными задачами</span>
					</h1>
				</div>

				{/* Правая часть */}
				<div className={styles.right}>
					<h1>
						Оставьте заявку, <br /> и мы свяжемся с вами!
					</h1>
					<p>
						Выясним ваши бизнес-задачи, определим, <br /> с чего начать, и ответим на все ваши
						вопросы
					</p>
					<div className={styles.buttons}>
						<Button className={styles.mainButton}>Оставить заявку</Button>
						<div className={styles.smallButtons}>
							<Button className={styles.iconButton}>
								<FaPhoneAlt />
							</Button>
							<Button className={styles.iconButton}>
								<FaTelegramPlane />
							</Button>
						</div>
					</div>
				</div>
			</div>
		</Container>
	);
};
