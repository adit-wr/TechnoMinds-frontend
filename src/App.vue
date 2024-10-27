<template>
  <div id="app">
    <Header 
      :current-role="currentRole"
      :is-sidebar-visible="isSidebarVisible"
      @toggle-sidebar="toggleSidebar"
      @update-role="updateRole"
      @search="handleSearch"
    />
    
    <Sidebar 
      :current-role="currentRole"
      :is-sidebar-visible="isSidebarVisible"
      @show-component="showComponent"
    />
    
    <main :class="['main-content', { 'sidebar-visible': isSidebarVisible }]">
      <component :is="currentComponent"></component>
    </main>

    <Footer @show-component="showComponent" />
  </div>
</template>

<script>
import Header from './components/dashboard/Header.vue'
import Sidebar from './components/dashboard/Sidebar.vue'
import Footer from './components/dashboard/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Sidebar,
    Footer
  },
  data() {
    return {
      currentRole: 'user',
      isSidebarVisible: true,
      currentComponent: 'items',
      searchQuery: ''
    }
  },
  methods: {
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible
    },
    updateRole(role) {
      this.currentRole = role
      this.currentComponent = 'items'
    },
    showComponent(componentName) {
      this.currentComponent = componentName
    },
    handleSearch(query) {
      this.searchQuery = query
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  padding: 90px 20px 20px;
  margin-left: 0;
  transition: margin-left 0.3s ease;
  min-height: calc(100vh - 70px);
  background-color: #f8f9fa;
  flex: 1;
}

.main-content.sidebar-visible {
  margin-left: 250px;
}

/* Responsive Styles */
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

/* Reset default styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Font Awesome */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
</style>dashboard/