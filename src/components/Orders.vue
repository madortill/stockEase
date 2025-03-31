<template>
  <div id="orders-page">
    <h3>הזמנות</h3>

    <table v-if="orders.length" class="orders-table">
      <thead>
        <tr>
          <th>מספר הזמנה</th>
          <th>מוצר</th>
          <th>כמות</th>
          <th>שם מלא</th>
          <!-- <th>מספר אישי</th> -->
          <th>טלפון</th>
          <th>תאריך</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order._id">
          <td>{{ order.orderId }}</td>
          <td>{{ order.product }}</td>
          <td>{{ order.quantity }}</td>
          <td>{{ order.fullName }}</td>

          <!-- <td>{{ order.personalNumber }}</td> -->
          <td data-label="טלפון">
            <span class="link-text" @click="copyToClipboard(order.phoneNumber)">
              {{ order.phoneNumber }}
            </span>
          </td>
          <td>{{ formatDate(order.createdAt) }}</td>
        </tr>
      </tbody>
    </table>

    <p v-else>לא קיימות הזמנות במערכת.</p>
  </div>
</template>

<script>
export default {
  name: "Orders",
  data() {
    return {
      orders: [],
    };
  },
  async mounted() {
    await this.fetchOrders();
  },
  methods: {
    async fetchOrders() {
      try {
        const res = await fetch("https://stockease-y1zr.onrender.com/api/orders");
        const data = await res.json();
        this.orders = data;
      } catch (err) {
        console.error("שגיאה בטעינת ההזמנות:", err);
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleString("he-IL", {
        dateStyle: "short",
        timeStyle: "short",
      });
    },
    copyToClipboard(text) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          alert(`📋 המספר ${text} הועתק ללוח`);
        })
        .catch(() => {
          alert("לא ניתן להעתיק את המספר כרגע");
        });
    },
  },
};
</script>

<style scoped>
#orders-page {
  height: 92vh;
  padding: 20px;
  text-align: center;
  /* background-color: #f8f9fa; */
}

h3 {
  color: #023047;
  margin-bottom: 20px;
}

.orders-table {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  border-collapse: collapse;
  background-color: #fff;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
}

.orders-table th,
.orders-table td {
  border: 1px solid #ccc;
  padding: 10px;
}

.orders-table th {
  background-color: #e0e0e0;
}

.link-text {
  color: #023047;
  cursor: pointer;
  font-weight: bold;
  transition: color 0.2s;
}

.link-text:hover {
  color: #03546e;
  text-decoration: underline;
}
</style>
