<template>
  <div id="admin-page">
    <header>
      <h1>ברוך הבא, {{ adminData.fullName }}!</h1>
      <button @click="logout">התנתק</button>
    </header>

    <section class="stats">
      <div class="stat-box">
        <h2>25</h2>
        <p>מוצרים במלאי</p>
      </div>
      <div class="stat-box">
        <h2>5</h2>
        <p>הזמנות חדשות</p>
      </div>
      <div class="stat-box">
        <h2>12</h2>
        <p>לקוחות פעילים</p>
      </div>
    </section>

    <section class="quick-actions">
      <h2>פעולות מהירות</h2>
      <button @click="navigateTo('inventory')">ניהול מלאי</button>
      <button @click="navigateTo('orders')">הזמנות</button>
      <button @click="navigateTo('customers')">לקוחות</button>
    </section>
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
    logout() {
      this.$emit("logout");
      console.log(this.adminData);
    },
    navigateTo(page) {
      console.log(`מעבר אל ${page}`);
    },
  },
};
</script>

<style scoped>
#admin-page {
  padding: 20px;
  text-align: center;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #023047;
  color: white;
  padding: 10px 20px;
  border-radius: 10px;
}

header button {
  background: #ff4d4d;
  color: white;
  border: none;
  padding: 8px 15px;
  cursor: pointer;
  border-radius: 5px;
}

.stats {
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
}

.stat-box {
  background: #f1f1f1;
  padding: 20px;
  border-radius: 10px;
  width: 120px;
  text-align: center;
}

.quick-actions {
  margin-top: 20px;
}

.quick-actions h2 {
  margin-bottom: 10px;
}

.quick-actions button {
  display: block;
  margin: 5px auto;
  padding: 10px 20px;
  background-color: #008cba;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
