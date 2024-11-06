<!-- transactionForm.vue -->
<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Detail Transaksi</h5>
        <button type="button" class="close" @click="closeModal">×</button>
      </div>
      <div class="modal-body">
        <p><strong>ID:</strong> {{ transaction.id }}</p>
        <p><strong>Nama Karyawan:</strong> {{ transaction.namaKaryawan }}</p>
        <p><strong>Tanggal Pengajuan:</strong> {{ transaction.tanggalPengajuan }}</p>
        
        <div class="form-group">
          <label for="status">Update Transaksi:</label>
          <select v-model="transaction.status" class="form-control" id="status">
            <option value="Pending">Pending</option>
            <option value="On Process">On Process</option>
            <option value="Done">Done</option>
          </select>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" @click="closeModal">Batal</button>
        <button class="btn btn-primary" @click="updateTransaction">Simpan Perubahan</button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  props: {
    visible: Boolean,
    transaction: Object,
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    updateTransaction() {
      // Emit event dengan detail transaksi yang diperbarui
      this.$emit('update', this.transaction);
      this.closeModal();
    },
  },
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  width: 500px;
}
.modal-header, .modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
