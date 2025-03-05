<template>
  <div id="admin-in">
    <h1>ברוך הבא, מנהל!</h1>
    <div class="admin-login">
      <input
        class="user-admin"
        type="text"
        v-model="username"
        placeholder="שם משתמש"
      />
      <input
        class="password-admin"
        type="password"
        v-model="password"
        placeholder="סיסמה"
      />
      <button class="login-admin" @click="login">התחברות</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
   

    <!-- הודעה מוקפצת עם אפקט fade-out -->
    <transition name="fade">
      <div v-if="showPopup" class="popup">
        <p>{{ popupMessage }}</p>
        <!-- <button class="close-popup" @click="closePopup">אישור</button> -->
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "AdminPage",
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
      showPopup: false, // האם להציג את ההודעה
      popupMessage: "", // תוכן ההודעה המוקפצת
    };
  },
  methods: {
    login() {
      if (!this.username || !this.password) {
        this.errorMessage = "נא להזין שם משתמש וסיסמה";
        return;
      }

      // סימולציה של אימות (ניתן לשנות להתחברות אמיתית)
      if (this.username === "admin" && this.password === "1234") {
        this.showPopupMessage("התחברת בהצלחה!");
        this.errorMessage = "";
        setTimeout(() => {
          this.$emit("login-success", {
            fullName: "admin user",
            userType: "admin",
          }); 
        }, 1000);

      } else {
        this.errorMessage = "שם משתמש או סיסמה שגויים";
      }
    },
    showPopupMessage(message) {
      this.popupMessage = message;
      this.showPopup = true;
    },
    closePopup() {
      this.showPopup = false; 
    },
  },
};
</script>

<style scoped>
#admin-in {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
  margin-top: -50px;
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
}

.admin-login {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 300px;
}

.user-admin,
.password-admin {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

.login-admin {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  font-size: 1rem;
  background-color: #023047;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.login-admin:hover {
  background-color: #03546e;
}

.error {
  color: red;
  font-size: 0.9rem;
  margin-top: 5px;
}

/* עיצוב ההודעה המוקפצת */
.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.85);
  color: white;
  padding: 20px 30px;
  border-radius: 10px;
  font-size: 1.2rem;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

/* כפתור אישור בהודעה */
.close-popup {
  margin-top: 15px;
  padding: 8px 20px;
  background-color: #008cba;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.close-popup:hover {
  background-color: #005f73;
}

/* אנימציה להופעה והיעלמות של ההודעה */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
