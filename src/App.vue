<template>
    <div class="App">
        <Loader v-if="showLoader"></Loader>
        <div v-else>
            <AboutPage></AboutPage>
            <LoginScreen></LoginScreen>
        </div>
    </div>
</template>

<script>
import Loader from './components/Loader.vue'
import LoginScreen from './components/LoginScreen.vue';
import AboutPage from './components/AboutPage.vue';

export default {
    name: "App",
    components: {
        LoginScreen,
        AboutPage,
        Loader
    },
    data() {
        return {
            showLoader: true
        };
    },
    mounted() {
        setTimeout(() => {
            this.showLoader = false;
        }, 6000); // משך זמן הצגת הלואדר (6 שניות)
    }
};
</script>

<style >
@font-face {
    font-family: 'Heebo';
    src: url('@/assets/fonts/heebo.regular.ttf');
}

@font-face {
    font-family: 'Heebo-Bold';
    src: url('@/assets/fonts/heebo.black.ttf');
}

* {
    overflow: hidden;
    font-family: 'Heebo';
}
body {
    margin: 0;
    direction: rtl;
}
html {
    margin: 0 ;
}
#app {
  width: 100vw;
  height: 100vh;
  background-color: #F9DC5C;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
