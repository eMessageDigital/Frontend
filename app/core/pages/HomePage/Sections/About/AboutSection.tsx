import styles from "./AboutSection.module.scss";

import Image from "next/image";
import { Container } from "../../../../components";

export default function AboutSection() {
	return (
		<div className={styles.one}>
			<Container>
				<div className={styles.gridContainer}>
					<div className={styles.card1}>
						<div>
							<h1 className={styles.sectionTitle}>Мы -</h1>
							<Image src={"/img/logoicon.svg"} width={52} height={52} alt='logo'></Image>
							<h1 className={styles.accent}>eMessage</h1>
						</div>
						<p>Сервис, который продвигает проекты в социальных сетях и мессенджерах.</p>
					</div>
					<div className={styles.card2}>
						<Image
							className={styles.background}
							height={420}
							width={420}
							src={"/img/assets/Group.png"}
							alt=''></Image>
						<h1>Наша цель</h1>
						<p>
							Помочь вашему бизнесу <br /> расти и достигать <br />
							максимальных результатов
							<br /> с минимальными затратами <br />
							на таргет и ресурсы.
						</p>
					</div>
					<div className={styles.card3}>
						<h1>Что мы делаем</h1>
						<div className={styles.services}>
							<div className={styles.service}>
								<Image width={62} height={62} src={"/ico/light.svg"} alt='icon'></Image>
								<p>Анализируем задачи и целевую аудиторию</p>
							</div>
							<div className={styles.service}>
								<Image width={62} height={62} src={"/ico/monitor.svg"} alt='icon'></Image>
								<p>Подбираем оптимальные инструменты продвижения</p>
							</div>
							<div className={styles.service}>
								<Image width={62} height={62} src={"/ico/purpose.svg"} alt='icon'></Image>
								<p>Реализуем стратегию на высшем уровне</p>
							</div>
						</div>
					</div>
					<div className={styles.card4}>
						<h1>
							С нами вы получаете <br /> не просто услугу
						</h1>
						<p>
							Вы получаете комплексное решение, <br /> которое работает на результат.
						</p>
					</div>
				</div>
			</Container>
		</div>
	);
}
