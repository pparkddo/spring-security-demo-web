<template>
  <div class="home">
    <p>{{ welcomeMessage }}</p>
  </div>
  <div>
    <router-link v-if="this.isAuthenticated" to="/logout">Logout</router-link>
    <router-link v-else to="/login">Login</router-link>
  </div>
</template>

<script>
import { fetchWrapper } from "@/helpers/fetch-wrapper";

export default {
  name: "home",
  data() {
    return {
      welcomeMessage: null,
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },
  created() {
    this.getWelcomeMessage();
  },
  methods: {
    getWelcomeMessage() {
      fetchWrapper
        .get("/home")
        .then((data) => (this.welcomeMessage = data.data));
    },
  },
};
</script>
