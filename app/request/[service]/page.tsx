"use client";

import { useParams, useSearchParams } from "next/navigation";
import Form from "../../core/components/modules/Form/Form";
import { AdvantagesSection } from "../../core/pages/RequestPage";
import { ServiceKey, servicesData } from "../../core/data/services";
import { Hero } from "../../core/components";

export default function RequestPage() {
	const params = useParams();
	const searchParams = useSearchParams();

	const serviceKey = (params?.service as ServiceKey) ?? "telegram";
	const plan = searchParams.get("plan");
	const service = servicesData[serviceKey];

	return (
		<>
			<Hero {...service.hero} variant={serviceKey} />
			<AdvantagesSection />
			<Form plan={plan} serviceData={service} />
		</>
	);
}
