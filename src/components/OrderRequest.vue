<template>
  <div class="form-section">
    <h3>בקשת הזמנה</h3>
    <label>
      בחר מוצר:
      <select v-model="selectedProduct">
        <option
          v-for="product in products"
          :key="product._id"
          :value="product.name"
        >
          {{ product.name }}
        </option>
      </select>
    </label>

    <p v-if="selectedProductData">
      כמות נוכחית: {{ selectedProductData.quantity }} יחידות
    </p>

    <label>
      כמות:
      <input type="number" v-model.number="quantity" min="1" />
    </label>

    <button @click="submitOrder">שלח בקשה</button>
  </div>
</template>

<script>
export default {
  name: "OrderRequest",
  props: {
    guestData: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      selectedProduct: "",
      quantity: 1,
      products: [], // רשימת מוצרים מהמונגו
    };
  },
  mounted() {
    this.fetchProducts();
  },
  computed: {
    selectedProductData() {
      return this.products.find((p) => p.name === this.selectedProduct) || null;
    },
  },

  methods: {
    async fetchProducts() {
      try {
        const res = await fetch("https://stockease-y1zr.onrender.com/api/products");
        const data = await res.json();
        this.products = data;
      } catch (err) {
        console.error("שגיאה בטעינת המוצרים:", err);
      }
    },

    generateOrderId() {
      return Math.floor(100000 + Math.random() * 900000); // מספר בן 6 ספרות
    },

    async submitOrder() {
      if (!this.selectedProduct || this.quantity < 1) {
        alert("אנא מלאי את כל השדות כראוי.");
        return;
      }

      const productData = this.selectedProductData;
      if (this.quantity > productData.quantity) {
        alert(
          `אין מספיק מלאי. ניתן להזמין עד ${productData.quantity} יחידות מהמוצר "${productData.name}".`
        );
        return;
      }

      const orderId = this.generateOrderId();

      const orderData = {
        orderId,
        product: this.selectedProduct,
        quantity: this.quantity,
        fullName: this.guestData.fullName,
        personalNumber: this.guestData.personalNumber,
        phoneNumber: this.guestData.phoneNumber,
      };

      try {
        const res = await fetch("https://stockease-y1zr.onrender.com/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        });

        if (!res.ok) throw new Error("שמירת ההזמנה נכשלה");

        alert(
          `הוזמנה בקשה מספר ${orderId} ל-${orderData.quantity} יחידות של "${orderData.product}" ע״י ${orderData.fullName}`
        );

        this.$emit("order-submitted", orderData);
        this.selectedProduct = "";
        this.quantity = 1;
      } catch (error) {
        console.error(error);
        alert("אירעה שגיאה בשליחת הבקשה. נסי שוב.");
      }
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

.form-section label,
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
