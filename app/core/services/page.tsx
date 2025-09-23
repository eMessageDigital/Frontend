import { Hero, OurServices } from "@/app/core/pages/ServicesPage";

export default function ServicesPage() {
	return (
		<>
			<Hero
				title={"eMessage"}
				subtitle={"закажите у нас рассылку \nв социальных сетях"}
				buttonText={"Перейти к услугам"}
			/>
			<OurServices />
		</>
	);
}
