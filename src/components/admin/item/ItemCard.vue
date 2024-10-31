<template>
  <div class="item-table">
    <table>
      <thead>
        <tr>
          <th>Nama</th>
          <th>Deskripsi</th>
          <th>Stok</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td data-label="Nama">{{ item.name }}</td>
          <td data-label="Deskripsi">{{ item.deskripsi }}</td>
          <td data-label="Stok" class="stock">{{ item.stok }}</td>
          <td data-label="Aksi">
            <button @click="$emit('edit-item', item)" class="edit">Edit</button>
            <button @click="$emit('delete-item', item.kode)" class="delete">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "ItemTable",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.item-table {
  width: 100%;
  overflow-x: auto;
  margin-bottom: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
}

td[data-label]::before {
  content: attr(data-label);
  font-weight: bold;
  color: #333;
  display: none;
}

.stock {
  font-weight: bold;
  color: #2c3e50;
}

button {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-right: 5px;
}

button.edit {
  background-color: #4caf50;
  color: white;
}

button.edit:hover {
  background-color: #45a049;
}

button.delete {
  background-color: #e74c3c;
  color: white;
}

button.delete:hover {
  background-color: #c0392b;
}

/* Responsif untuk tampilan mobile */
@media (max-width: 768px) {
  table, thead, tbody, th, td, tr {
    display: block;
  }

  th {
    display: none;
  }

  td {
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid #ddd;
  }

  td[data-label]::before {
    display: inline-block;
  }
}
</style>
