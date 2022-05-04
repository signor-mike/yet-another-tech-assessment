<template>
  <v-container my-auto :class="{ bg: $vuetify.breakpoint.smAndDown }">
    <v-alert v-if="form.isError" type="error" class="error">
      {{ errorText }}
      <v-icon large class="ml-auto" right @click="form.isError = false">
        close
      </v-icon>
    </v-alert>
    <v-row justify="center" class="my-auto">
      <v-col cols="12" sm="12" md="4" offset-md="1" align-self="center">
        <v-img src="/logo.png" class="mx-auto" width="150"></v-img>
        <h1 class="text-center">Ahoy, Arianna 👋</h1>
        <p class="text-center text--secondary font-weight-regular">
          To continue with your creator’s profile please provide some additional
          information below. All fields are mandatory ;)
        </p>
        <v-form v-model="valid" @submit.prevent="handleSubmit()" validation>
          <p :class="subheader">link to one of your current profiles</p>
          <v-text-field
            required
            :rules="[form.rules]"
            placeholder="Instagram, TikTok, YouTube, or other..."
            outlined
            v-model="form.socialMedia"
          ></v-text-field>
          <p :class="subheader">choose your username</p>
          <v-text-field
            autocomplete="off"
            required
            :rules="[form.rules]"
            placeholder="username"
            v-model="form.username"
            @input="() => checkUsername(form.username)"
            outlined
            prefix="unagi.media/"
          >
            <template v-slot:append>
              <v-icon :color="color">
                {{ icon }}
              </v-icon>
            </template>
          </v-text-field>
          <p
            class="font-weigth-thin text--disabled"
            :class="{ 'red--text': !form.isUserValid }"
          >
            At least 3 symbols. Please use only lower case latin letters,
            numbers, dash(-), hyphen(_), or dot(.)
          </p>
          <p :class="subheader">country of residence</p>
          <v-autocomplete
            :rules="[form.rules]"
            required
            outlined
            clearable
            placeholder="Start typing..."
            v-model="form.country"
            :items="countries"
          ></v-autocomplete>
          <p :class="subheader">your interests (pick 1-3)</p>
          <v-chip-group
            :rules="[form.rules]"
            required
            multiple
            v-model="form.interests"
            column
            max="3"
            active-class="white--text"
          >
            <v-chip
              pill
              label
              x-large
              v-for="chip in chips"
              :key="chip.i"
              :value="chip"
            >
              {{ chip }}
            </v-chip>
          </v-chip-group>
          <v-card
            class="mb-3"
            outlined
            color="#00000000"
            style="border: thin solid #d3d3d3; border-radius: 10px"
          >
            <p class="font-weight-black mx-1 mt-2">
              👉 By applying as a creator you agree to Unagi Media Creators
              <span class="text-decoration-underline purple--text">
                Terms Of Service
              </span>
            </p>
            <p class="text--secondary mx-1">
              We encourage you to read it carefully. It describes our content
              and payment policies as well as other important issues. There is a
              short version included as well.
            </p>
          </v-card>
          <v-btn color="primary" type="submit" block>apply as a creator</v-btn>
        </v-form>
      </v-col>
      <v-col
        cols="6"
        offset="1"
        align-self="center"
        v-if="$vuetify.breakpoint.mdAndUp"
      >
        <v-img class="align-self-stretch" src="/flamingo.png"></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      form: {
        socialMedia: "",
        username: "",
        country: "",
        interests: [],
        pattern: /^[(a-z0-9)_\-.]+$/,
        rules: (v) => !!v || "Field is required",
        isError: false,
        errorText: "",
      },
      valid: false,
      icon: "",
      color: "",
      countries: [],
    };
  },
  methods: {
    checkUsername(username) {
      this.form.username = this.form.username.toLowerCase();
      if (username.length >= 3 && this.form.pattern.test(username)) {
        this.registredUsers.find((user) => user.username === username)
          ? (this.icon = "warning") && (this.color = "yellow")
          : (this.icon = "check_circle") && (this.color = "green");
      } else {
        this.form.username.length === 0
          ? null
          : (this.icon = "error") && (this.color = "red");
      }
    },
    getCountries() {
      axios
        .get("https://restcountries.eu/rest/v2/all")
        .then((res) =>
          res.data.forEach((country) => this.countries.push(country.name))
        );
    },
    handleSubmit() {
      const data = {
        socialMedia: this.form.socialMedia,
        username: this.form.username,
        country: this.form.country,
        interests: this.form.interests,
      };
      switch (this.valid && this.icon) {
        case true && "check_circle":
          this.$store.commit("newUser", data);
          this.$router.push("/welcome");
          break;
        case (true || false) && "warning":
          this.form.isError = true;
          this.errorText = "This username is already taken";
          break;
        case (true || false) && "error":
          this.form.isError = true;
          this.errorText = `Incorrect username. 
            It has to be at least 3 symbols. 
            Please use only lower case latin letters, numbers, dash(-), hyphen(_), or dot(.)`;
          break;
        default:
          void 0;
      }
    },
  },
  mounted() {
    this.getCountries();
  },
  computed: {
    subheader() {
      return "text--secondary font-weight-medium text-uppercase mb-0";
    },
    registredUsers() {
      return this.$store.state.registredUsers;
    },
    chips() {
      return this.$store.state.chips;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Jost:wght@400;500&display=swap");
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
@font-face {
  font-family: "KyivType";
  font-style: normal;
  font-weight: 400;
  src: local("KyivType"),
    url("../assets/KyivType/Dmitry Rastvortsev - KyivType Sans Light.otf")
      format("truetype");
}
h1 {
  font-family: "KyivType";
}
p,
span {
  font-family: "Jost";
}
.v-chip {
  font-weight: bolder;
}
.theme--light.v-chip:not(.v-chip--active) {
  background: #ffffff61;
}
.theme--light.v-chip--active {
  background: #717171;
}
.bg {
  background-image: linear-gradient(#e5e5e53b, #e5e5e53b),
    url("/flamingo-tile.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 10% 0%;
}
.v-messages,
.v-text-field__details {
  display: none !important;
}
.v-chip .v-chip__content {
  height: auto;
}
.v-chip.v-size--x-large {
  height: 30px !important;
}
.error {
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
