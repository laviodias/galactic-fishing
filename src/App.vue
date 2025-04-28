<script setup lang="ts">
import { ref } from 'vue';
import LeaderboardTable from './components/LeaderboardTable.vue';
import MarketplaceTable from './components/MarketplaceTable.vue';

const activeTab = ref('leaderboard');

const setTab = (tab: string) => {
  activeTab.value = tab;
};

const isOnline = ref(navigator.onLine);

const updateOnlineStatus = () => {
  isOnline.value = navigator.onLine;
};

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);
</script>

<template>
  <div class="cosmic-app">
    <header class="cosmic-header">
      <div class="container mx-auto px-4 py-6">
        <div class="header-content">
          <h1 class="app-title font-bold text-cyan-300 font-space flex items-center">
            <v-icon name="gi-spaceship" class="app-icon" />
            <span>Galactic Fishing</span>
          </h1>

          <div class="network-status flex items-center rounded-full text-sm" :class="{ 'online': isOnline, 'offline': !isOnline }">
            <span class="status-indicator"></span>
            <span class="status-text">{{ isOnline ? 'Online' : 'Offline Mode' }}</span>
          </div>
        </div>
      </div>
    </header>

    <main class="main-content container mx-auto p-4">
      <div>
        <nav class="tabs-list flex border-b border-indigo-800">
          <button
            @click="setTab('leaderboard')"
            :class="[
              'tab-button bg-opacity-60 py-3 px-6 font-medium text-lg focus:outline-none cursor-pointer mr-1',
              activeTab === 'leaderboard'
                ? 'tab-active border border-cyan-400 text-cyan-300'
                : 'text-white hover:text-cyan-200'
            ]"
          >
            <div class="tab-item flex items-center">
              <v-icon name="md-leaderboard-round" class="tab-icon" />
              <span>Leaderboard</span>
            </div>
          </button>
          <button
            @click="setTab('marketplace')"
            :class="[
              'tab-button bg-opacity-60 py-3 px-6 font-medium text-lg focus:outline-none cursor-pointer',
              activeTab === 'marketplace'
                ? 'tab-active border border-cyan-400 text-cyan-300'
                : 'text-white hover:text-cyan-200'
            ]"
          >
            <div class="tab-item flex items-center">
              <v-icon name="fa-shopping-basket" class="tab-icon" />
              <span>Market</span>
            </div>
          </button>
        </nav>
      </div>

      <section>
        <Transition name="fade" mode="out-in">
          <template v-if="activeTab === 'leaderboard'">
            <LeaderboardTable />
          </template>
          <template v-else-if="activeTab === 'marketplace'">
            <MarketplaceTable />
          </template>
        </Transition>
      </section>
    </main>

    <footer class="app-footer mt-12 pb-6 text-center text-sm text-indigo-300">
      <p class="mb-2">Created by Lavio Vale</p>
      <p>GalacticFishing &copy; 2025 • The Ultimate Intergalactic Fishing Adventure</p>
    </footer>
  </div>
</template>

<style scoped>
.cosmic-app {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f2d, #1a1b4b, #0f0f2d);
  color: #e2e8f0;
}

.cosmic-header {
  background-color: rgba(26, 27, 75, 0.7);
  border-bottom: 1px solid rgba(99, 102, 241, 0.3);
}

.container {
  max-width: 1280px;
}

.header-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 768px) {
    flex-direction: row;
  }
}

.app-title {
  display: flex;
  align-items: center;

  @media (min-width: 768px) {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
}

.app-icon {
  height: 2.5rem;
  width: 2.5rem;
  margin-right: 0.75rem;
}

.network-status {
  display: flex;
  align-items: center;
  border-radius: 9999px;
  padding: 0.5rem 1rem;

  @media (max-width: 768px) {
    display: none;
  }
}
.network-status.online {
  background-color: rgba(16, 185, 129, 0.1);
  color: #10b981;
}
.network-status.offline {
  background-color: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.status-indicator {
  height: 0.5rem;
  width: 0.5rem;
  border-radius: 50%;
  margin-right: 0.5rem;
}
.network-status.online .status-indicator {
  background-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
}
.network-status.offline .status-indicator {
  background-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
}

.main-content {
  max-width: 1280px;
}

.tabs-list {
  display: flex;
  border-bottom: 1px solid #374151; /* border-indigo-800 */
}

.tab-button {
  outline: none;
  cursor: pointer;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  transition: color 0.15s ease-in-out;
}

.tab-item {
  display: flex;
  align-items: center;
}

.tab-icon {
  height: 1.25rem;
  width: 1.25rem;
  margin-right: 0.5rem;
}

.app-footer {
  margin-top: 3rem;
  padding-bottom: 1.5rem;
  text-align: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>