import React from "react";
import { AboutSection, ApproachSection, CasesSection } from "./core/pages/HomePage";
import { Hero, RequestForm } from "./core/components";

export default function Page() {
	return (
		<>
			<Hero
				title={"eMessage"}
				subtitle={"сервис по продвижению \nв социальных сетях"}
				about={"Автоматизируем и усилим маркетинг \nдля вашего бизнеса"}
				buttonText={"Перейти к услугам"}
				variant='default'
			/>
			<AboutSection />
			<ApproachSection />
			<CasesSection />
			<RequestForm />
		</>
	);
}
