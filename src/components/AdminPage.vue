<template>
  <div id="admin-page">
    <header class="header">
      <h2 class = "welcome-admin">ברוך הבא, {{ adminData.fullName }}!</h2>
    </header>

    <div v-if = "activePage === null" class="button-container">
      <button class="button-admin product-manage" @click="navigateTo('product-manage')">ניהול מלאי</button>
      <button class="button-admin oreders" @click="navigateTo('oreders')">הזמנות</button>
      <button class="button-admin" @click="navigateTo('permissions')">הרשאות</button>
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
    <img  v-if ="activePage != null"
      src="@/assets/media/icons/home.svg"
      alt="בית"
      class="back-home-button"
      @click = "toggleAbout"
    />
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
      activePage: null, // הדף הראשוני שמוצג
    };
  },
  methods: {
    navigateTo(page) {
      this.activePage = page; // שינוי של activePage כדי לעבור לדף המתאים
    },
    toggleAbout() {
      this.activePage = null;
    }
  },
};
</script>

<style scoped>
#admin-page {
  text-align: center;
  color: white;
  height: 100vh;
  color: #023047;
}

.header {
  text-align: center;
  background-color: #023047;
  color: white;
  width: 100vw;
  text-align: right;
  /* padding: 20px; */
}
.button-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 30px;
  align-items: center;
}

.button-admin {
  background-color: #ffb703;
  color: black;
  border: none;
  padding: 15px 25px;
  cursor: pointer;
  font-size: 18px;
  border-radius: 12px;
  transition: background-color 0.3s, transform 0.2s, box-shadow 0.3s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 200px;
  text-align: center;
}

.button-admin:hover {
  background-color: #fb8500;
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}
.close-button {
  position: absolute;
  /* top: 10px; */
  right: 10px;
  color: #000000;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.5rem;
  background-color: #f1f1f1;
}

.back-home-button {
  width: 2rem;
  position: absolute;
  left: 1rem;
  bottom: 1rem;
  cursor: pointer;
}

.welcome-admin {
  margin-right: 5%;
}
</style>
