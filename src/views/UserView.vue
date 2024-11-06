// src/views/UserView.vue
<script>
import ItemList from '@/components/user/item/ItemList.vue'  
import Transaction from '@/components/user/transaction/Transaction.vue'  
import PengajuanSpk from '@/components/user/transaction/PengajuanSpk.vue'  
import HistoryList from '@/components/user/history/HistoryList.vue'
//import HomeUser from '/components/user/home/HomeUser.vue'

export default {
  name: 'UserView',
  components: {
    ItemList,
    Transaction,
    PengajuanSpk,
    HistoryList,
    //HomeUser
  },
  props: {
    currentComponent: {
      type: String,
      required: true
    }
  }
}
</script>

<template>
  <div class="user-view">
    <!-- Tampilan Home
    <div v-if="currentComponent === 'HomeUser'">
      <div class="component-container">
        <HomeUser />
      </div>
    </div>
     -->

    <!-- Tampilan Item -->
    <div v-if="currentComponent === 'items'">
      <div class="component-container">
        <ItemList />
      </div>
    </div>

    <!-- Transaksi -->
    <div v-if="currentComponent === 'transactions'">
      <div class="component-container">
        <Transaction />
      </div>
    </div>

    <!-- Riwayat -->
    <div v-if="currentComponent === 'history'">
      <div class="component-container">
        <HistoryList />
      </div>
    </div>

    <!-- PengajuanSpk -->
    <div v-if="currentComponent === 'PengajuanSpk'">
      <div class="component-container">
        <PengajuanSpk />
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-view {
  width: 100%;
  padding: 20px;
  margin-top: 60px; 
  margin-left: 240px; 
  min-height: calc(100vh - 60px);
  background-color: #f5f5f5;
}

.component-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 20px;
  height: 100%;
}

@media (max-width: 576px) {
  .user-view {
    margin-left: 0; 
    padding: 15px;
  }

  .component-container {
    padding: 15px;
  }
}
</style>