<template>
  <div id="home-page">
    <AdminPage v-if="userType === 'admin'" :admin-data = "userData"></AdminPage>
    <GuestPage v-else-if="userType === 'guest'" :guest-data = "userData"></GuestPage>
  </div>
</template>


<script>
import AdminPage from "@/components/AdminPage.vue";
import GuestPage from "@/components/GuestPage.vue";

export default {
  name: "home-page",
  props: {
    userType: String,
    userData: Object
  },
  components: {
    AdminPage,
    GuestPage,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped></style>
