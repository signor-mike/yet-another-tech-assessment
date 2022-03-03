export const catchAll = (err, req, res, next) => {
	res.status(418).send(
		"I can't brew coffee because I am a teapot and " + err.message ||
			"Some unhandled error :("
	);
};
