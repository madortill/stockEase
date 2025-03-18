<template>
  <div id="orders-page">
    <h3>הזמנות</h3>
    <p>כאן תוכל לנהל את ההזמנות שבוצעו ולבצע פעולות כמו אישור או ביטול.</p>
    <div class="order-list">
      <h4>הזמנות פתוחות:</h4>
      <ul>
        <li>הזמנה #1</li>
        <li>הזמנה #2</li>
        <li>הזמנה #3</li>
      </ul>
    </div>
    <button @click="processOrder">עבד על הזמנה</button>
  </div>
</template>

<script>
export default {
  name: "Oreders",
  methods: {
    processOrder() {
      console.log("עיבוד הזמנה");
      // כאן תוכל להוסיף את הלוגיקה לעיבוד הזמנה
    },
  },
};
</script>

<style scoped>
#orders-page {
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
