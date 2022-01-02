<template>
  <div>
    <img id="thumbnail" :src="myDetail?.imageUrl" alt="thumbnail" />
    <h2 id="nickname">{{ myDetail?.nickname }}</h2>
    <p class="additional-information">{{ myDetail?.email }}</p>
    <p
      class="additional-information authority"
      v-for="(authority, index) in myDetail?.authorities"
      :key="index"
    >
      {{ formatAuthority(authority.roleName) }}
    </p>
  </div>
</template>

<script>
import { fetchWrapper } from "@/helpers/fetch-wrapper";

export default {
  name: "admin",
  data() {
    return {
      myDetail: null,
    };
  },
  created() {
    this.getMyDetail();
  },
  methods: {
    getMyDetail() {
      fetchWrapper
        .get("/admin")
        .then((response) => (this.myDetail = response.data));
    },
    formatAuthority(authority) {
      return `- ${authority}`;
    },
  },
};
</script>

<style scoped>
#thumbnail {
  margin-block-start: 0.67em;
  border-radius: 50%;
}
.additional-information {
  font-size: 14px;
}
.authority {
  margin: 0;
}
</style>
