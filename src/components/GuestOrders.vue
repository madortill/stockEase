<template>
  <div class="form-section">
    <h3>היסטוריית הזמנות</h3>

    <div class="filters">
      <button
        v-for="option in filterOptions"
        :key="option.value"
        :class="{ active: currentFilter === option.value }"
        @click="currentFilter = option.value"
      >
        {{ option.label }}
      </button>
    </div>

    <input
      type="text"
      v-model="searchQuery"
      placeholder="חיפוש הזמנה..."
      class="search-input"
    />

    <ul>
      <li v-for="order in filteredAndSearchedOrders" :key="order.id">
        {{ order.name }} - {{ order.quantity }} יח'
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "GuestOrders",
  data() {
    return {
      currentFilter: "all",
      searchQuery: "",
      orders: [
        { id: 1, name: "שולחן עבודה", quantity: 1, status: "approved" },
        { id: 2, name: "כיסא משרדי", quantity: 2, status: "sent" },
        { id: 3, name: "מדף קיר", quantity: 1, status: "rejected" },
        { id: 4, name: "שולחן קפה", quantity: 1, status: "approved" },
      ],
      filterOptions: [
        { label: "כל ההזמנות", value: "all" },
        { label: "נשלחו", value: "sent" },
        { label: "אושרו", value: "approved" },
        { label: "נדחו", value: "rejected" },
      ],
    };
  },
  computed: {
    filteredAndSearchedOrders() {
      let orders = this.currentFilter === "all"
        ? this.orders
        : this.orders.filter(order => order.status === this.currentFilter);

      if (this.searchQuery.trim()) {
        const query = this.searchQuery.toLowerCase();
        orders = orders.filter(order => order.name.toLowerCase().includes(query));
      }

      return orders;
    },
  },
};
</script>

<style scoped>
.form-section {
  margin-top: 20px;
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  text-align: right;
}

.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.filters button {
  background-color: #e0e0e0;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
}

.filters button.active {
  background-color: #c0c0c0;
  font-weight: bold;
}

.search-input {
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border-radius: 6px;
  border: 1px solid #ccc;
  text-align: right;
  font-family: inherit;
}
</style>
