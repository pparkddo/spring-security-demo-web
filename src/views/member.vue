<template>
  <div>
    <h2>Hello {{ nickname }}</h2>
    <button @click="grantAdmin">Make me admin!</button>
  </div>
</template>

<script>
import { fetchWrapper } from "@/helpers/fetch-wrapper";

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
      fetchWrapper
        .post("/member/authority/admin")
        .then(() => alert("updated!"));
    },
  },
};
</script>
