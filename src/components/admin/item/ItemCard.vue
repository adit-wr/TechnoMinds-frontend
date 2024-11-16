<template>
  <div class="item-card card mb-3">
    <div class="card-body">
      <h3 class="card-title">{{ item.name }}</h3>
      <p class="card-text">{{ item.description }}</p>
      <p class="card-text stock">Stok: {{ item.stock }}</p>
      <div class="buttons d-flex gap-2 mt-3">
        <button @click="editItem" class="btn btn-success edit">
          <i class="bi bi-pencil-square"></i> Edit
        </button>
        <button
          @click="confirmDelete"
          class="btn btn-danger delete"
          :disabled="item.stock === 0"
        >
          <i class="bi bi-trash3"></i> Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useItemStore } from "@/store/itemStore"; 

export default {
  name: "ItemCard",
  props: {
    itemCode: {
      type: String,
      required: true, // Mengambil code item dari parent
    },
  },
  computed: {
    // Mengambil item berdasarkan code dari store
    item() {
      const store = useItemStore(); // Mengakses store
      return store.items.find(item => item.code === this.itemCode) || {}; // Menemukan item berdasarkan code
    },
  },
  methods: {
    editItem() {
      this.$emit("edit-item", this.item);
    },
    confirmDelete() {
      if (confirm("Apakah Anda yakin ingin menghapus item ini?")) {
        this.$emit("delete-item", this.item.code);
      }
    },
  },
};
</script>

<style scoped>
.item-card {
  transition: transform 0.2s, box-shadow 0.2s;
}
.item-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.item-card .card-title {
  margin: 0 0 10px;
  font-size: 1.25rem;
  color: #333;
}
.item-card .card-text {
  margin: 5px 0;
  color: #555;
}
.item-card .stock {
  font-weight: bold;
  color: #2c3e50;
}
.item-card button {
  transition: background-color 0.2s;
}
</style>
