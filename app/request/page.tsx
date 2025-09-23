import React from "react";
import Form from "../core/components/modules/Form/Form";
import { AdvantagesSection, Hero } from "../core/pages/RequestPage";

export default function page() {
	return (
		<>
			<Hero
				title={"eMessage"}
				subtitle={"Мгновенные рассылки \nв социальных сетях"}
				buttonText={"Заказать рассылку"}
				theme='telegram'
			/>
			<AdvantagesSection />
			<Form />
		</>
	);
}
