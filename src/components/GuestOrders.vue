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
      <li
        v-for="order in filteredAndSearchedOrders"
        :key="order._id"
        :class="['order-item', order.status]"
      >
        <p><strong>מוצר:</strong> {{ order.product }}</p>
        <p><strong>כמות:</strong> {{ order.quantity }} יח'</p>
        <p><strong>סטטוס:</strong> {{ translateStatus(order.status) }}</p>
        <p><strong>תאריך:</strong> {{ formatDate(order.createdAt) }}</p>
        <p><strong>מספר הזמנה:</strong> {{ order.orderId }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "GuestOrders",
  props: {
    guestPersonalNumber: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      currentFilter: "all",
      searchQuery: "",
      orders: [],
      filterOptions: [
        { label: "כל ההזמנות", value: "all" },
        { label: "נשלחו", value: "sent" },
        { label: "אושרו", value: "approved" },
        { label: "נדחו", value: "rejected" },
      ],
    };
  },
  async mounted() {
    await this.fetchOrders();
  },
  computed: {
    filteredAndSearchedOrders() {
      let orders =
        this.currentFilter === "all"
          ? this.orders
          : this.orders.filter((order) => order.status === this.currentFilter);

      if (this.searchQuery.trim()) {
        const query = this.searchQuery.toLowerCase();
        orders = orders.filter((order) =>
          order.name.toLowerCase().includes(query)
        );
      }

      return orders;
    },
  },

  methods: {
  async fetchOrders() {
    try {
      const res = await fetch("https://stockease-y1zr.onrender.com/api/orders");
      const data = await res.json();
      this.orders = data.filter(
        (order) => order.personalNumber === this.guestPersonalNumber
      );
    } catch (err) {
      console.error("שגיאה בטעינת ההזמנות:", err);
    }
  },
  translateStatus(status) {
    switch (status) {
      case "approved":
        return "אושרה";
      case "sent":
        return "נשלחה";
      case "rejected":
        return "נדחתה";
      default:
        return "לא ידוע";
    }
  },
  formatDate(date) {
    return new Date(date).toLocaleString("he-IL", {
      dateStyle: "short",
      timeStyle: "short",
    });
  },
}

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
