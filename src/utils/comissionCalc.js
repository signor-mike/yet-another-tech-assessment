import { convert } from "./currencyConverter.js";
import { comissions } from "../lib/comissionRates.js";
import { customers } from "../lib/customers.js";

const { rate, threshold } = comissions.turnoverRate;
const { minimumRate, defaultRate } = comissions;

const defaultComission = (amount) => {
	const comm = amount * defaultRate;
	return comm < minimumRate ? minimumRate : comm;
};

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

/*
{
  "amount": "0.05",
  "currency": "EUR"
}
*/

// lowest commision is 0.03 if turnover > 1000 so RETURN 0.03
// if client id is 42 - discount is 0.05 UNLESS has largest turnover
// default rate is 0.05

/*
Rule #1: Default pricing

By default the price for every transaction is 0.5% but not less than 0.05€.

Rule #2: Client with a discount

Transaction price for the client with ID of 42 is 0.05€ (unless other rules set lower commission).

Rule #3: High turnover discount

Client after reaching transaction turnover of 1000.00€ (per month) gets a discount and transaction commission is 0.03€ for the following transactions.
*/
