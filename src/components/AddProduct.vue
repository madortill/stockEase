<template>
    <div class="add-product-container">
      <h2>הוספת מוצר חדש</h2>
      <form @submit.prevent="submitProduct">
        <div class="form-group">
          <label for="productName">שם המוצר:</label>
          <input
            id="productName"
            v-model="productName"
            type="text"
            placeholder="הכניסי את שם המוצר"
            required
          />
        </div>
        <button type="submit">הוסיפי מוצר</button>
        <button type="button" class="cancel-button" @click="$emit('close')">
          ביטול
        </button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: "AddProduct",
    data() {
      return {
        productName: "",
      };
    },
    methods: {
      submitProduct() {
        if (this.productName.trim() === "") return;
        // משדרת את שם המוצר חזרה ל-parent
        this.$emit("productAdded", this.productName);
        this.productName = "";
      },
    },
  };
  </script>

<style scoped>
.add-product-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 20px;
  font-family: "Heebo", Arial, sans-serif;
}

h2 {
  color: #023047;
  font-size: 2.2rem;
  margin-bottom: 30px;
  text-align: center;
}

form {
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 8px;
  font-weight: bold;
}

input {
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.2s ease-in-out;
}

input:focus {
  border-color: #023047;
  outline: none;
  box-shadow: 0 0 8px rgba(2, 48, 71, 0.2);
}

button {
  padding: 12px 20px;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  cursor: pointer;
  background-color: #023047;
  color: white;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #03567a;
}

.cancel-button {
  background-color: #e63946;
}

.cancel-button:hover {
  background-color: #c9182b;
}
</style>
