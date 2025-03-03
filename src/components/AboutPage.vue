<template>
  <div id="about-page">
    <button class="button-about" @click="toggleAbout" :disabled="isDisables">
      i
    </button>
    <div v-if="showAbout" class="about-div">
      <h1>אודות</h1>
      <div v-for="(title, index) in titleArray" :key="'title-' + index">
        <h3>{{ title }}</h3>
        <p v-for="(name, idx) in namesArray[index]" :key="'name-' + idx">
          {{ name }}
        </p>
      </div>
      <button class="close-button" @click="toggleAbout">X</button>
      <img src="/src/assets/media/icons/TillLogo.svg" alt = "till-logo" class="till-logo">
    </div>
  </div>
</template>

<script>
export default {
  name: "about-page",
  components: {},
  data() {
    return {
      showAbout: false,
      isDisables: false,
      titleArray: ["מפתחת ראשית", "מומחה תוכן", "רמד טיל"],
      namesArray: [["רבט אדוה אבא"], ["רסם שלומי אוגרן"], ["רסם עדן בן חמו"]],
    };
  },
  methods: {
    toggleAbout() {
      if (!this.isDisables) {
        this.showAbout = !this.showAbout;
        this.isDisables = true;
      } else {
        this.isDisables = false;
        this.showAbout = !this.showAbout;
      }
    },
  },
};
</script>

<style scoped>
.button-about {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #003049;
  color: white;
  font-size: 1.6rem;
  font-weight: bold;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s, transform 0.2s, width 0.3s, height 0.3s;
}

/* גודל בינוני לטאבלטים */
@media (max-width: 768px) {
  .button-about {
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
    right: 15px;
  }
}

/* גודל קטן לניידים */
@media (max-width: 480px) {
  .button-about {
    width: 40px;
    height: 40px;
    font-size: 1.3rem;
    right: 10px;
  }
}

.about-div {
  background-color: white;
  height: 60%;
  width: 60%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  z-index: 1000;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #000000;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.5rem;
}

.till-logo {
  width: 6rem;
}
</style>
