import useFetch from "./hooks/useFetch";
import { useEffect, useState, useCallback, useRef } from "react";
function App() {
	const [page, setPage] = useState(1);
	const { loading, error, locations } = useFetch(page);
	const loader = useRef(null);

	const handleObserver = useCallback((entries) => {
		const target = entries[0];
		if (target.isIntersecting) {
			setPage((prev) => prev + 1);
		}
	}, []);

	useEffect(() => {
		const option = {
			root: null,
			rootMargin: "20px",
			threshold: 0,
		};
		const observer = new IntersectionObserver(handleObserver, option);
		if (loader.current) observer.observe(loader.current);
	}, [handleObserver]);

	return (
		<div className="App">
			<div>
				{locations.map((loc, index) => (
					<div key={index}>
						<h4>{loc.locationId}</h4>
						<p>{loc.locationName}</p>
					</div>
				))}
			</div>
			{loading && !error && <p>Loading...</p>}
			{error && typeof error.message === "string" ? (
				<p>{error.message}</p>
			) : (
				<p>You've seen them all!</p>
			)}
			<div ref={loader} />
		</div>
	);
}

export default App;
