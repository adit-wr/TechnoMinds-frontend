<template>
  <div class="history-list">
    <h2>Riwayat Pengajuan SPK</h2>
    <button @click="print" class="btn btn-primary">
        <i class="bi bi-printer"></i> Cetak Laporan
    </button>
    <div class="table-responsive">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama Karyawan</th>
            <th>Tanggal Pengajuan</th>
            <th>SPK</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="history in histories" :key="history.id">
            <td>{{ history.id }}</td>
            <td>{{ history.namaKaryawan }}</td>
            <td>{{ history.tanggalPengajuan }}</td>
            <td>
              <a :href="history.spkLink" target="_blank">Unduh SPK</a>
            </td>
            <td :class="['status', history.status.toLowerCase()]">
              {{ history.status }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "HistoryList",
  data() {
    return {
      histories: [
        {
          id: 1,
          namaKaryawan: "Doni Monardo",
          tanggalPengajuan: "2024-01-01",
          spkLink: "/path/to/spk1.pdf",
          status: "done",
        },
        {
          id: 2,
          namaKaryawan: "Doni Monardo",
          tanggalPengajuan: "2024-01-02",
          spkLink: "/path/to/spk2.pdf",
          status: "done",
        },
        {
          id: 3,
          namaKaryawan: "Doni Monardo",
          tanggalPengajuan: "2024-01-03",
          spkLink: "/path/to/spk3.pdf",
          status: "done",
        },
        {
          id: 4,
          namaKaryawan: "Doni Monardo",
          tanggalPengajuan: "2024-01-04",
          spkLink: "/path/to/spk4.pdf",
          status: "done",
        },
        {
          id: 5,
          namaKaryawan: "Doni Monardo",
          tanggalPengajuan: "2024-01-05",
          spkLink: "/path/to/spk5.pdf",
          status: "done",
        },
        {
          id: 6,
          namaKaryawan: "Doni Monardo",
          tanggalPengajuan: "2024-01-06",
          spkLink: "/path/to/spk6.pdf",
          status: "done",
        },
      ],
    };
  },
};
</script>

<style scoped>
.history-list {
  width: 82%;
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 8px 0;
}
h2 {
  margin-bottom: 20px;
  color: #080808;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
th,
td {
  border: 1px solid #ddd;
  padding: 12px 15px;
  text-align: left;
}
th {
  background-color: #b6b6b6;
  color: rgb(73, 72, 72);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
.table-responsive {
  width: 100%;
  overflow-x: auto;
}
tr:nth-child(even) {
  background-color: #f2f2f2;
}
tr:hover {
  background-color: #ddd;
}
.status {
  text-transform: capitalize;
  font-weight: bold;
  color: #fff;
  padding: 5px 10px;
  border-radius: 4px;
  text-align: center;
}
.status.done {
  background-color: #5cb85c;
}
</style>
