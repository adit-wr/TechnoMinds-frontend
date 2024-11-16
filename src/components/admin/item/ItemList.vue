<template>
  <div class="item-list container py-4">
    <div class="header d-flex justify-content-between align-items-center mb-3">
      <h2>Daftar Barang</h2>

      <button class="btn btn-primary" @click="showAddForm">
        <i class="bi bi-clipboard-plus-fill"></i> Tambah Item
      </button>
    </div>

    <div class="item-cards row">
      <ItemCard
        v-for="item in filteredItems"
        :key="item.code"
        :itemCode="item.code"
        :item="item"
        @edit-item="editItem"
        @delete-item="handleDelete(item.code)" 
        class="col-md-3 col-lg-4"
      />
    </div>

    <Modal :visible="showForm" @close="cancelEditForm">
      <ItemForm
        :item="selectedItem"
        :isEdit="isEdit"
        @submit="handleSubmit"
        @cancel="cancelEditForm"
      />
    </Modal>
  </div>
</template>

<script>
import { useItemStore } from "@/store/itemStore";
import ItemCard from "@/components/admin/item/ItemCard.vue";
import Modal from "@/components/Modal.vue";
import ItemForm from "@/components/admin/item/ItemForm.vue";
import EventBus from "@/utils/EventBus";

export default {
  components: {
    ItemCard,
    Modal,
    ItemForm,
  },
  data() {
    return {
      showForm: false,
      selectedItem: null,
      isEdit: false,
      searchQuery: "",
    };
  },
  computed: {
    items() {
      return this.itemStore.items || [];
    },
    filteredItems() {
      return this.items.filter((item) => {
        const code = item.code ? String(item.code).toLowerCase() : "";
        const name = item.name ? item.name.toLowerCase() : "";
        const query = this.searchQuery ? this.searchQuery.toLowerCase() : "";
        return code.includes(query) || name.includes(query);
      });
    },
  },
  methods: {
    showAddForm() {
      this.selectedItem = { code: "", name: "", description: "", stock: "" };
      this.isEdit = false;
      this.showForm = true;
    },
    editItem(item) {
      this.selectedItem = { ...item };
      this.isEdit = true;
      this.showForm = true;
    },
    handleSubmit(item) {
      if (this.isEdit) {
        this.itemStore.updateItem(item); // Update item jika sedang dalam mode edit
      } else {
        this.itemStore.addItem(item); // Tambah item baru
      }
      this.showForm = false;
    },
    cancelEditForm() {
      this.showForm = false;
    },
    handleDelete(itemCode) {
      // Menghapus item berdasarkan kode yang dikirimkan
      this.itemStore.deleteItem(itemCode);
    },
    handleSearch(query) {
      this.searchQuery = query;
    },
  },
  mounted() {
    EventBus.on("search", this.handleSearch);
  },
  beforeUnmount() {
    EventBus.off("search", this.handleSearch);
  },
  setup() {
    const itemStore = useItemStore();
    return { itemStore };
  },
};
</script>

<style scoped>
.item-list {
  background-color: white;
  border-radius: 8px;
  margin: auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.header h2 {
  color: rgb(192, 199, 199);
  font-size: 24px;
}
.container.py-4 {
  width: 70%;
}
</style>
