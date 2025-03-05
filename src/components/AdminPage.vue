<template>
  <div id="admin-page">
    <header class = "header">
      <h2>ברוך הבא, {{ adminData.fullName }}!</h2>
    </header>
    
    <div class="button-container">
      <button @click="navigateTo('inventory')" class = "button product-manage">ניהול מלאי</button>
      <button @click="navigateTo('orders')" class=" button oreders">הזמנות</button>
      <button @click="navigateTo('more-actions')" class= "button">פעולות נוספות</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminPage",
  props: {
    adminData: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  methods: {
    navigateTo(page) {
      console.log(`מעבר אל ${page}`);
    },
  },
};
</script>

<style scoped>
#admin-page {
  /* text-align: center;
  background-color: #023047;
  color: white;
  padding: 20px; */
}

.header {
 text-align: center;
  background-color: #023047;
  color: white;
  width: 100vw;
  /* padding: 20px; */
}
.button-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

button {
  background-color: #ffb703;
  color: black;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #fb8500;
}
</style>
