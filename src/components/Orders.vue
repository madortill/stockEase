<template>
  <div id="orders-page">
    <h3>הזמנות</h3>
    
  </div>
</template>

<script>
export default {
  name: "Oreders",
  methods: {
    processOrder() {

    },
  },
};
</script>

<style scoped>
#orders-page {
  height: 92vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
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
