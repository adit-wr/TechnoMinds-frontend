<template>
  <div class="item-list">
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h2>Daftar SPK Masuk</h2>
      </div>
      <div class="card-body">
        <table class="table table-hover table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nama Karyawan</th>
              <th>SPK</th>
              <th>Tanggal Pengajuan</th>
              <th>WH Operator</th> 
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in tableData" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.namaKaryawan }}</td>
              <td>
                <a :href="item.spk" target="_blank">Download PDF</a>
              </td>
              <td>{{ item.tanggalPengajuan }}</td>
              <td>Doni Monardo</td> 
              <td>
                <button class="btn btn-primary btn-sm" @click="editSPK(item.id)">
                  <i class="bi bi-pencil-square"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <Modal :visible="showForm" @close="cancelEditForm">
      <TransactionForm
        :item="selectedItem"
        :isEdit="isEdit"
        @submit="handleSubmit"
        @cancel="cancelEditForm"
      />
    </Modal>
  </div>
</template>

<script>
//import TransactionForm from '../components/admin/transaction/TransactionForm.vue'
import Modal from '@/components/Modal.vue';
export default {
  components: {
    //TransactionForm,
    Modal
  },
  data() {
    return {
      tableData: [
        {
          id: 1,
          namaKaryawan: 'John Doe',
          spk: 'path/to/surat_perintah_kerja_1.pdf',
          tanggalPengajuan: '2024-11-01',
          status: 'Pending'
        },
        {
          id: 2,
          namaKaryawan: 'Jane Smith',
          spk: 'path/to/surat_perintah_kerja_2.pdf',
          tanggalPengajuan: '2024-11-02',
          status: 'On Process'
        },
        {
          id: 3,
          namaKaryawan: 'Michael Johnson',
          spk: 'path/to/surat_perintah_kerja_3.pdf',
          tanggalPengajuan: '2024-11-03',
          status: 'Done'
        },
        {
          id: 4,
          namaKaryawan: 'Jane Smith',
          spk: 'path/to/surat_perintah_kerja_2.pdf',
          tanggalPengajuan: '2024-11-02',
          status: 'On Process'
        },
        {
          id: 5,
          namaKaryawan: 'Michael Johnson',
          spk: 'path/to/surat_perintah_kerja_3.pdf',
          tanggalPengajuan: '2024-11-03',
          status: 'Done'
        },
        {
          id: 6,
          namaKaryawan: 'John Doe',
          spk: 'path/to/surat_perintah_kerja_1.pdf',
          tanggalPengajuan: '2024-11-01',
          status: 'Pending'
        },
      ]
    };
  },
  methods: {
    editSPK(id) {
      // Logika untuk mengedit SPK, misalnya membuka modal atau halaman edit
      console.log(`Edit SPK dengan ID ${id}`);
      alert(`Fungsi edit untuk SPK dengan ID ${id} belum diimplementasikan.`); // Notifikasi sementara
    }
  }
};
</script>

<style scoped>
.item-list {
  width: 82%;
}
/* Tabel styling */
.table {
  width: 100%;
  margin-top: 20px;
}
</style>
