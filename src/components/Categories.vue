<template>
  <div id="categories-page">
    <h2 class="title">ניהול קטגוריות</h2>

    <div class="add-category-section">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="חיפוש קטגוריה"
        class="category-input"
      />
      <button @click="showModal = true" class="add-category-button">
        הוספת קטגוריה
      </button>

      <AddCategory
        v-if="showModal"
        @close="showModal = false"
        @category-added="handleCategoryAdded"
      />
    </div>

    <div v-if="filteredCategories.length > 0" class="categories-list">
      <div
        v-for="category in filteredCategories"
        :key="category._id"
        class="category-item"
      >
        <span>{{ category.name }}</span>
        <button @click="removeCategory(category._id)" class="remove-button">
          מחק
        </button>
      </div>
      <div v-if="showDeleteConfirm" class="delete-confirm-overlay">
        <div class="delete-confirm-box">
          <p>האם את בטוחה שברצונך למחוק את הקטגוריה?</p>
          <div class="confirm-buttons">
            <button @click="confirmDelete" class="confirm-button">מחק</button>
            <button @click="cancelDelete" class="cancel-button">בטל</button>
          </div>
        </div>
      </div>
    </div>
    <p v-else class="no-categories">לא קיימות קטגוריות במערכת.</p>
  </div>
</template>

<script>
import axios from "axios";
import AddCategory from "@/components/AddCategory.vue";
export default {
  name: "CategoriesPage",
  components: {
    AddCategory,
  },
  data() {
    return {
      searchQuery: "",
      categories: [],
      showModal: false,
      categoryToDelete: null,
      showDeleteConfirm: false,
    };
  },
  mounted() {
    this.fetchCategories();
  },
  computed: {
    filteredCategories() {
      return this.categories.filter((categories) =>
        categories.name.includes(this.searchQuery)
      );
    },
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/categories"
        );
        this.categories = response.data;
      } catch (error) {
        console.error("שגיאה בטעינת הקטגוריות:", error);
      }
    },

    handleCategoryAdded(newCategory) {
      this.categories.push(newCategory);
      this.showModal = false;
    },

    removeCategory(id) {
      this.categoryToDelete = id;
      this.showDeleteConfirm = true;
    },

    async confirmDelete() {
      try {
        await axios.delete(
          `http://localhost:5000/api/categories/${this.categoryToDelete}`
        );
        this.categories = this.categories.filter(
          (cat) => cat._id !== this.categoryToDelete
        );
      } catch (error) {
        console.error("שגיאה במחיקת הקטגוריה:", error);
      } finally {
        this.showDeleteConfirm = false;
        this.categoryToDelete = null;
      }
    },

    cancelDelete() {
      this.showDeleteConfirm = false;
      this.categoryToDelete = null;
    },
  },
};
</script>

<style scoped>
#categories-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
}

.title {
  color: #023047;
  font-size: 2rem;
  margin-bottom: 20px;
}

.add-category-section {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
}

.category-input {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  width: 250px;
}

.add-category-button {
  padding: 10px 20px;
  background-color: #023047;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-category-button:hover {
  background-color: #03546e;
}

.categories-list {
  width: 100%;
  max-width: 600px;
  height: 300px; /* גובה קבוע */
  overflow-y: auto; /* גלילה פנימית */
  display: block; /* לא flex — זה גורם קפיצות */
  padding: 10px;
  border-radius: 10px;
}

.category-item {
  display: flex;
  justify-content: space-between;
  padding: 12px 52px;
  border-bottom: 1px solid #e0e0e0;
  background-color: #f9f9f9;
  border-radius: 6px;
  margin-bottom: 10px; /* מוסיף רווח בין פריטים */
}

.remove-button {
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  padding: 5px 10px;
  transition: background-color 0.3s;
}

.remove-button:hover {
  background-color: #e63946;
}

.no-categories {
  color: #777;
  margin-top: 20px;
}
.delete-confirm-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.delete-confirm-box {
  background: white;
  padding: 20px 55px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.confirm-buttons {
  margin-top: 20px;
  display: flex;
  gap: 10px;
  justify-content: center;
}

.confirm-button {
  background-color: #ff6b6b;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 6px;
  cursor: pointer;
}

.cancel-button {
  background-color: #ccc;
  color: #333;
  border: none;
  padding: 8px 20px;
  border-radius: 6px;
  cursor: pointer;
}

</style>
