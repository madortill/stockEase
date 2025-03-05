<template>
  <div id="home-page">
    <img
      src="@/assets/media/icons/exit.svg"
      alt="התנתק"
      class="return-button"
      @click = "logout"
    />
    <AdminPage v-if="userType === 'admin'" :admin-data="userData"></AdminPage>
    <GuestPage v-else-if="userType === 'guest'" :guest-data="userData"></GuestPage>
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
    return {
      currentView: 'login',
    };
  },
  methods: {
    logout() {
      this.$emit("logout");
    },
  },
};
</script>

<style scoped>
#home-page {
  position: relative;
  min-height: 100vh;
}

.return-button {
  width: 1.5rem;
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  cursor: pointer;
}
</style>
