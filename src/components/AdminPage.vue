<template>
  <div id="admin-page">
    <header class="header">
      <h2 class="welcome-admin">ברוך הבא, {{ adminData.fullName }}!</h2>
    </header>

    <div v-if="activePage === null" class="button-container">
      <button class="button-admin product-manage" @click="navigateTo('product-manage')">ניהול מלאי</button>
      <button class="button-admin orders" @click="navigateTo('orders')">הזמנות</button>
      <button class="button-admin category" @click="navigateTo('category')">קטגוריות</button>
      <button class="button-admin none" @click="navigateTo('permissions')">הרשאות</button>
    </div>

    <!-- ניווט לדפים -->
    <div v-if="activePage === 'product-manage'">
      <InventoryManagement />
    </div>
    <div v-if="activePage === 'orders'">
      <Orders />
    </div>
    <div v-if="activePage === 'category'">
      <Categories />
    </div>
    <div v-if="activePage === 'permissions'">
      <PermissionsPage />
    </div>

    <img v-if="activePage != null"
      src="@/assets/media/icons/home.svg"
      alt="בית"
      class="back-home-button"
      @click="toggleAbout"
    />
  </div>
</template>

<script>
import Orders from "@/components/Orders.vue";
import InventoryManagement from "@/components/InventoryManagement.vue";
import PermissionsPage from "@/components/PermissionsPage.vue";
import Categories from "@/components/Categories.vue";

export default {
  name: "AdminPage",
  components: {
    Orders,
    InventoryManagement,
    PermissionsPage,
    Categories,
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
      activePage: null,
    };
  },
  methods: {
    navigateTo(page) {
      this.activePage = page;
    },
    toggleAbout() {
      this.activePage = null;
    },
  },
};
</script>

<style scoped>
#admin-page {
  text-align: center;
  color: #023047;
  height: 100vh;
}

.header {
  text-align: right;
  background-color: #023047;
  color: white;
  width: 100vw;
  padding: 15px;
}

.button-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 30px;
  align-items: center;
}

.button-admin {
  background-color: #004e75;
  color: white;
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

.none {
  background-color: rgb(177, 177, 177);
  pointer-events: none;
  opacity: 0.6;
  cursor: not-allowed;
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
  font-size: 1.8rem;
}
</style>
