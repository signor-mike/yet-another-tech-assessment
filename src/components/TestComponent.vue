<template>
	<div>
		<p>{{ testString }}</p>
		<p>{{ $t("message") }}</p>
		<p>{{ $t("scopri") }}</p>
	</div>
</template>

<script>
	export default {
		name: "HelloI18n",
		props: {
			testString: {
				type: String,
				required: true,
			},
		},
	};
</script>
