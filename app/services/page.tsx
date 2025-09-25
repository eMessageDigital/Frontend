import { Hero } from "../core/components";
import { OurServices } from "../core/pages/ServicesPage";

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
