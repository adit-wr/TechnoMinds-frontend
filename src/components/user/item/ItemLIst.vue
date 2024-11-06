<template>
    <div class="item-list">
        <div class="card">
            <div class="header d-flex justify-content-between align-items-center">
                <h2>Daftar Master Data Barang</h2>
            </div>
            <table class="table table-bordered mt-3">
                <thead class="table-light">
                    <tr>
                        <th>Nama</th>
                        <th>Deskripsi</th>
                        <th>Stok</th>
                        <th>Harga</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in items" :key="item.id">
                        <td>{{ item.name }}</td>
                        <td>{{ item.deskripsi }}</td>
                        <td>{{ item.stok }}</td>
                        <td>{{ item.price }}</td>
                    </tr>
                </tbody>
            </table>
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
/* Card styling */
.card {
    width: 82%;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
}

.header {
    margin-bottom: 20px;
}

/* Button styling for table actions */
.btn {
    margin-right: 5px;
}

/* Tabel styling adjustments */
.table {
    width: 100%;
    margin-top: 20px;
}

.table th, .table td {
    text-align: left;
}

.table-light th {
    background-color: #f2f2f2;
}
</style>
