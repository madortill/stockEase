<template>
  <div id="inventory-management">
    <h3 class="title-manage">ניהול מלאי</h3>
    <div class="search-container">
      <img
        src="@/assets/media/icons/square-plus.png"
        alt="הוספת מוצר"
        class="add-product-button"
        @click="openAddProductModal"
      />
      <input
        type="text"
        v-model="searchQuery"
        placeholder="חפש מוצר..."
        class="search-input"
      />
    </div>
    <div class="productList">
      <ProductItem
        v-for="(product, index) in filteredProducts"
        :key="index"
        :product="{ name: product }"
      ></ProductItem>
      <p v-if="filteredProducts.length === 0" class="no-products-message">
        פריט זה אינו נמצא
      </p>
    </div>
    <div v-if="showAddProductModal" class="modal-overlay">
      <div class="modal-content">
        <AddProduct
          @close="showAddProductModal = false"
          @productAdded="addNewProduct"
        ></AddProduct>
      </div>
    </div>
  </div>
</template>

<script>
import ProductItem from "@/components/ProductItem.vue";
import AddProduct from "@/components/AddProduct.vue";

export default {
  name: "InventoryManagement",
  components: {
    ProductItem,
    AddProduct,
  },
  data() {
    return {
      searchQuery: "",
      showAddProductModal: false,
      warehouseProductNames: [
        "עט כדורי",
        "עיפרון HB",
        "מחברת שורות",
        "דבק סטיק",
        "טוש הדגשה צהוב",
        'סרגל 30 ס"מ',
        "קלסר גדול",
        "שדכן",
        "חבילה של סיכות שדכן",
        // "נייר הדפסה A4",
        // "דבק סלוטייפ",
        // "לוח מחיק",
        // "טושים ללוח מחיק",
        // "מחדד שולחני",
        // "פנקס קטן",
        // "נייר דבק דו צדדי",
        // "מדבקות סימון צבעוניות",
        // "מחק איכותי",
        // "קליפסים לניירות",
        // "מעמד לעטים",
      ],
    };
  },
  computed: {
    filteredProducts() {
      return this.warehouseProductNames.filter((product) =>
        (typeof product === "string" ? product : product.name).includes(
          this.searchQuery
        )
      );
    },
  },
  methods: {
    openAddProductModal() {
      this.showAddProductModal = true;
      console.log(this.showAddProductModal);
    },
    addNewProduct(newProduct) {
      this.warehouseProductNames.push(newProduct);
      this.showAddProductModal = false; // סוגרים את המודל אחרי הוספת מוצר
    },
  },
};
</script>

<style scoped>
#inventory-management {
  min-height: 92vh;
  /* background-color: #f9fafb; */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  font-family: "Heebo", Arial, sans-serif;
}

.title-manage {
  color: #023047;
  font-size: 2.5rem;
  margin-bottom: 30px;
  text-align: center;
}

.search-container {
  display: flex;
  flex-direction: row-reverse; /* פלוס מימין */
  align-items: center;
  gap: 10px;
  width: 60%;
  max-width: 400px;
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
  width: 2.5rem;
  cursor: pointer;
}

@media (max-width: 600px) {
  .search-container {
    width: 80%;
  }
}
@media (max-width: 600px) {
  .search-input {
    width: 80%;
  }
}
.productList {
  max-height: 400px; /* אפשר לשנות את הגובה בהתאם לצורך שלך */
  overflow-y: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-right: 10px; /* בשביל לא להסתיר את הגלילה */
}

.no-products-message {
  text-align: center;
  color: #555;
  font-size: 1.2rem;
  margin-top: 20px;
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
  background-color: #fff;
  padding: 20px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
}
</style>
