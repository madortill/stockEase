<template>
  <div id="inventory-display">
    <h3 class="title">רשימת פריטים במחסן</h3>
    <div class="search-container">
      <button class="add-product-button" @click="openAddProductModal">
        הוסף מוצר
      </button>
      <input
        type="text"
        v-model="searchQuery"
        placeholder="חפש מוצר..."
        class="search-input"
      />
    </div>

    <div v-if="loading" class="loading">טוען נתונים...</div>
    <div v-else>
      <div v-if="filteredProducts.length > 0" class="product-list">
        <div
          v-for="product in filteredProducts"
          :key="product._id"
          class="product-item"
        >
          <template v-if="product.isEditing">
            <EditProduct
              :product="product"
              @save="saveEditFromChild"
              @cancel="cancelEdit"
              @requestDelete="handleDeleteRequest"
            />
          </template>
          <template v-else>
            <span class="product-name">{{ product.name }}</span>
            <span class="product-quantity">כמות: {{ product.quantity }}</span>
            <img
              src="@/assets/media/icons/edit.svg"
              alt="עריכה"
              class="edit-button"
              @click="editProduct(product)"
            />
          </template>
        </div>
      </div>
      <p v-else class="no-products">לא נמצאו פריטים במאגר.</p>
    </div>

    <div v-if="showAddProductModal" class="modal-overlay">
      <div class="modal-content">
        <AddProduct
          @close="showAddProductModal = false"
          @productAdded="addNewProduct"
        />
      </div>
    </div>

    <div v-if="showConfirmDeleteModal" class="modal-overlay">
      <div class="modal-content">
        <p>
          האם את בטוחה שאת רוצה למחוק את המוצר "{{ productToDelete.name }}"?
        </p>
        <div class="modal-buttons">
          <button @click="deleteConfirmed" class="add-product-button">
            מחק
          </button>
          <button @click="cancelDelete" class="add-product-button cancel">
            ביטול
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddProduct from "@/components/AddProduct.vue";
import EditProduct from "@/components/EditProduct.vue";

export default {
  name: "InventoryDisplay",
  components: { AddProduct, EditProduct },
  data() {
    return {
      products: [],
      loading: true,
      searchQuery: "",
      showAddProductModal: false,
      showConfirmDeleteModal: false,
      productToDelete: null,
    };
  },
  computed: {
    filteredProducts() {
      return this.products.filter((product) =>
        product.name.includes(this.searchQuery)
      );
    },
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    openAddProductModal() {
      this.showAddProductModal = true;
    },
    addNewProduct(newProduct) {
      this.products.push(newProduct);
      this.showAddProductModal = false;
    },
    async fetchProducts() {
      try {
        const response = await fetch("https://stockease-y1zr.onrender.com/api/products");
        const data = await response.json();
        this.products = data.map((p) => ({
          ...p,
          isEditing: false,
        }));
      } catch (error) {
        console.error("שגיאה בטעינת המוצרים:", error);
      } finally {
        this.loading = false;
      }
    },
    editProduct(product) {
      product.isEditing = true;
    },
    cancelEdit(product) {
      const originalProduct = this.products.find((p) => p._id === product._id);
      if (originalProduct) {
        originalProduct.isEditing = false;
      }
    },

    async saveEditFromChild(updatedProduct) {
      try {
        const response = await fetch(
          `https://stockease-y1zr.onrender.com/api/products/${updatedProduct._id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: updatedProduct.editName,
              quantity: updatedProduct.editQuantity,
              price: updatedProduct.editPrice,
              category: updatedProduct.editCategory,
              subCategory: updatedProduct.editSubCategory,
            }),
          }
        );
        if (response.ok) {
          const product = this.products.find(
            (p) => p._id === updatedProduct._id
          );
          product.name = updatedProduct.editName;
          product.quantity = updatedProduct.editQuantity;
          product.price = updatedProduct.editPrice;
          product.category = updatedProduct.editCategory;
          product.subCategory = updatedProduct.editSubCategory;
          product.isEditing = false;
        } else {
          console.error("שגיאה בעדכון המוצר");
        }
      } catch (error) {
        console.error("שגיאה בשמירת העריכה:", error);
      }
    },
    handleDeleteRequest(product) {
      this.productToDelete = product;
      this.showConfirmDeleteModal = true;
    },
    async deleteConfirmed() {
      try {
        const response = await fetch(
          `https://stockease-y1zr.onrender.com/api/products/${this.productToDelete._id}`,
          { method: "DELETE" }
        );
        if (response.ok) {
          this.products = this.products.filter(
            (product) => product._id !== this.productToDelete._id
          );
        } else {
          console.error("שגיאה במחיקת המוצר");
        }
      } catch (error) {
        console.error("שגיאה במחיקה:", error);
      } finally {
        this.showConfirmDeleteModal = false;
        this.productToDelete = null;
      }
    },
    cancelDelete() {
      this.showConfirmDeleteModal = false;
      this.productToDelete = null;
    },
  },
};
</script>

<style scoped>
#inventory-display {
  min-height: 92vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 20px;
}

.title {
  color: #023047;
  font-size: 2.5rem;
  margin: 1rem;
}

.loading {
  font-size: 1.5rem;
  color: #555;
}
.product-list {
  width: 100%;
  max-width: 600px;
  height: 300px; /* גובה קבוע */
  overflow-y: auto; /* גלילה פנימית */
  display: block; /* לא flex — זה גורם קפיצות */
  padding: 10px;
  border-radius: 10px;
}

.product-item {
  display: flex;
  justify-content: space-between;
  padding: 12px 20px;
  border-bottom: 1px solid #e0e0e0;
  background-color: #f9f9f9;
  border-radius: 6px;
  margin-bottom: 10px; /* מוסיף רווח בין פריטים */
}

.product-item:not(:last-child) {
  margin-bottom: 10px;
}

.product-name {
  font-weight: bold;
}

.product-quantity {
  color: #555;
}

.no-products {
  color: #777;
  margin-top: 20px;
}

.search-container {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  gap: 10px;
  width: 80%;
  max-width: 500px;
  margin-bottom: 40px;
}

.search-input {
  flex: 1;
  padding: 10px 14px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease-in-out;
}

.search-input:focus {
  border-color: #023047;
  outline: none;
  box-shadow: 0 0 8px rgba(2, 48, 71, 0.2);
}

.add-product-button {
  padding: 0px 20px;
  font-size: 1rem;
  background-color: #023047;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.add-product-button:hover {
  background-color: #03546e;
}

.modal-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  /* border-radius: 12px; */
  width: 90%;
  max-width: 400px;
}

.edit-input {
  margin: 5px;
  padding: 5px 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.modal-content {
  background-color: white;
  padding: 30px 20px;
  /* border-radius: 20px; */
  width: 90%;
  max-width: 450px;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  text-align: center;
}
.modal-buttons {
  display: flex;
  justify-content: center;
  gap: 20px; /* רווח של 20 פיקסלים בין הכפתורים */
  margin-top: 20px;
}
.edit-button {
  width: 2rem;
}
</style>
