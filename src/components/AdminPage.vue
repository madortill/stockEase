<template>
  <div id="admin-page">
    <header class="header">
      <h2>ברוך הבא, {{ adminData.fullName }}!</h2>
    </header>

    <div class="button-container">
      <button class="button product-manage" @click="navigateTo('product-manage')">ניהול מלאי</button>
      <button class="button oreders" @click="navigateTo('oreders')">הזמנות</button>
      <button class="button" @click="navigateTo('permissions')">הרשאות</button>
    </div>

    <!-- ניווט לדפים -->
    <div v-if="activePage === 'product-manage'">
      <InventoryManagement /> <!-- דף ניהול מלאי -->
    </div>
    <div v-if="activePage === 'oreders'">
      <Oreders /> <!-- דף הזמנות -->
    </div>
    <div v-if="activePage === 'permissions'">
      <PermissionsPage /> <!-- דף הרשאות -->
    </div>
  </div>
</template>

<script>
import Oreders from "@/components/Orders.vue";
import InventoryManagement from "@/components/InventoryManagement.vue";
import PermissionsPage from "@/components/PermissionsPage.vue";

export default {
  name: "AdminPage",
  components: {
    Oreders,
    InventoryManagement,
    PermissionsPage
  },
  props: {
    adminData: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  data() {
    return {
      activePage: "product-manage", // הדף הראשוני שמוצג
    };
  },
  methods: {
    navigateTo(page) {
      console.log(`מעבר אל ${page}`);
      this.activePage = page; // שינוי של activePage כדי לעבור לדף המתאים
    },
  },
};
</script>

<style scoped>
#admin-page {
  text-align: center;
  background-color: #023047;
  color: rgb(10, 9, 9);
  padding: 20px;
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
