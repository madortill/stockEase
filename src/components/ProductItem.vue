<template>
  <div class="product-item">
    <div class="product-info">
      {{ product.name }}
    </div>
    <div class="actions">
      <img 
        src="@/assets/media/icons/pencil.svg"
        alt="עריכה"
        class="edit-button"
        @click="toggleAbout"
      />
      <!-- <img 
        src="@/assets/media/icons/trash.svg"
        alt="מחיקה"
        class="trash-button"
        @click="toggleAbout"
      /> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductItem",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    toggleAbout() {
      console.log("Edit or delete clicked");
    },
  },
};
</script>


<style scoped>
.product-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 60%;
  margin: 5px auto;
  padding: 1.5rem;
  background-color: #ffff;
  border-radius: 10px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
}
.actions button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  margin-left: 8px;
}

.trash-button {
    width: 1rem;
    cursor: pointer;
}

.edit-button {
    width: 1rem;
    cursor: pointer;
}
</style>