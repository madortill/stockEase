<template>
  <div class="edit-product-form">
    <input
      v-model="localProduct.editName"
      placeholder="שם מוצר"
      class="edit-input"
    />
    <input
      type="number"
      v-model="localProduct.editQuantity"
      placeholder="כמות"
      class="edit-input"
    />
    <input
      type="number"
      v-model="localProduct.editPrice"
      placeholder="מחיר"
      class="edit-input"
    />
    <input
      v-model="localProduct.editCategory"
      placeholder="קטגוריה"
      class="edit-input"
    />
    <input
      v-model="localProduct.editSubCategory"
      placeholder="תת קטגוריה"
      class="edit-input"
    />

    <div class="buttons">
      <button @click="save">שמור</button>
      <button @click="cancel">בטל</button>
      <button class="delete-button" @click="confirmDelete">מחק מוצר</button>
    </div>

    <div v-if="showDeleteConfirm" class="delete-confirm-overlay">
      <div class="delete-confirm-box">
        <p>האם את בטוחה שברצונך למחוק את המוצר הזה?</p>
        <div class="buttons">
          <button @click="deleteProduct">כן, מחק</button>
          <button @click="showDeleteConfirm = false">לא</button>
        </div>
      </div>
    </div>
    <!-- <div v-if="showConfirmDeleteModal" class="modal-overlay">
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
    </div> -->
  </div>
</template>

<script>
export default {
  name: "EditProduct",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      localProduct: {
        ...this.product,
        editName: this.product.name,
        editQuantity: this.product.quantity,
        editPrice: this.product.price,
        editCategory: this.product.category,
        editSubCategory: this.product.subCategory,
      },
      showDeleteConfirm: false,
    };
  },
  methods: {
    save() {
      this.$emit("save", this.localProduct);
    },
    cancel() {
      this.$emit("cancel", this.localProduct);
    },
    confirmDelete() {
      this.showDeleteConfirm = true;
    },
    deleteProduct() {
      this.showDeleteConfirm = false;
      this.$emit("delete", this.localProduct);
    },
  },
};
</script>

<style scoped>
.edit-product-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.edit-input {
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
}
.buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 10px;
}
.buttons button {
  padding: 8px 20px;
  background-color: #023047;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
.buttons button:hover {
  background-color: #03546e;
}
.delete-button {
  background-color: #d90429;
}
.delete-button:hover {
  background-color: #a0031f;
}
.delete-confirm-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.delete-confirm-box {
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
}
</style>
