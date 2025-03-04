<template>
  <div id="guest-in">
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
      <p v-if="personalNumberError" class="error-message">{{ personalNumberError }}</p>
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
      <input
        class="date-guest"
        type="date"
        v-model="selectedDate"
        :min="today"
      />

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

    <img
      src="@/assets/media/icons/undo.svg"
      alt="חזור"
      class="back-button"
      @click="$emit('go-back')"
    />

    <!-- הודעה מוקפצת -->
    <div v-if="showPopup" class="popup">
      <p>{{ popupMessage }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "GuestPage",
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
      const phonePattern = /^[0-9]{10}$/; // שינוי לדרישה של בדיוק 10 ספרות
      if (this.phoneNumber && !phonePattern.test(this.phoneNumber)) {
        this.phoneError = "נא להזין מספר טלפון תקין (10 ספרות)";
      } else {
        this.phoneError = "";
      }
    },

    submitForm() {
      if (
        !this.firstName ||
        !this.lastName ||
        !this.personalNumber ||
        !this.phoneNumber ||
        !this.role ||
        !this.selectedDate ||
        !this.rank
      ) {
        this.formError = "נא למלא את כל השדות!";
        return;
      }

      if (this.phoneError) {
        this.formError = "נא להזין מספר טלפון תקין!";
        return;
      }

      this.formError = "";
      this.showPopupMessage(`ברוך הבא, ${this.firstName} ${this.lastName}!`);

      this.$emit("login-success", {
        fullName: `${this.firstName} ${this.lastName}`,
        personalNumber: this.personalNumber,
        phoneNumber: this.phoneNumber,
        role: this.role,
        selectedDate: this.selectedDate,
        rank: this.rank,
        userType: "guest",
      });
    },
    validatePersonalNumber() {
      const personalNumberPattern = /^[0-9]{7}$/;
      this.personalNumberError = this.personalNumber && !personalNumberPattern.test(this.personalNumber)
        ? "נא להזין מספר אישי תקין (7 ספרות)"
        : "";
    },
    showPopupMessage(message) {
      this.popupMessage = message;
      this.showPopup = true;
      // setTimeout(() => {
        this.showPopup = false;
      // }, 2500);
    },
  },
};
</script>

<style scoped>
#guest-in {
  margin-top: -30px;
}
.back-button {
  width: 40px;
  position: fixed;
  bottom: 20px;
  left: 20px;
  cursor: pointer;
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
  margin-top: px;
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
  animation: fadeInOut 3s ease-in-out;
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
