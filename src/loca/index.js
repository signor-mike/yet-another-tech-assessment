/* eslint-disable import/no-anonymous-default-export */
export default function (page) {
	if (page <= 5) {
		const result = require(`./page-${page}.json`);
		return result.locations;
	} else {
		return [];
	}
}
