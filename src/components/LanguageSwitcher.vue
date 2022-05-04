<template>
	<v-container>
		<v-btn
			v-for="locale in $i18n.availableLocales"
			:key="locale.i"
			color="primary"
			:outlined="$i18n.locale !== locale"
			@click="flipLocale(locale)"
		>
			{{ locale }}
		</v-btn>
	</v-container>
</template>

<script>
	export default {
		name: "LanguageSwitcher",

		computed: {},
		methods: {
			flipLocale(desiredLocale) {
				this.$i18n.locale = desiredLocale;
			},
		},
	};
</script>

<style></style>
