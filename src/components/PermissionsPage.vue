<template>
  <div id="permissions-page">
    <h3>הרשאות</h3>
    <p>כאן תוכל לנהל את ההרשאות של המשתמשים במערכת.</p>
    <div class="permissions-list">
      <h4>הרשאות נוכחיות:</h4>
      <ul>
        <li>משתמש 1: מנהל</li>
        <li>משתמש 2: עובד</li>
        <li>משתמש 3: לקוח</li>
      </ul>
    </div>
    <button class="update-premission" @click="updatePermissions">
      עדכן הרשאות
    </button>
  </div>
</template>

<script>
export default {
  name: "PermissionsPage",
  methods: {
    updatePermissions() {
      console.log("עדכון הרשאות");
      // כאן תוכל להוסיף את הלוגיקה לעדכון הרשאות
    },
  },
};
</script>

<style scoped>
#permissions-page {
  height: 92vh;
  background-color: #f1f1f1;
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
