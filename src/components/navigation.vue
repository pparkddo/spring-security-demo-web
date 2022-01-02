<template>
  <div id="nav">
    <span><router-link to="/">Home</router-link></span>
    <span> | <router-link to="/member">Member</router-link> </span>
    <span v-if="this.isAdmin">
      | <router-link to="/admin">Admin</router-link>
    </span>
  </div>
</template>

<script>
export default {
  name: "navigation",
  computed: {
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
  },
};
</script>
