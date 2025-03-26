<template>
  <div id="guest-in">
    <h1 v-if="!showNewGuestForm">כניסת אורח קיים</h1>
    <h1 v-else>הרשמה כאורח חדש</h1>

    <div v-if="!showNewGuestForm" class="guest-login">
      <input
        class="full-name"
        type="text"
        v-model="fullName"
        placeholder="שם מלא"
      />
      <input
        class="personal-number"
        type="text"
        v-model="personalNumber"
        placeholder="מספר אישי"
        @input="validatePersonalNumber"
      />
      <p v-if="personalNumberError" class="error-message">
        {{ personalNumberError }}
      </p>
      <p v-if="loginError" class="error-message">{{ loginError }}</p>
      <button class="submit-button" @click="loginExistingGuest">התחברות</button>

      <p style="margin-top: 15px">
        עדיין אין לך משתמש?
        <span class="link-text" @click="showNewGuestForm = true">
          הירשם כאן
        </span>
      </p>
    </div>

    <NewGuest v-if="showNewGuestForm" @login-success="handleNewGuestSuccess" />

    <!-- הודעה מוקפצת -->
    <div v-if="showPopup" class="popup">
      <p>{{ popupMessage }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import NewGuest from "@/components/NewGuest.vue";

export default {
  name: "GuestIn",
  components: { NewGuest },
  data() {
    return {
      fullName: "",
      personalNumber: "",
      personalNumberError: "",
      loginError: "",
      showNewGuestForm: false,
      showPopup: false,
      popupMessage: "",
    };
  },
  methods: {
    validatePersonalNumber() {
      const personalNumberPattern = /^[0-9]{7}$/;
      this.personalNumberError =
        this.personalNumber && !personalNumberPattern.test(this.personalNumber)
          ? "נא להזין מספר אישי תקין (7 ספרות)"
          : "";
    },

    async loginExistingGuest() {
      if (!this.fullName || !this.personalNumber) {
        this.loginError = "נא למלא את כל השדות";
        return;
      }

      if (this.personalNumberError) {
        this.loginError = "נא להזין מספר אישי תקין";
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:5000/api/guest/login",
          {
            fullName: this.fullName.trim(),
            personalNumber: this.personalNumber.trim(),
          }
        );

        if (response.data.success && response.data.user) {
          const fullName = `${response.data.user.firstName} ${response.data.user.lastName}`;
          console.log("התקבל משתמש:", response.data.user);
          this.showPopupMessage(`ברוך הבא, ${fullName}!`);
          this.$emit("login-success", {
            fullName,
            personalNumber: response.data.user.personalNumber,
            userType: "guest",
          });
        } else {
          this.loginError = response.data.message || "משתמש לא נמצא";
        }
      } catch (error) {
        this.loginError = "שגיאה בהתחברות";
      }
    },

    showPopupMessage(message) {
      this.popupMessage = message;
      this.showPopup = true;
      setTimeout(() => {
        this.showPopup = false;
      }, 5000);
    },

    handleNewGuestSuccess(userData) {
      let fullName;
      let personalNumber;

      if (userData.fullName) {
   
        console.log("הקריאה הגיעה מ-NewGuest");
        fullName = userData.fullName;
        personalNumber = userData.personalNumber;
      } else if (userData.firstName && userData.lastName) {
        console.log("הקריאה הגיעה ממקור אחר (כמו GuestIn)");
        fullName = `${userData.firstName} ${userData.lastName}`;
        personalNumber = userData.personalNumber;
      } else {
        console.error("לא הצלחתי לזהות את מקור הנתונים", userData);
        return;
      }
      this.$emit("login-success", {
        fullName,
        personalNumber,
        userType: "guest",
      });
    },
  },
};
</script>

<style scoped>
.link-text {
  color: #023047;
  cursor: pointer;
  font-weight: bold;
}
.link-text:hover {
  text-decoration: underline;
}

#guest-in {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
}

h1 {
  color: #023047;
  margin-bottom: 30px;
  font-size: 2rem;
}

.guest-login {
  width: 100%;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.full-name,
.personal-number {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.03);
  transition: border-color 0.2s ease;
}

.full-name:focus,
.personal-number:focus {
  border-color: #023047;
  outline: none;
}

.submit-button {
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  background-color: #023047;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #03546e;
}

.error-message {
  color: red;
  font-size: 0.9rem;
  margin-top: -10px;
  text-align: right;
}

.link-text {
  color: #023047;
  cursor: pointer;
  font-weight: bold;
  transition: color 0.2s;
}

.link-text:hover {
  color: #03546e;
  text-decoration: underline;
}

/* עיצוב הפופאפ */
.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.85);
  color: white;
  padding: 20px 40px;
  border-radius: 12px;
  font-size: 1.2rem;
  text-align: center;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
  animation: fadeInOut 2.5s ease-in-out;
}

@keyframes fadeInOut {
  0% {
    opacity: 0;
    transform: translate(-50%, -60%);
  }
  10% {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
  90% {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -40%);
  }
}
</style>
