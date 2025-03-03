<template>
  <div id="App">
    <Loader v-if="showLoader"></Loader>
    <div v-if="showLogin">
      <AboutPage></AboutPage>
      <LoginScreen @user-logged-in="setUserPage"></LoginScreen>
    </div>
    <HomePage v-if = "showPage" :userType="userType"></HomePage>
  </div>
</template>

<script>
import Loader from "@/components/Loader.vue";
import LoginScreen from "./components/LoginScreen.vue";
import AboutPage from "./components/AboutPage.vue";
import HomePage from "./components/HomePage.vue";
export default {
  name: "App",
  props: [""],
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
      userType: null,
    };
  },
  methods: {
    setUserPage(userType) {
      this.userType = userType; 
      this.showLogin = false; 
      this.showPage = true;
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
@font-face {
  font-family: "Heebo";
  src: url("@/assets/fonts/heebo.regular.ttf");
}

@font-face {
  font-family: "Heebo-Bold";
  src: url("@/assets/fonts/heebo.black.ttf");
}

* {
  overflow: hidden;
  font-family: "Heebo";
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
</style>
