import bikes from "../mock/bikes.js";
import Bike from "../components/Bike.vue";

export default {
	title: "Bike Card",
};

// export const BikeCard = () => ({
// 	components: { Bike },
// 	render() {
// 		return <Bike v-bind:bike={bikes[0]} />;
// 	},
// });

export const BikeCard = () => ({
	components: { Bike },
	data() {
		return {
			bike: bikes[0],
		};
	},

	template: `
    <Bike v-bind:bike="bike" />
    `,
});
