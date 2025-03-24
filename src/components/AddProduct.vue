<template>
  <div class="add-product-form">
    <h3>הוספת מוצר חדש</h3>
    <p v-if="showError" class="error-message">אנא מלאי את כל השדות</p>
    <input v-model="name" placeholder="שם מוצר" />
    <input v-model.number="quantity" type="number" placeholder="כמות" />
    <input v-model.number="price" type="number" placeholder="מחיר ליחידה" />
    <input v-model="category" placeholder="קטגוריה" />
    <input v-model="subCategory" placeholder="קטגוריה משנה" />
    <button class="add-button" @click="submitProduct">הוסף</button>
    <button class="cancel-button" @click="$emit('close')">X</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddProduct",
  data() {
    return {
      name: "",
      quantity: null,
      price: null,
      category: "",
      subCategory: "",
      showError: false,
    };
  },
  methods: {
    async submitProduct() {
      if (!this.name || !this.quantity || !this.price || !this.category) {
        this.showError = true;
        return;
      }

      this.showError = false;

      try {
        console.log("נשלח לשרת:", {
          name: this.name,
          quantity: this.quantity,
          price: this.price,
          category: this.category,
          subCategory: this.subCategory,
        });

        const response = await axios.post(
          "http://localhost:5000/api/products",
          {
            name: this.name,
            quantity: this.quantity,
            price: this.price,
            category: this.category,
            subCategory: this.subCategory,
          }
        );

        this.$emit("productAdded", response.data);

        // איפוס שדות
        this.name = "";
        this.quantity = null;
        this.price = null;
        this.category = "";
        this.subCategory = "";
      } catch (error) {
        console.error("שגיאה בהוספת מוצר:", error);
        alert("אירעה שגיאה בהוספת המוצר. נסי שוב.");
      }
    },
  },
};
</script>

<style scoped>
.add-product-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.add-product-form input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
}

.add-button {
  padding: 10px;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  cursor: pointer;
  background-color: #023047;
  color: white;
  transition: background-color 0.2s;
}

.add-button:hover {
  background-color: #03567a;
}

.cancel-button {
  position: absolute;
  border: none;
  cursor: pointer;
  font-size: 1.8rem;
  background-color: white;
  padding: 0;
}

.error-message {
  color: red;
  font-size: 0.9rem;
  margin: -10px 0 10px 0;
}
</style>
