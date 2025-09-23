import { telegram } from "./telegram";
import { whatsapp } from "./whatsapp";
import { vk } from "./vk";

export const servicesData = {
	telegram,
	whatsapp,
	vk,
};

export type ServiceKey = keyof typeof servicesData;
