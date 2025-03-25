<template>
  <div id="new-guest">
    <h1>פרטים אישיים</h1>
    <div class="guest-login">
      <input
        class="first-name"
        type="text"
        v-model="firstName"
        placeholder="שם פרטי"
      />
      <input
        class="last-name"
        type="text"
        v-model="lastName"
        placeholder="שם משפחה"
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
      <input
        class="phone-number"
        type="tel"
        v-model="phoneNumber"
        placeholder="מספר טלפון"
        @input="validatePhoneNumber"
        dir="rtl"
      />
      <p v-if="phoneError" class="error-message">{{ phoneError }}</p>
      <input class="job-guest" type="text" v-model="role" placeholder="תפקיד" />

      <select class="rank-guest" v-model="rank">
        <option disabled value="">בחר דרגה</option>
        <option
          v-for="(rankOption, index) in ranks"
          :key="index"
          :value="rankOption"
        >
          {{ rankOption }}
        </option>
      </select>
      <p v-if="formError" class="error-message">{{ formError }}</p>
      <button class="submit-button" @click="submitForm">כניסה</button>
    </div>

    <!-- הודעה מוקפצת -->
    <div v-if="showPopup" class="popup">
      <p>{{ popupMessage }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "NewGuest",
  data() {
    return {
      firstName: "",
      lastName: "",
      personalNumber: "",
      phoneNumber: "",
      phoneError: "",
      formError: "",
      role: "",
      selectedDate: "",
      rank: "",
      ranks: ["טוראי", 'רב"ט', "סמל", 'סמ"ר', 'רס"ל'],
      today: this.getTodayDate(),
      showPopup: false,
      popupMessage: "",
      personalNumberError: "",
    };
  },
  methods: {
    getTodayDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },

    validatePhoneNumber() {
      const phonePattern = /^[0-9]{10}$/;
      if (this.phoneNumber && !phonePattern.test(this.phoneNumber)) {
        this.phoneError = "נא להזין מספר טלפון תקין (10 ספרות)";
      } else {
        this.phoneError = "";
      }
    },

    validatePersonalNumber() {
      const personalNumberPattern = /^[0-9]{7}$/;
      this.personalNumberError =
        this.personalNumber && !personalNumberPattern.test(this.personalNumber)
          ? "נא להזין מספר אישי תקין (7 ספרות)"
          : "";
    },

    async submitForm() {
      console.log("submitForm הופעלה");

      if (
        !this.firstName ||
        !this.lastName ||
        !this.personalNumber ||
        !this.phoneNumber ||
        !this.role ||
        !this.rank
      ) {
        this.formError = "נא למלא את כל השדות!";
        return;
      }

      if (this.phoneError || this.personalNumberError) {
        this.formError = "נא לתקן את השגיאות בטופס!";
        return;
      }

      this.formError = "";

      // שליחת הנתונים לשרת
      try {
        await axios.post("http://localhost:5000/api/guest/add", {
          firstName: this.firstName.trim(),
          lastName: this.lastName.trim(),
          personalNumber: this.personalNumber.trim(),
          phoneNumber: this.phoneNumber.trim(),
          role: this.role.trim(),
          rank: this.rank.trim(),
        });
        console.log("✅ האורח נוסף למסד הנתונים בהצלחה!");
      } catch (error) {
        console.error("❌ שגיאה בשליחת הנתונים לשרת:", error);
      }

      // הודעת הצלחה
      this.showPopupMessage(`ברוך הבא, ${this.firstName} ${this.lastName}!`);

      // emitting event להורה
      this.$emit("login-success", {
        fullName: `${this.firstName} ${this.lastName}`,
        personalNumber: this.personalNumber,
        phoneNumber: this.phoneNumber,
        role: this.role,
        rank: this.rank,
        userType: "guest",
      });
    },

    showPopupMessage(message) {
      console.log("הצגת הודעה:", message);
      this.popupMessage = message;
      this.showPopup = true;

      setTimeout(() => {
        this.showPopup = false;
        console.log("ההודעה נסגרה");
      }, 2500);
    },
  },
};
</script>

<style scoped>
#new-guest {
  margin-top: -30px;
}

.guest-login {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 300px;
}

.first-name,
.last-name,
.personal-number,
.phone-number,
.job-guest,
.date-guest,
.rank-guest {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

.rank-guest {
  background-color: white;
  cursor: pointer;
}

.submit-button {
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

.submit-button:hover {
  background-color: #03546e;
}

.error-message {
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
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 15px 30px;
  border-radius: 10px;
  font-size: 1.2rem;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  animation: fadeInOut 2.5s ease-in-out;
}

/* אנימציה להופעה והיעלמות של ההודעה */
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
