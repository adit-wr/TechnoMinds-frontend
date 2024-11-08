<template>
  <div id="app">
    <Header
      :currentRole="currentRole"
      @update-role="updateRole"
      @toggle-sidebar="toggleSidebar"
      :isSidebarVisible="isSidebarVisible"
    />

    <div class="app-content">
      <Sidebar
        :currentRole="currentRole"
        :isSidebarVisible="isSidebarVisible"
        @showComponent="navigateTo"
      />

      <div class="main-content" :class="{ expanded: isSidebarVisible }">
        <router-view
          :key="$route.fullPath"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./components/dashboard/Header.vue";
import Sidebar from "./components/dashboard/Sidebar.vue";
import EventBus from "./utils/EventBus"; 

export default {
  components: {
    Header,
    Sidebar,
  },

  data() {
    return {
      currentRole: this.$route.name || "admin",
      isSidebarVisible: true,
      searchTerm: "",
    };
  },

  watch: {
    "$route.name"(newRole) {
      this.currentRole = newRole;
    },
  },

  computed: {
    currentView() {
      return this.currentRole === "admin" ? AdminView : UserView;
    },
  },

  methods: {
    updateRole(role) {
      this.currentRole = role;
      this.navigateTo("items");
    },

    navigateTo(component) {
      this.$router.push({ name: this.currentRole, params: { component } });
    },

    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
    },

    handleSearch(newQuery) {
      console.log("Search term:", newQuery);

      if (this.currentRole === "admin") {
        console.log("Search in admin items");
      } else if (this.currentRole === "user") {
        console.log("Search in user items");
      }
    },
  },

  mounted() {
    // Pastikan EventBus.on tersedia sebelum digunakan
    if (EventBus && typeof EventBus.on === 'function') {
      EventBus.on("search", this.handleSearch);
    }
  },

  beforeUnmount() {
    // Pastikan EventBus.off tersedia sebelum digunakan
    if (EventBus && typeof EventBus.off === 'function') {
      EventBus.off("search", this.handleSearch);
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.main-content {
  padding: 90px 20px 20px;
  background-color: #f8f9fa;
  flex: 1;
  transition: margin-left 0.3s ease;
}
.content-expanded {
  margin-left: 0;
}
.sidebar-visible {
  margin-left: 250px;
}
@media (max-width: 768px) {
  .main-content.sidebar-visible {
    margin-left: 200px;
  }
}
@media (max-width: 576px) {
  .main-content {
    padding: 90px 10px 20px;
  }
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
