<template>
  <div id="app">
    <!-- Header Komponen -->
    <Header 
      :current-role="currentRole"
      :is-sidebar-visible="isSidebarVisible"
      @update-role="handleRoleUpdate"
      @toggle-sidebar="toggleSidebar"
      @search="handleSearch"
      @logout="handleLogout"
    />
    
    <!-- Sidebar Komponen -->
    <Sidebar 
      :current-role="currentRole"
      :is-sidebar-visible="isSidebarVisible"
      @show-component="handleComponentChange"
    />

    <!-- Konten Utama -->
    <main :class="{ 'content-expanded': !isSidebarVisible }">
      <!-- Tampilkan AdminView jika role adalah admin -->
      <AdminView 
        v-if="currentRole === 'admin'"
        :current-component="currentComponent"
        :items="items"
        :show-item-form="showItemForm"
        :selected-item="selectedItem"
        @update:show-item-form="showItemForm = $event"
        @save-item="handleSaveItem"
        @edit-item="handleEditItem"
        @delete-item="handleDeleteItem"
      />
      <!-- Tampilkan UserView jika role adalah user -->
      <UserView
        v-if="currentRole === 'user'"
        :current-component="currentComponent"
        :items="items"
      />
    </main>

    <!-- Modal Notifikasi -->
    <Modal 
      v-if="showModal"
      :modal-content="modalContent"
      @close="closeModal"
    />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/dashboard/Header.vue'
//import Transaction from './components/user/transaction/Transaction.vue'
//import UserList from  './components/admin/user/UserList.vue'
//import ItemList from './components/admin/item/ItemList.vue'
import Footer from '@/components/dashboard/Footer.vue'
import Sidebar from '@/components/dashboard/Sidebar.vue'
import AdminView from '@/views/AdminView.vue'
import UserView from '@/views/UserView.vue'
import Modal from '@/components/Modal.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    Sidebar,
    //UserList,
    //ItemList,
    AdminView,
    UserView,
    //Transaction,
    Modal
  },
  data() {
    return {
      currentRole: 'user',
      currentComponent: 'items',
      isSidebarVisible: true,
      items: [
        { code: "1", name: "Printer", description: "Ini adalah printer Canon", stock: 10 },
        { code: "2", name: "Laptop", description: "Laptop dengan spesifikasi tinggi", stock: 10 },
        { code: "3", name: "Charger", description: "Charger dengan fast Charging", stock: 10 },
        { code: "4", name: "Tas Sekolah", description: "Gak tau kenapa ada tas sekolah disini", stock: 10 }
      ],
      showItemForm: false,
      selectedItem: null,
      showModal: false,
      modalContent: { title: '', message: '', type: '' },
      searchQuery: ''
    }
  },
  methods: {
    handleRoleUpdate(role) {
      this.currentRole = role;
      this.currentComponent = role === 'admin' ? 'users' : 'items';
      console.log('Role changed to:', role);
    },
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
      console.log('Sidebar toggled:', this.isSidebarVisible);
    },
    handleComponentChange(component) {
      this.currentComponent = component;
      this.showItemForm = false;
      console.log('Component changed to:', component);
    },
    handleSaveItem(item) {
      if (this.selectedItem) {
        const index = this.items.findIndex(i => i.code === item.code);
        if (index !== -1) {
          this.items.splice(index, 1, item);
          this.showNotification('Sukses', 'Item berhasil diperbarui', 'success');
        }
      } else {
        this.items.push(item);
        this.showNotification('Sukses', 'Item berhasil ditambahkan', 'success');
      }
      this.showItemForm = false;
      this.selectedItem = null;
    },
    handleEditItem(item) {
      this.selectedItem = { ...item };
      this.showItemForm = true;
    },
    handleDeleteItem(code) {
      this.items = this.items.filter(item => item.code !== code);
      this.showNotification('Sukses', 'Item berhasil dihapus', 'success');
    },
    showNotification(title, message, type) {
      this.modalContent = { title, message, type };
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.modalContent = { title: '', message: '', type: '' };
    },
    handleSearch(query) {
      this.searchQuery = query;
    },
    handleLogout() {
      console.log('Logged out');
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.main-content {
  padding: 90px 20px 20px;
  background-color: #f8f9fa;
  flex: 1;
  transition: margin-left 0.3s ease;
}
.content-expanded {
  margin-left: 0;
}
.sidebar-visible {
  margin-left: 250px;
}
@media (max-width: 768px) {
  .main-content.sidebar-visible {
    margin-left: 200px;
  }
}
@media (max-width: 576px) {
  .main-content {
    padding: 90px 10px 20px;
  }
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
