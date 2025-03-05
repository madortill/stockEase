<template>
  <div id="login-screen">
    <div v-if="currentView === 'login'" class="home-container">
      <h1>ניהול מחסן</h1>
      <p>מסך התחברות</p>
      <button class="admin-button" @click="setView('admin')">כניסת מנהל</button>
      <button class="guest-button" @click="setView('guest')">כניסת אורח</button>
    </div>
    <AdminIn
      v-if="currentView === 'admin'"
      @go-back="setView('login')"
      @login-success="handleLoginSuccess"
    ></AdminIn>
    <GuestIn
      v-if="currentView === 'guest'"
      @go-back="setView('login')"
      @login-success="handleLoginSuccess"
    ></GuestIn>
    <div v-if="currentView !== 'login'">
      <img
        src="@/assets/media/icons/undo.svg"
        alt="חזור"
        class="back-button"
        @click= "backToLogin"
      />
    </div>
  </div>
</template>

<script>
import AdminIn from "@/components/AdminIn.vue";
import GuestIn from "@/components/GuestIn.vue";

export default {
  name: "login-screen",
  components: {
    AdminIn,
    GuestIn,
  },
  data() {
    return {
      currentView: "login",
      currentPage: 'loginScreen',
    };
  },
  methods: {
    setView(view) {
      this.currentView = view;
    },

    handleLoginSuccess(data) {
      this.$emit("user-logged-in", data);
    },

    backToLogin() {
      this.$emit("logout", this.currentPage);
    },
  },
};
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

h1 {
  font-size: 2.5rem;
}

p {
  font-size: 1.5rem;
  margin-top: 10px;
}

.admin-button,
.guest-button {
  margin-top: 20px;
  padding: 10px 50px;
  font-size: 1rem;
  background-color: #023047;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.back-button {
  width: 12%;
  position: fixed;
  bottom: 20px;
  left: 20px;
  cursor: pointer;
}

/* .admin-button:hover, .guest-button:hover {
  background-color: rgb(56, 56, 56);
} */
</style>
