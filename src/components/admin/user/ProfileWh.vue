<template>
  <div class="isi">
    <h2 class="mb-4 text-center">Profil Karyawan</h2>
    
    <!-- Alert yang akan muncul ketika profil berhasil di-update -->
    <div v-if="showAlert" class="alert alert-success" role="alert">
      Profile berhasil di-update
    </div>
    
    <div class="card shadow p-4">
      <div class="form-group mb-3">
        <label for="employeeName">Nama Karyawan:</label>
        <input
          type="text"
          class="form-control"
          v-model="employeeName"
          id="employeeName"
          placeholder="Masukkan nama karyawan"
          readonly
        />
        <input type="hidden" v-model="employeeId" /> 
      </div>
      <div class="form-group mb-3">
        <label for="status">Status Kerja:</label>
        <select v-model="status" @change="updateStatus" class="form-control" id="status">
          <option value="off">Off</option>
          <option value="free">Free</option>
          <option value="on duty">On Duty</option>
        </select>
      </div>
      <p class="mt-2">Status saat ini: <strong>{{ status }}</strong></p>
      <button class="btn btn-primary mt-3" @click="updateProfile">Update Profile</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      employeeId: '', 
      employeeName: '', 
      status: 'free', 
      showAlert: false, // Menyimpan status alert
    };
  },
  created() {
    this.fetchEmployeeData(); // Panggil metode untuk mengambil data karyawan dari database saat komponen dibuat
  },
  methods: {
    fetchEmployeeData() {
      // Contoh fetch data dari server (misalnya menggunakan axios)
      const employeeData = {
        id: '1', 
        name: 'Doni Monardo', 
        status: 'on duty', 
      };

      // Simulasikan pengambilan data dari server
      this.employeeId = employeeData.id;
      this.employeeName = employeeData.name;
      this.status = employeeData.status;
    },
    updateStatus() {
      console.log(`Status kerja karyawan telah diperbarui menjadi: ${this.status}`);
    },
    updateProfile() {
      // Logika untuk memperbarui profil karyawan
      console.log(`Profil karyawan ${this.employeeName} (ID: ${this.employeeId}) telah diperbarui dengan status: ${this.status}`);
      
      // Tampilkan alert
      this.showAlert = true;

      // Hilangkan alert setelah beberapa detik
      setTimeout(() => {
        this.showAlert = false;
      }, 3000);
    },
  },
};
</script>

<style>
.isi {
    max-width: 700px; 
    width: 70%; 
    margin: 0 auto; 
}

.card {
  border-radius: 0.5rem; 
  border: 1px solid #dee2e6; 
}
</style>
