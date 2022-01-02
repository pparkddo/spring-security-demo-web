<template>
  <div>
    <h2>Hello {{ nickname }}</h2>
    <button @click="grantAdmin">Make me admin!</button>
  </div>
</template>

<script>
import { fetchWrapper } from "@/helpers/fetch-wrapper";
import { GRANT_ADMIN } from "@/store/action-types";

export default {
  name: "member",
  data() {
    return {
      nickname: null,
    };
  },
  created() {
    this.getNickname();
  },
  methods: {
    getNickname() {
      fetchWrapper.get("/member").then((data) => (this.nickname = data.data));
    },
    grantAdmin() {
      this.$store.dispatch(GRANT_ADMIN);
    },
  },
};
</script>
