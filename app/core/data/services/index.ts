import { telegram } from "./telegram";
import { whatsapp } from "./whatsapp";
import { vk } from "./vk";
import { max } from "./max";

export const servicesData = {
	telegram,
	whatsapp,
	vk,
	max,
};

export type ServiceKey = keyof typeof servicesData;
