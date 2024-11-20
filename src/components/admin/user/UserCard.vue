<template>
  <div class="user-card">
    <div class="user-info">
      <h3>{{ user.username }}</h3>
      <p>Email: {{ user.email }}</p>
      <p>Role: {{ user.role }}</p>
    </div>

    <div class="actions">
      <button class="edit-btn" @click="$emit('edit-user', user)">Edit</button>
      <button class="delete-btn" @click="$emit('delete-user', user.id)">
        Hapus
      </button>
    </div>
  </div>
</template>

<script>
import { useUserStore } from "@/store/userStore"; 

export default {
  name: "UserCard",
  props: {
    userCode: {
      type: String,
      required: true, // Mengambil code item dari parent
    },
  },
  computed: {
    // Mengambil item berdasarkan code dari store
    user() {
      const store = useUserStore(); // Mengakses store
      return store.user.find(user => user.code === this.userCode) || {}; // Menemukan item berdasarkan code
    },
  },
  methods: {
    editUser() {
      this.$emit("edit-user", this.user);
    },
    confirmDelete() {
      if (confirm("Apakah Anda yakin ingin menghapus item ini?")) {
        this.$emit("delete-user", this.user.code);
      }
    },
  },
};
</script>

<style scoped>
.user-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  margin-bottom: 12px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.user-info h3 {
  margin: 0;
  color: #333;
  font-size: 18px;
}

.user-info p {
  margin: 4px 0;
  color: #666;
  font-size: 14px;
}

.actions {
  display: flex;
  gap: 8px;
}

.edit-btn,
.delete-btn {
  padding: 6px 12px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
}

.edit-btn {
  background-color: #4caf50;
  color: white;
}

.edit-btn:hover {
  background-color: #388e3c;
}

.delete-btn {
  background-color: #f44336;
  color: white;
}

.delete-btn:hover {
  background-color: #d32f2f;
}
</style>
