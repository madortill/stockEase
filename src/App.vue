<template>
  <div id="App">
    <Loader v-if="showLoader"></Loader>
    <div v-if="showLogin">
      <AboutPage></AboutPage>
      <LoginScreen @user-logged-in="setUserPage"  @logout="backToLogin"></LoginScreen>
    </div>
    <HomePage
      v-if="showPage"
      :user-type="userType"
      :user-data="userData"
      @logout="backToLogin"
    ></HomePage>
    <div v-if="showLogout" class="logout-div">
      <div class="donut"></div>
      <p v-if = "pDount">מבצע התנתקות</p>
      <p v-else>חזרה לדף התחברות</p>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/Loader.vue";
import LoginScreen from "./components/LoginScreen.vue";
import AboutPage from "./components/AboutPage.vue";
import HomePage from "./components/HomePage.vue";

export default {
  name: "App",
  components: {
    LoginScreen,
    AboutPage,
    Loader,
    HomePage,
  },
  data() {
    return {
      showLoader: true,
      showLogin: false,
      showPage: false,
      showLogout: false,
      userType: null,
      userData: {},
      pDount: null,
    };
  },
  methods: {
    setUserPage(data) {
      console.log(data);
      this.userData = data;
      this.userType = data.userType;
      this.showLogin = false;
      this.showPage = true;
    },

    backToLogin(page) {
      let currentPage = page;
      if(currentPage === 'homePage'){
        this.pDount = true;
      } else {
        this.pDount = false;
      }
      this.showPage = false;
      setTimeout(() => {
        this.showLogin = true;
        this.showLogout = false;
      }, 2000);
      this.showLogin = false;
      this.showLogout = true;
    },
  },
  mounted() {
    setTimeout(() => {
      this.showLoader = false;
      this.showLogin = true;
    }, 4000);
  },
};
</script>

<style>
/* @font-face {
  font-family: "Heebo";
  src: url("@/assets/fonts/heebo.regular.ttf");
}

@font-face {
  font-family: "Heebo-Bold";
  src: url("@/assets/fonts/heebo.black.ttf");
} */

* {
  overflow: hidden;
  font-family: "Assistant";
}
body {
  margin: 0;
  direction: rtl;
}
html {
  margin: 0;
}
#app {
  width: 100vw;
  height: 100vh;
  background-color: #f9dc5c;
  display: flex;
  align-items: center;
  justify-content: center;
}
.logout-div {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  flex-direction: column;
}
.donut {
  width: 4rem;
  height: 4rem;
  margin: 2rem;
  border-radius: 50%;
  border: 0.5rem solid #ffffff83;
  border-top-color: #828282db;
  animation: 1.5s spin infinite linear;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>
