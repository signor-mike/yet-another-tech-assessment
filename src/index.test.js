import server from "./server.js";
import supertest from "supertest";
import { convert } from "./utils/currencyConverter.js";
import { commCalc } from "./utils/comissionCalc.js";
import axios from "axios";

const request = supertest(server);

describe("Testing tests", () => {
	it("should test that true is true", () => {
		expect(true).toBe(true);
	});
});

describe("Testing endpoints", () => {
	it("should sing Katy Perry", async () => {
		const response = await request.get("/api/rawr");
		console.log(response.body.song);
		expect(response.status).toBe(200);
		expect(response.body.song).toBe(`
		I got the eye of the tiger, a fighter
		Dancing through the fire
		'Cause I am a champion, and you're gonna hear me roar
		Louder, louder than a lion
		'Cause I am a champion, and you're gonna hear me roar
		`);
	});

	/* probably unit test, dunno, I am not really good with tests and stuff;
	I assume it has to test one thing (function?) */
	it("should convert 100 USD to EUR with exchange rate of 2021-01-01", async () => {
		const response = await convert(100, "USD");
		const request = await axios.get(
			"https://api.exchangerate.host/2021-01-01"
		);
		const rate = request.data.rates["USD"];
		expect(response).toBe(100 * rate);
	});

	/* this gotta be an integration test: the one what tests the whole thing */
	it("should give you a teapot because customer does not exist", async () => {
		const response = await request.post("/api/transaction").send({
			client_id: 69,
			amount: 65535,
			currency: "USD",
			date: "2021-01-01",
		});
		expect(response.status).toBe(418);
		expect(response.text).toContain("teapot");
	});
	it("should give the lowest commission due to high turnover rate", async () => {
		const response = await request.post("/api/transaction").send({
			client_id: 666,
			amount: 2000,
			currency: "USD",
			date: "2021-01-01",
		});
		expect(response.status).toBe(200);
		expect(response.body.amount).toBe("0.03");
		expect(response.body.currency).toBe("EUR");
	});

	it("should give default commission", async () => {
		const response = await request.post("/api/transaction").send({
			client_id: 1,
			amount: 100,
			currency: "USD",
			date: "2021-01-01",
		});
		const comission = await commCalc(100, "USD", 1);
		expect(response.status).toBe(200);
		expect(response.body.amount).toBe(comission);
		expect(response.body.currency).toBe("EUR");
	});

	it("should give discounted comission because customer has discount", async () => {
		const response = await request.post("/api/transaction").send({
			client_id: 42,
			amount: 10000,
			currency: "USD",
			date: "2021-01-01",
		});
		expect(response.status).toBe(200);
		expect(response.body.amount).toBe("0.05");
		expect(response.body.currency).toBe("EUR");
	});
});

afterAll((done) => {
	done();
});
