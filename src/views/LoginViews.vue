<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="role">Role</label>
        <select id="role" v-model="role" required>
          <option value="admin">Wh Operator</option>
          <option value="user">Ph Operator</option>
        </select>
      </div>

      <div class="form-group">
        <button type="submit">Login</button>
      </div>

      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      role: "admin",
    };
  },
  methods: {
    login() {
      localStorage.setItem("auth", true);
      localStorage.setItem("role", this.role);
      this.$router.push({ name: this.role, params: { component: "items" } });
    },
  },
};
</script>

<style scoped>
.login-container {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input,
select {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #45a049;
}

.error-message {
  color: red;
  margin-top: 10px;
  font-size: 14px;
}
</style>
