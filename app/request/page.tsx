import { AdvantagesSection, Hero } from "@/app/core/pages/RequestPage";
import React from "react";
import Form from "../core/components/modules/Form/Form";

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
