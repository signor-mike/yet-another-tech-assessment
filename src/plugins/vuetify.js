import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

// THIS export is the important part!
export const options = {
	icons: {
		iconfont: "mdiSvg",
	},
	// ... the rest of the options ...
};

export default new Vuetify(options);
