<template>
  <v-main>
    <v-container fluid>
      <h1>Hello {{ user.username }} and welcome!</h1>

      <v-btn @click="$router.go(-1)"
        >Go back now and register all over again!</v-btn
      >
    </v-container>
  </v-main>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.registredUsers[
        this.$store.state.registredUsers.length - 1
      ];
    },
  },
};
</script>

<style></style>
