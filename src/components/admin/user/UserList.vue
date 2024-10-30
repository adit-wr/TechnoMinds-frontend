<template>
    <div class="user-list container mt-5 mb-4">
        <div class="card">
            <div class="header">
                <h2>Daftar Pengguna</h2>
                <button @click="openAddUserModal">Tambah Pengguna</button>
            </div>
            <div class="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th class="action-column text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users" :key="user.id">
                            <td>{{ user.id }}</td>
                            <td>{{ user.username }}</td>
                            <td>{{ user.email }}</td>
                            <td>{{ user.role }}</td>
                            <td class="text-center">
                                <button @click="openEditUserModal(user)">Edit</button>
                                <button @click="deleteUser(user.id)">Hapus</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Modal untuk Menambah/Mengedit Pengguna -->
        <Modal
            v-if="showModal"
            :user="selectedUser"
            @close="closeModal"
            @save="saveUser"
        />
    </div>
</template>

<script>
import Modal from './Modal.vue'; // Import komponen Modal

export default {
    components: {
        Modal
    },
    data() {
        return {
            users: [
                { id: 1, username: 'Budi', email: 'budi@gmail.com', role: 'admin' },
                { id: 2, username: 'Andi', email: 'andi@gmail.com', role: 'admin' },
                { id: 3, username: 'Tono', email: 'tono@gmail.com', role: 'user' },
                { id: 4, username: 'Jono', email: 'Jono@gmail.com', role: 'admin' },
                { id: 5, username: 'Mono', email: 'Mono@gmail.com', role: 'user' },
                { id: 6, username: 'Gono', email: 'Gono@gmail.com', role: 'admin' }
            ],
            showModal: false,
            selectedUser: null
        };
    },
    methods: {
        openAddUserModal() {
            this.selectedUser = null; // Reset data pengguna yang dipilih untuk menambah
            this.showModal = true;
        },
        openEditUserModal(user) {
            this.selectedUser = { ...user }; // Clone data pengguna yang dipilih
            this.showModal = true;
        },
        deleteUser(id) {
            this.users = this.users.filter(user => user.id !== id);
            this.$emit('delete-user', id);
        },
        closeModal() {
            this.showModal = false;
            this.selectedUser = null; // Reset pengguna terpilih saat modal ditutup
        },
        saveUser(user) {
            if (user.id) {
                // Edit pengguna yang sudah ada
                const index = this.users.findIndex(u => u.id === user.id);
                if (index !== -1) {
                    this.users.splice(index, 1, user);
                }
            } else {
                // Tambah pengguna baru
                user.id = this.users.length + 1; // Generasi ID baru
                this.users.push(user);
            }
            this.closeModal();
        }
    }
}
</script>

<style scoped>
.card {
  padding: 24px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

/* Header styling */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

h2 {
  color: black;
  font-weight: bold;
}

/* Table styling */
.table-responsive {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 0px 5px solid #f3f1f1;
  padding: 12px 15px;
  text-align: center;
  vertical-align: middle;
  border-bottom: 1px solid #ddd;
}

td {
  color: black;
}

th {
  background-color: #f4f4f8;
  color: rgb(24, 23, 23);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

tr:hover {
  background-color: #ddd;
}

button {
  padding: 6px 12px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
}

.verif-btn {
  background-color: #4caf50;
  color: white;
}

.verif-btn:hover {
  background-color: #45a049;
}

.verif-btn[disabled] {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Responsive design */
@media (max-width: 600px) {
  th,
  td {
    padding: 8px 10px;
  }
  .action-buttons {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
  .action-buttons button {
    margin: 5px 0;
  }
}
</style>
