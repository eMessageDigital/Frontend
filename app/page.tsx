import React from "react";
import { AboutSection, ApproachSection, CasesSection, Hero } from "./core/pages/HomePage";
import { RequestForm } from "./core/components";

export default function Page() {
	return (
		<>
			<Hero
				title={"eMessage"}
				subtitle={`сервис по продвижению \nв социальных сетях`}
				about={"Автоматизируем и усилим маркетинг \nдля вашего бизнеса"}
				buttonText={"Перейти к услугам"}
			/>
			<AboutSection />
			<ApproachSection />
			<CasesSection />
			<RequestForm />
		</>
	);
}
