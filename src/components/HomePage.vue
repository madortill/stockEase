<template>
  <div id="home-page">
    <AdminPage v-if="userType === 'admin'"></AdminPage>
    <GusetPage v-else-if="userType === 'guest'"></GusetPage>
  </div>
</template>

<script>
import AdminPage from "@/components/AdminPage.vue";
import GusetPage from "@/components/GusetPage.vue";

export default {
  name: "home-page",
  props: {
    userType: String 
  },
  components: {
    AdminPage,
    GusetPage,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped></style>
