<template>
  <div id="add-category">
    <div class="modal-overlay">
      <div class="modal-content">
        <h3>הוספת קטגוריה חדשה</h3>
        <input
          type="text"
          v-model="categoryName"
          placeholder="שם הקטגוריה"
          class="modal-input"
        />
        <div class="modal-buttons">
          <button @click="addCategory" class="confirm-button">שמור</button>
          <button @click="$emit('close')" class="cancel-button">ביטול</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddCategory",
  data() {
    return {
      categoryName: "",
    };
  },
  methods: {
    async addCategory() {
      if (this.categoryName.trim() === "") return;
      try {
        const response = await axios.post(
          "http://localhost:5000/api/categories",
          { name: this.categoryName.trim() }
        );
        this.$emit("category-added", response.data);
      } catch (error) {
        console.error("שגיאה בהוספת הקטגוריה:", error);
      }
    },
  },
};
</script>

<style scoped>
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
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 30px;
  max-width: 400px;
  width: 90%;
  text-align: center;
}

.modal-input {
  width: 100%;
  padding: 10px;
  margin-top: 15px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.modal-buttons {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 15px;
}

.confirm-button {
  background-color: #023047;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
}

.cancel-button {
  background-color: #ccc;
  color: #333;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
}
</style>
