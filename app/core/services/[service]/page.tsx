import { RequestForm } from "@/app/core/components";
import { servicesData, ServiceKey } from "@/app/core/data/services";
import { Hero, PlansSection, ToolsSection } from "@/app/core/pages/ServicePage";

export default function ServicePage({ params }: { params: { service: ServiceKey } }) {
	const service = servicesData[params.service];

	return (
		<>
			<Hero {...service.hero} theme={params.service} />
			<PlansSection title={service.plans.title} plans={service.plans.list} href={""} />
			<ToolsSection title={service.tools.title} tools={service.tools.list} />
			<RequestForm />
		</>
	);
}
