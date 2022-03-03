import { convert } from "./currencyConverter.js";
import { comissions } from "../lib/comissionRates.js";
import { customers } from "../lib/customers.js";

const { rate, threshold } = comissions.turnoverRate;
const { minimumRate, defaultRate } = comissions;

const defaultComission = (amount) => {
	const comm = amount * defaultRate;
	return comm < minimumRate ? minimumRate : comm;
};

// I am not really proud of these two functions because you'd have to edit both of them if you want to add more cases for discount.
function isEligibleForDiscount(customer_id) {
	const customer = customers.find((customer) => customer.id === customer_id);
	if (!customer)
		throw Error("Customer not found, please try following IDs: 1, 42, 666"); // КОСТЫЛИ

	if (customer.turnover >= threshold)
		return { discount: true, comission: rate };

	if (customer.hasDiscount) return { discount: true, comission: minimumRate };

	return { discount: false, comission: defaultRate };
}

export async function commCalc(amount, currency, customer_id) {
	const { comission, discount } = isEligibleForDiscount(customer_id);
	const convertedAmount = await convert(amount, currency);
	let result;
	switch (comission && discount) {
		case minimumRate && true:
			result = comission;
			break;
		case defaultRate && true:
			result = comission;
			break;

		default:
			result = defaultComission(convertedAmount);
			break;
	}
	result = (Math.round(result * 100) / 100).toString();
	return result;
}
