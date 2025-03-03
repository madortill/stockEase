<template>
  <div id="App">
    <Loader v-if="showLoader"></Loader>
    <div v-if="showLogin">
      <AboutPage></AboutPage>
      <LoginScreen @user-logged-in="setUserPage"></LoginScreen>
    </div>
    <HomePage v-if="showPage" :user-type="userType" :user-data = "userData"></HomePage>
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
      userType: null,
      userData: {},
    };
  },
  methods: {
    setUserPage(data) {
      this.userData = data;
      this.userType = data.userType;
      console.log(
        "User Data in App.vue:",
        JSON.stringify(this.userData, null, 2)
      );
      console.log("User Type in App.vue:", this.userType);
      console.log(data);
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
