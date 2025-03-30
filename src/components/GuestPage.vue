<template>
  <div id="guest-page">
    <header>
      <h1>ברוך הבא! {{ guestData.fullName }}</h1>
      <div class="guest-data">
        <p>מספר אישי: {{ guestData.personalNumber }}</p>
      </div>
    </header>

    <section class="actions">
      <section class="actions">
        <button @click="toggleSection('orderRequest')">בקשת הזמנה</button>
        <button @click="toggleSection('orderHistory')">הזמנות</button>
      </section>
      <!-- <button @click="">בדיקת מלאי ציוד</button> -->
    </section>

    <OrderRequest
      v-if="activeSection === 'orderRequest'"
      :guestData="guestData"
      @order-submitted="toggleSection(null)"
    />

    <GuestOrders v-if="activeSection === 'orderHistory'" />
  </div>
</template>

<script>
import OrderRequest from "@/components/OrderRequest.vue";
import GuestOrders from "@/components/GuestOrders.vue";

export default {
  name: "GuestPage",
  props: {
    guestData: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  components: {
    OrderRequest,
    GuestOrders,
  },
  data() {
    return {
      activeSection: null,
    };
  },
  methods: {
    toggleSection(sectionName) {
      this.activeSection =
        this.activeSection === sectionName ? null : sectionName;
    },
  },
};
</script>

<style scoped>
#guest-page {
  /* padding: 20px; */
  text-align: center;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #023047;
  color: white;
  padding: 10px 20px;
  /* border-radius: 10px; */
}

header button {
  background: #023047;
  color: white;
  border: none;
  padding: 8px 15px;
  cursor: pointer;
  border-radius: 5px;
}

.search {
  margin: 20px 0;
}

.search input {
  width: 80%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.actions {
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  max-width: 300px;
}

.actions button {
  width: 100%;
  padding: 12px 20px;
  background-color: #023047;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: background-color 0.3s;
}

.actions button:hover {
  background-color: #03546e;
}

.form-section {
  margin-top: 20px;
  background-color: #f4f4f4;
  padding: 20px;
  /* border-radius: 10px; */
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  text-align: right;
}

.form-section label,
.form-section textarea,
.form-section select,
.form-section input {
  display: block;
  margin-bottom: 10px;
  width: 100%;
  padding: 8px;
}

.form-section button {
  background-color: #219ebc;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 6px;
  cursor: pointer;
}

.form-section button:hover {
  background-color: #126782;
}
</style>
