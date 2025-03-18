<template>
  <div id="home-page">
    <img
      src="@/assets/media/icons/exit.svg"
      alt="התנתק"
      class="return-button"
      @click="showLogoutConfirm = true"
    />
    <div v-if="showLogoutConfirm" class="logout-confirm-overlay">
      <div class="logout-confirm-box">
        <p>האם אתה בטוח שברצונך להתנתק?</p>
        <div class="buttons">
          <button @click="confirmLogout">כן</button>
          <button @click="showLogoutConfirm = false">לא</button>
        </div>
      </div>
    </div>

    <AdminPage v-if="userType === 'admin'" :admin-data="userData"></AdminPage>
    <GuestPage
      v-else-if="userType === 'guest'"
      :guest-data="userData"
    ></GuestPage>
  </div>
</template>

<script>
import AdminPage from "@/components/AdminPage.vue";
import GuestPage from "@/components/GuestPage.vue";

export default {
  name: "home-page",
  props: {
    userType: String,
    userData: Object,
  },
  components: {
    AdminPage,
    GuestPage,
  },
  data() {
    return {
      currentView: "login",
      currentPage: "homePage",
      showLogoutConfirm: false,
    };
  },
  methods: {
    logout() {
      this.$emit("logout", this.currentPage);
    },
    confirmLogout() {
      this.showLogoutConfirm = false;
      this.logout();
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

.logout-confirm-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.logout-confirm-box {
  background-color: white;
  color: #023047;
  padding: 30px;
  /* border-radius: 12px; */
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 300px;
}

.logout-confirm-box p {
  margin-bottom: 20px;
  font-size: 18px;
}

.logout-confirm-box .buttons {
  display: flex;
  justify-content: space-evenly;

}

.logout-confirm-box button {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background-color: #ffb703;
  transition: background-color 0.3s;
  font-size: 16px;
}

.logout-confirm-box button:hover {
  background-color: #fb8500;
}

</style>
