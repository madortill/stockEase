<template>
    <div id="inventory-management">
      <h3>ניהול מלאי</h3>
      <p>כאן תוכלו לנהל את המלאי, להוסיף ולערוך מוצרים.</p>
      <div class="product-list">
        <h4>מוצרים במלאי:</h4>
        <ul>
          <li>מוצר 1</li>
          <li>מוצר 2</li>
          <li>מוצר 3</li>
        </ul>
      </div>
      <button @click="addProduct">הוסף מוצר</button>
    </div>
  </template>
  
  <script>
  export default {
    name: "InventoryManagement",
    methods: {
      addProduct() {
        console.log("הוספת מוצר");
        // כאן תוכל להוסיף את הלוגיקה להוספת מוצר למלאי
      },
    },
  };
  </script>
  
  <style scoped>
  #inventory-management {
    padding: 20px;
    background-color: #f1f1f1;
    border-radius: 8px;
  }
  
  h3 {
    color: #023047;
  }
  
  button {
    background-color: #ffb703;
    color: black;
    border: none;
    padding: 10px;
    cursor: pointer;
    font-size: 16px;
    border-radius: 5px;
  }
  
  button:hover {
    background-color: #fb8500;
  }
  </style>
  