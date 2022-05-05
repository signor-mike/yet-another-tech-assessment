<template>
	<div>
		<p>{{ testString }}</p>
		<!-- <p>{{ $t("message") }}</p> -->
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
