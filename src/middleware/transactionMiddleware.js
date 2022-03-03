export function transactionMiddleware(req, res, next) {
	const { date, amount, currency, client_id } = req.body;
	if (!date) throw new Error("Date is required");
	if (!amount) throw new Error("Amount is required");
	if (!currency) throw new Error("Currency is required");
	if (!client_id) throw new Error("Client ID is required");
	next();
}
