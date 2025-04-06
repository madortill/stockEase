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
      titleArray: ["מפתחת ראשית", "מומחה תוכן", "רמ\"ד טי\"ל", "שנת פיתוח"],
      namesArray: [["רב\"ט אדוה אבא"], ["רס\"ם שלומי אוגרן"], ["רס\"ם עדן בן חמו"], ["מרץ 2025"]],
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
  top: 1rem;
  right: 1rem;
  width: 3rem;
  height: 3rem;
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
    width: 3rem;
    height: 3rem;
    font-size: 1.5rem;
    right: 1rem;
  }
}

/* גודל קטן לניידים */
@media (max-width: 480px) {
  .button-about {
    width: 2rem;
    height: 2.2rem;
    font-size: 1.4rem;
    right: 1rem;
  }
}

.about-div {
  background-color: white;
  /* height: 60%; */
  width: 18rem;
  position: fixed;
  top:50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  padding: 2rem;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  z-index: 1000;
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: #000000;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.5rem;
  background-color: white;
}

.till-logo {
  width: 6rem;
}
</style>
