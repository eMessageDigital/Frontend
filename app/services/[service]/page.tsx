"use client";

import { useDispatch } from "react-redux";
import { Hero, RequestForm } from "../../core/components";
import { ServiceKey, servicesData } from "../../core/data/services";
import { PlansSection, ToolsSection } from "../../core/pages/ServicePage";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { setService } from "../../core/store/slices/serviceSlice";

export default function ServicePage() {
	const params = useParams();
	const serviceKey = params?.service as ServiceKey;

	const service = servicesData[serviceKey];
	const dispatch = useDispatch();

	useEffect(() => {
		if (serviceKey) {
			dispatch(setService(serviceKey));
		}
	}, [serviceKey, dispatch]);

	return (
		<>
			<Hero {...service.hero} variant={serviceKey} />
			<PlansSection title={service.plans.title} plans={service.plans.list} href={""} />
			<ToolsSection title={service.tools.title} tools={service.tools.list} />
			<RequestForm />
		</>
	);
}
