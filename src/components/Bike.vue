<i18n>
{
  "en": {
	"size": "sizes",
	"colors": "colors",
	"compare": "compare",
	"scopri": "see more",
	"used": "used",
	"new": "new"
  },
  "it": {
    "size": "taglia",
	"colors": "colori",
	"compare": "compara",
	"scopri": "scopri",
	"used": "usato",
	"new": "nuovo"
  }
}
</i18n>

<template>
	<v-container
		class="main-wrap my-3"
		style="height: 650px; max-height: content-fit"
		d-flex
		flex-column
		justify-space-between
		pa-0
	>
		<div
			class="card-header d-flex flex-row justify-space-between px-5 mb-6"
		>
			<div class="fav-icon">
				<v-icon
					large
					color="black"
					style="cursor: pointer"
					@click="$emit('setFavorite', bike)"
				>
					{{ bike.isFavorite ? "favorite" : "favorite_border" }}
				</v-icon>
			</div>
			<div
				class="new-used-banner d-flex flex-column-reverse"
				:class="bike.isNew ? 'banner-new' : 'banner-used'"
			>
				<p class="mb-0">{{ bike.isNew ? $t("new") : $t("used") }}</p>
			</div>
		</div>

		<div class="carousel" style="position: relative">
			<v-img
				contain
				:src="bike.images[currentIndex]"
				:alt="
					'the photo of ' +
					bike.name +
					' which is ' +
					bike.description
				"
			></v-img>
			<div class="delimiters">
				<v-btn @click="prevImage" text>
					<v-icon large color="white">keyboard_arrow_left</v-icon>
				</v-btn>
				<v-btn @click="nextImage" text>
					<v-icon large color="white">keyboard_arrow_right</v-icon>
				</v-btn>
			</div>
			<div :id="bike.id" class="progress-bar d-flex mt-2"></div>
		</div>

		<div class="card-body mt-2 mx-2">
			<v-row no-gutters justify="space-between">
				<!-- year and rating -->
				<v-col cols="12" class="d-flex justify-space-between">
					<span
						style="
							font-weight: 700;
							font-size: 12px;
							line-height: 17px;
						"
					>
						{{
							bike.collection.name + " | " + bike.collection.year
						}}
					</span>

					<div class="d-flex">
						<span v-for="(n, i) in 5" :key="n.i">
							<v-icon
								style="line-height: 17px"
								small
								:color="
									i === bike.rating.stars
										? 'grey lighten-2'
										: ''
								"
							>
								star
							</v-icon>
						</span>
						<span
							class="font-italic text-uppercase"
							style="
								font-weight: 700;
								font-size: 12px;
								line-height: 25px;
								letter-spacing: 0.01em;
							"
							>{{ ratingCounter }}</span
						>
					</div>
				</v-col>

				<!-- name and description -->
				<v-col cols="12">
					<p
						class="font-italic text-uppercase"
						style="
							font-weight: 700;
							font-size: 24px;
							line-height: 128%;
						"
					>
						{{ bike.name }}
					</p>
					<p
						class="font-italic"
						style="
							font-weight: 400;
							font-size: 12px;
							line-height: 140%;
						"
					>
						{{ bike.description[$i18n.locale] }}
					</p>
				</v-col>

				<!-- badge, sizes, colors -->
				<v-col cols="12">
					<div class="badge">
						<span
							style="
								color: #e2e2e2;
								font-weight: 700;
								font-size: 12px;
								line-height: 14px;
								letter-spacing: 0.01em;
							"
							class="font-italic text-uppercase"
						>
							{{ bike.type.value }}
						</span>
						<span
							style="
								color: #ffffff;
								font-weight: 700;
								font-size: 12px;
								line-height: 14px;
							"
							class="font-italic text-uppercase"
							>{{ bike.type.wtf }}</span
						>
					</div>

					<div class="light-badge">
						<span style="color: #a1a1a1">{{ $t("size") }}</span>
						<span
							v-for="size in bike.sizes"
							:key="size.i"
							style="color: #646464"
						>
							{{ size }}
						</span>
					</div>

					<div class="light-badge">
						<span style="color: #a1a1a1">{{ $t("colors") }}</span>
						<span style="color: #646464">
							+ {{ bike.colors.length }}
						</span>
					</div>

					<div class="prices mt-4 d-flex">
						<span
							style="
								font-style: normal;
								font-weight: 600;
								font-size: 20px;
								line-height: 165%;
								margin-right: 10px;
							"
							>€{{ priceStripper(bike.price.newPrice) }}</span
						>
						<span
							style="
								font-style: normal;
								font-weight: 400;
								font-size: 14px;
								line-height: 165%;
								display: flex;
								align-items: center;
								text-decoration-line: line-through;
							"
							>€{{ priceStripper(bike.price.oldPrice) }}</span
						>
					</div>
				</v-col>
			</v-row>
		</div>

		<!-- compara and scopri -->
		<div class="card-footer d-flex justify-space-between">
			<div class="d-flex">
				<v-simple-checkbox
					:ripple="false"
					v-model="isCompara"
					color="black"
					class="my-auto"
				></v-simple-checkbox>
				<span
					class="my-auto"
					style="
						font-weight: 700;
						font-size: 14px;
						line-height: 165%;
						text-transform: uppercase;
						color: #515151;
					"
					>{{ $t("compare") }}</span
				>
			</div>
			<v-btn
				color="black"
				class="white--text mt-auto"
				target="_blank"
				href="https://www.google.com/search?q=kittens&newwindow=1&client=ubuntu&hs=tK6&channel=fs&sxsrf=ALiCzsZmEt-TShrCUKMDiEytpcA91ueOrQ:1651622334457&source=lnms&tbm=isch&sa=X&ved=2ahUKEwi2k7HUxMT3AhVOh_0HHcpZCmMQ_AUoAXoECAEQAw&biw=1920&bih=939&dpr=1"
				>{{ $t("scopri") }}
				<v-icon>arrow_forward</v-icon>
			</v-btn>
		</div>
	</v-container>
</template>

<script>
	export default {
		name: "BikeCard",
		props: {
			bike: {
				type: Object,
				default: () => ({
					isFavorite: false,
					isNew: false,
					images: [
						"https://picsum.photos/800/600?random=1",
						"https://picsum.photos/800/600?random=2",
						"https://picsum.photos/800/600?random=3",
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
						newPrice: 3299,
						oldPrice: 3299,
					},
				}),
			},
		},

		mounted() {
			let progressBar = document.querySelector(`#${this.bike.id}`);
			for (let i = 0; i < this.bike.images.length; i++) {
				let singleBar = document.createElement("div");
				singleBar.classList.add(`single-bar-${this.bike.id}`);
				singleBar.style.width = 100 / this.bike.images.length + "%";
				singleBar.style.height = "4px";
				singleBar.style.backgroundColor = this.inactiveColor;
				progressBar.appendChild(singleBar);
				if (i === 0) singleBar.style.backgroundColor = this.activeColor;
			}
		},

		updated() {
			document
				.querySelectorAll(`.single-bar-${this.bike.id}`)
				.forEach((bar, i) => {
					bar.style.backgroundColor = this.inactiveColor;
					if (i === this.currentIndex) {
						bar.style.backgroundColor = this.activeColor;
					}
				});
		},

		methods: {
			prevImage() {
				if (this.currentIndex <= 0)
					this.currentIndex = this.bike.images.length - 1;
				else this.currentIndex--;
			},
			nextImage() {
				if (this.currentIndex >= this.bike.images.length - 1)
					this.currentIndex = 0;
				else this.currentIndex++;
			},

			priceStripper(price) {
				let result = String(price).split(".")[0];
				if (result.split(".")[0].length >= 4)
					result =
						result.slice(0, result.length - 3) +
						"." +
						result.slice(result.length - 3);
				let decimals = String(price).split(".")[1]
					? String(price).split(".")[1]
					: "00";

				return result + "," + decimals;
			},
		},

		data() {
			return {
				activeColor: "rgba(161, 161, 161, 1)",
				inactiveColor: "rgba(240, 240, 240, 1)",
				currentIndex: 0,
				isCompara: false,
			};
		},

		computed: {
			ratingCounter() {
				let result = String(this.bike.rating.count);
				if (result.length >= 4)
					result =
						result.slice(0, result.length - 3) +
						"." +
						result.slice(result.length - 3);

				return result;
			},
		},
	};
</script>

<style scoped>
	@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
	.default-row-width {
		max-width: 100%;
	}

	.main-wrap {
		/* Base/White */
		background: #ffffff;
		/* Shadow/Small */
		box-shadow: 0px 7px 30px rgba(106, 106, 155, 0.1);
	}

	.new-used-banner {
		text-transform: uppercase;
		font-style: italic;
		font-size: 12px;
		letter-spacing: 0.01em;
		font-weight: 700;
	}

	.banner-used {
		background: linear-gradient(
			200.13deg,
			#ffb000 72.01%,
			rgba(255, 198, 38, 0) 72.37%
		);
	}
	.banner-new {
		background: linear-gradient(
			200.13deg,
			#abaecc 72.01%,
			rgba(255, 198, 38, 0) 72.37%
		);
	}

	.delimiters {
		position: absolute;
		z-index: 10;
		bottom: 19px;
		width: 100%;
		justify-content: center;
		display: flex;
		bottom: 20px;
	}

	.badge {
		background: #646464;
		margin: 16px 0;
	}

	.light-badge {
		background: #f6f6f6;
		font-style: italic;
		font-weight: 700;
		font-size: 12px;
		line-height: 14px;
		letter-spacing: 0.01em;
		text-transform: uppercase;
		margin: 2px 0;
	}

	.badge,
	.light-badge {
		width: fit-content;
		padding: 4px 8px;
	}
</style>
