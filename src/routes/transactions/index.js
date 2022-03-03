import express from "express";
import { transactionMiddleware } from "../../middleware/transactionMiddleware.js";
import { commCalc } from "../../utils/comissionCalc.js";
import { comissions } from "../../lib/comissionRates.js";
const router = express.Router();

router.route("/test").get(async (req, res, next) => {
	try {
		res.status(200).send(`IT'S ALIVE!!!`);
	} catch (error) {
		next(error);
	}
});

router
	.route("/transaction")
	.post(transactionMiddleware, async (req, res, next) => {
		try {
			const { amount, currency, client_id } = req.body;
			const result = await commCalc(amount, currency, client_id);
			res.status(200).send({
				amount: result,
				currency: comissions.currency,
			});
		} catch (error) {
			next(error);
		}
	});

export default router;
