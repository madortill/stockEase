<template>
  <div id="categories-page">
    <h2 class="title">ניהול קטגוריות</h2>

    <div class="add-category-section">
      <input
        type="text"
        v-model="newCategory"
        placeholder="הוסף קטגוריה חדשה"
        class="category-input"
      />
      <button @click="addCategory" class="add-category-button">הוסף</button>
    </div>

    <div v-if="categories.length > 0" class="categories-list">
      <div
        v-for="category in categories"
        :key="category._id"
        class="category-item"
      >
        <span>{{ category.name }}</span>
        <button @click="removeCategory(category._id)" class="remove-button">
          מחק
        </button>
      </div>
    </div>
    <p v-else class="no-categories">לא קיימות קטגוריות במערכת.</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CategoriesPage",
  data() {
    return {
      newCategory: "",
      categories: [],
    };
  },
  mounted() {
    this.fetchCategories();
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
    async addCategory() {
      if (this.newCategory.trim() !== "") {
        try {
          const response = await axios.post(
            "http://localhost:5000/api/categories",
            {
              name: this.newCategory.trim(),
            }
          );
          this.categories.push(response.data);
          this.newCategory = "";
        } catch (error) {
          console.error("שגיאה בהוספת הקטגוריה:", error);
        }
      }
    },
    async removeCategory(id) {
      try {
        await axios.delete(`http://localhost:5000/api/categories/${id}`);
        this.categories = this.categories.filter((cat) => cat._id !== id);
      } catch (error) {
        console.error("שגיאה במחיקת הקטגוריה:", error);
      }
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
</style>
