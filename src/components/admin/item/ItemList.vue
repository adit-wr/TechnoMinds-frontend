<template>
    <div class="item-list">
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h2>Daftar Master Data Barang</h2>
                <button @click="showAddForm" class="btn btn-primary">
                    <i class="bi bi-clipboard2-plus"></i> Tambah Item
                </button>
            </div>
            <div class="card-body">
                <table class="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Nama</th>
                            <th>Deskripsi</th>
                            <th>Stok</th>
                            <th>Harga</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in items" :key="item.id">
                            <td>{{ item.name }}</td>
                            <td>{{ item.deskripsi }}</td>
                            <td>{{ item.stok }}</td>
                            <td>{{ item.price }}</td>
                            <td>
                                <button @click="editItem(item)" class="btn btn-warning btn-sm">
                                    <i class="bi bi-pencil-square"></i> Edit
                                </button>
                                <button @click="deleteItem(item.id)" class="btn btn-danger btn-sm">
                                    <i class="bi bi-trash3"></i> Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
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
import Modal from '@/components/Modal.vue';
import ItemForm from './ItemForm.vue';

export default {
    components: {
        ItemForm,
        Modal
    },
    data() {
        return {
            items: [
                { id: 1, name: 'Benang Poliéster', deskripsi: 'Benang berkualitas tinggi untuk menjahit', stok: 500, price: 'Rp 100.000' },
                { id: 2, name: 'Kain Katun', deskripsi: 'Kain katun untuk pembuatan pakaian', stok: 200, price: 'Rp 250.000' },
                { id: 3, name: 'Kain Spandex', deskripsi: 'Kain elastis untuk pakaian olahraga', stok: 150, price: 'Rp 300.000' },
                { id: 4, name: 'Kain Satin', deskripsi: 'Kain satin untuk busana formal', stok: 100, price: 'Rp 500.000' },
                { id: 5, name: 'Dye (Pewarna)', deskripsi: 'Pewarna tekstil untuk memberikan warna pada kain', stok: 300, price: 'Rp 50.000' },
                { id: 6, name: 'Bahan Pelapis', deskripsi: 'Bahan untuk pelapisan kain', stok: 250, price: 'Rp 200.000' },
                { id: 7, name: 'Furnitur Mesin Jahit', deskripsi: 'Peralatan untuk memproduksi pakaian', stok: 20, price: 'Rp 15.000.000' },
                { id: 8, name: 'Pita Pengukur', deskripsi: 'Alat untuk mengukur ukuran kain', stok: 50, price: 'Rp 15.000' },
                { id: 9, name: 'Benang Jahit', deskripsi: 'Benang untuk mesin jahit', stok: 1000, price: 'Rp 10.000' },
                { id: 10, name: 'Kain Non-Woven', deskripsi: 'Kain untuk produk tas dan kemasan', stok: 150, price: 'Rp 300.000' },
            ],
            showForm: false,
            selectedItem: null,
            isEdit: false
        };
    },
    methods: {
        showAddForm() {
            this.selectedItem = { id: "", name: "", deskripsi: "", stok: "", price: "" };
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
                const index = this.items.findIndex((i) => i.id === item.id);
                if (index !== -1) {
                    this.items.splice(index, 1, item);
                }
            } else {
                item.id = Date.now(); // Assign unique ID for new items
                this.items.push(item);
            }
            this.showForm = false;
            this.selectedItem = null;
            this.isEdit = false;
        },
        cancelEditForm() {
            this.showForm = false;
            this.isEdit = false;
            this.selectedItem = null;
        },
        deleteItem(id) {
            this.items = this.items.filter(item => item.id !== id);
        }
    }
};
</script>

<style scoped>
.item-list{
    width:82%;
}
/* Tabel styling */
.table {
    width: 100%;
    margin-top: 20px;
}
</style>
