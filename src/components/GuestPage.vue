<template>
  <div id="guest-page">
    <header>
      <h1>ברוך הבא! {{ guestData.fullName }}</h1>
      <div class = "guest-data">
        <p> מספר אישי: {{ guestData.personalNumber }}</p>
      </div>
    </header>

    <section class="search">
      <input type="text" v-model="searchQuery" placeholder="חפש מוצר..." />
    </section>

    <section class="products">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="product-card"
      >
        <h3>{{ product.name }}</h3>
        <p>{{ product.description }}</p>
        <span>{{ product.price }} ₪</span>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "GuestPage",
  props: {
    guestData: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  data() {
    return {
      searchQuery: "",
      products: [
        { id: 1, name: "כיסא משרדי", description: "נוח ואיכותי", price: 299 },
        { id: 2, name: "שולחן עבודה", description: "עמיד ומעוצב", price: 599 },
        {
          id: 3,
          name: "מסך מחשב 24'",
          description: "רזולוציה גבוהה",
          price: 899,
        },
      ],
    };
  },
  computed: {
    filteredProducts() {
      return this.products.filter((product) =>
        product.name.includes(this.searchQuery)
      );
    },
  },
  methods: {
    login() {
      this.$emit("login");
    },
  },
};
</script>

<style scoped>
#guest-page {
  padding: 20px;
  text-align: center;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #7c7b79;
  color: white;
  padding: 10px 20px;
  border-radius: 10px;
}

header button {
  background: #023047;
  color: white;
  border: none;
  padding: 8px 15px;
  cursor: pointer;
  border-radius: 5px;
}

.search {
  margin: 20px 0;
}

.search input {
  width: 80%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.products {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
}

.product-card {
  background: #e9c46a;
  padding: 15px;
  border-radius: 10px;
  width: 200px;
  text-align: center;
}
</style>
