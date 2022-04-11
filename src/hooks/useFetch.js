import { useState, useEffect, useCallback } from "react";
import axios from "axios";

/* mock api */
import locas from "../loca/index.js";

const api = "https://dev-api.confidence.org/v2/confidence/locations";
const corsBypass = "https://cors-anywhere.herokuapp.com";
const url = corsBypass + "/" + api;

function useFetch(page) {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [locations, setLocations] = useState([]);
	const headers = {
		"Content-Type": "application/json",
		Username: "amitphatak$r5labs.com",
	};

	const sendQuery = useCallback(async () => {
		try {
			await setLoading(true);
			await setError(false);
			const res = await axios.post(
				url,
				{ start: page, limit: 10 },
				{ headers }
			);
			await setLocations((prev) => [...prev, ...res.data.locations]);
			setLoading(false);
		} catch (err) {
			setError(err + "\ngetting data from local storage...");
			const locs = locas(page);
			if (page <= 5) setLocations((prev) => [...prev, ...locs]);
			else {
				setError("No more data to load, you've seen it all");
				return;
			}
		} finally {
			setLoading(false);
		}
	}, [page]);

	useEffect(() => {
		sendQuery();
	}, [sendQuery, page]);

	return { loading, error, locations };
}

export default useFetch;
