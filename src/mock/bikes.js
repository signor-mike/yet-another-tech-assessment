export default [
	{
		id: "foo",
		isFavorite: false,
		isNew: false,
		images: [
			"https://picsum.photos/343/178?random=1",
			"https://picsum.photos/343/178?random=2",
			"https://picsum.photos/343/178?random=3",
		],
		collection: {
			name: "cannondale",
			year: "2019",
		},
		rating: {
			stars: 4,
			count: 8560,
		},
		name: "adventure neo 1 eq",
		description:
			"Una bici elettrica ideale per andare al lavoro o per godersi le caratteristiche stradine di campagna",
		type: {
			value: "e-bike",
			wtf: "corsa",
		},
		sizes: ["s", "m", "l", "xl"],
		colors: ["red", "blue", "green", "yellow"],
		price: {
			newPrice: 3299.0,
			oldPrice: 3299.0,
		},
	},
	{
		id: "bar",
		isFavorite: false,
		isNew: true,
		images: [
			"https://picsum.photos/343/178?random=4",
			"https://picsum.photos/343/178?random=5",
			"https://picsum.photos/343/178?random=6",
		],
		collection: {
			name: "cannondale",
			year: "2019",
		},
		rating: {
			stars: 5,
			count: 100000,
		},
		name: "adventure neo 2 eq",
		description:
			"Una bici elettrica perfetta per la città, le piste ciclabili ed i sentieri di campagna.",
		type: {
			value: "e-bike",
			wtf: "corsa",
		},
		sizes: ["s", "m", "l", "xl"],
		colors: ["red", "blue", "green", "yellow"],
		price: {
			newPrice: 3299.0,
			oldPrice: 3299.0,
		},
	},
];
