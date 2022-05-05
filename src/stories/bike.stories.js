import BikeCard from "../components/Bike.vue";
import { storyFactory } from "../../config/storybook/util/helpers.js";
import bikes from "../mock/bikes.js";

export default storyFactory({
	title: "Bike component",
	component: BikeCard,
});

const Template = (args, { argTypes }) => ({
	components: { BikeCard },
	props: Object.keys(argTypes),

	template: `
      <BikeCard v-bind="$props"/>
    `,
});

export const bikeCard = Template.bind({});
bikeCard.args = {
	bike: bikes[0],
};
