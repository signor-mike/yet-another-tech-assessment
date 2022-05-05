/* eslint-disable no-unused-vars */
import TestComponent from "../components/TestComponent.vue";

export default {
	title: "testComponent",
	component: TestComponent,
};

const Template = (args, { argTypes }) => ({
	components: { TestComponent },
	props: Object.keys(argTypes),

	template: `
      <TestComponent v-bind="$props"/>
    `,
});

export const testComponent = Template.bind({});
testComponent.args = {
	testString: "foobar",
};
