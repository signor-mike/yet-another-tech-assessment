import express from "express";
import { transactionMiddleware } from "../../middleware/transactionMiddleware.js";
import { commCalc } from "../../utils/comissionCalc.js";
import { comissions } from "../../lib/comissionRates.js";
const router = express.Router();

router.route("/rawr").get(async (req, res, next) => {
	try {
		res.status(200).send({
			song: `
		I got the eye of the tiger, a fighter
		Dancing through the fire
		'Cause I am a champion, and you're gonna hear me roar
		Louder, louder than a lion
		'Cause I am a champion, and you're gonna hear me roar
		`,
		});
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
