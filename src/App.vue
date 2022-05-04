<i18n>
{
  "en": {
    "message": "Hi!"
  },
  "it": {
    "message": "Ciao!"
  }
}
</i18n>
<template>
	<v-app>
		<LanguageSwitcher />
		<h1>{{ $t("message") }}</h1>
		<v-main>
			<v-row stye="max-width: 100%" class="ma-2">
				<v-col
					cols="12"
					sm="6"
					md="3"
					v-for="bike in bikes"
					:key="bike.i"
				>
					<Bike :bike="bike" @setFavorite="setFavorite" />
				</v-col>
			</v-row>
		</v-main>
	</v-app>
</template>

<script>
	import Bike from "./components/Bike";
	import LanguageSwitcher from "./components/LanguageSwitcher.vue";
	import bikes from "./mock/bikes.js";

	export default {
		name: "App",

		components: {
			Bike,
			LanguageSwitcher,
		},

		data: () => ({
			bikes,
		}),

		methods: {
			setFavorite(bike) {
				alert(
					`mockup for functionality: set ${
						bike.name
					} as favorite.\nCurrently ${bike.name} is ${
						bike.isFavorite ? "favorite" : "not favorite"
					}`
				);
			},
		},
	};
</script>
