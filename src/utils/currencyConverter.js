import axios from "axios";

export async function convert(amount, currency) {
	const request = await axios.get("https://api.exchangerate.host/2021-01-01");
	const rate = request.data.rates[currency];
	const result = amount * rate;
	return result;
}
