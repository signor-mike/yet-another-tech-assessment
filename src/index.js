import server from "./server.js";

const port = 42069;
server.listen(port, () => {
	console.log("Server is running on port " + port);
});
