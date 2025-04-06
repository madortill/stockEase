<template>
  <div id="admin-in">
    <h1 class = "welcom-text">ברוך הבא, מנהל!</h1>
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
    </transition >
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "AdminPage",
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
      showPopup: false,
      popupMessage: "",
    };
  },
  methods: {
    async login() {
      if (!this.username || !this.password) {
        this.errorMessage = "נא להזין שם משתמש וסיסמה";
        return;
      }

      try {
        const response = await axios.post('https://stockease-y1zr.onrender.com/api/admin/login', {
          username: this.username,
          password: this.password
        });

        // אם הצליח:
        this.showPopupMessage("התחברת בהצלחה!");
        this.errorMessage = "";
        setTimeout(() => {
          this.$emit("login-success", {
            fullName: response.data.admin.username,
            userType: "admin",
          });
        }, 2000);

      } catch (error) {
        this.errorMessage = error.response?.data?.message || "שגיאה בשרת";
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
  padding: 2rem;
  margin-top: -2rem;
}

.welcom-text {
  font-size: 2.3rem;
  margin-bottom: 1rem;
}

.admin-login {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 30rem;
}

.user-admin,
.password-admin {
  width: 100%;
  padding: 1rem;
  margin: 0.5rem 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

.login-admin {
  width: 100%;
  padding: 1rem;
  margin-top: 3.5rem;
  font-size: 1rem;
  background-color: #023047;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  font-size: 1.1rem;
}

.login-admin:hover {
  background-color: #03546e;
}

.error {
  color: red;
  font-size: 0.9rem;
  margin-top: 1rem;
}

/* עיצוב ההודעה המוקפצת */
.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.85);
  color: white;
  padding: 1rem 3rem;
  border-radius: 10px;
  font-size: 1.5rem;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
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
