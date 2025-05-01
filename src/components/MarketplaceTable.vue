<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface MarketItem {
  id: string;
  name: string;
  type: string;
  description: string;
  cost: number;
}

const items = ref<MarketItem[]>([]);
const isLoading = ref(true);
const message = ref<string | null>(null);

const fetchMarketItems = async () => {
  isLoading.value = true;
  message.value = null;

  try {
    const response = await fetch('https://api-game.bloque.app/game/market');

    if (!response.ok) {
      throw new Error('Failed to fetch market data');
    }

    const data = await response.json();
    items.value = data.items;

    if (!navigator.onLine) {
      message.value = 'Market data loaded from cache.';
    } else {
      message.value = null;
    }
  } catch (err) {
    message.value = 'Connection failed.';
  } finally {
    isLoading.value = false;
  }
};

const getItemTypeClass = (type: string) => {
  switch (type) {
    case 'fishing_rod':
      return 'bg-blue-600 bg-opacity-20';
    case 'poison_leveling':
      return 'bg-purple-600 bg-opacity-20';
    case 'poison_delay':
      return 'bg-red-600 bg-opacity-20';
    case 'poison_recovery':
      return 'bg-green-600 bg-opacity-20';
    default:
      return 'bg-gray-600 bg-opacity-20';
  }
};

const formatItemType = (type: string) => {
  return type
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

onMounted(() => {
  fetchMarketItems();
});
</script>

<template>
  <div class="space-market-container relative overflow-hidden">
    <div class="bg-opacity-80 py-8 backdrop-blur-sm shadow-lg border border-indigo-500">
      <h2 class="text-2xl font-bold text-center mb-6 text-cyan-300 font-space">
        <span class="inline-flex items-center">
          <v-icon name="fa-shopping-basket" class="mr-3" />
          Market
        </span>
      </h2>

      <div v-if="isLoading" class="text-center py-8">
        <div class="loading-spinner inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-400"></div>
        <p class="text-cyan-300 mt-2">Scanning interstellar bazaars...</p>
      </div>

      <div v-else-if="items.length === 0" class="text-center py-8">
        <p class="text-cyan-300">The market appears to be empty. Check back later!</p>
      </div>

      <div v-else class="grid-container grid grid-cols gap-4">
        <div
          v-for="item in items"
          :key="item.id"
          class="rounded-lg border border-indigo-700 overflow-hidden"
          :class="getItemTypeClass(item.type)"
        >
          <div class="item-header flex items-center p-4">
            <div class="item-icon mr-3 text-white">
              <v-icon :name="item.type == 'fishing_rod' ? 'gi-fishing-pole' : 'gi-poison-bottle'" />
            </div>
            <div class="flex-1">
              <h3 class="font-medium text-white">{{ item.name }}</h3>
              <div class="text-xs">{{ formatItemType(item.type) }}</div>
            </div>
            <div class="item-cost flex items-center bg-opacity-80 py-1 px-3 rounded-full">
              <v-icon name="ri-money-dollar-circle-fill" class="h-4 w-4 text-yellow-400 mr-1" />
              <span class="font-medium text-sm text-yellow-300">{{ item.cost.toLocaleString() }}</span>
            </div>
          </div>
          <div class="item-description p-4 text-sm text-gray-300">
            {{ item.description }}
          </div>
        </div>
      </div>

      <div v-if="message" class="error-message mt-4 text-sm bg-opacity-30 bg-red-600 text-white p-3 rounded-md">
        {{ message }}
      </div>

      <div class="actions-container mt-6 text-center">
        <button
          @click="fetchMarketItems"
          class="inline-flex items-center">
          <v-icon name="hi-refresh" class="mr-2" />
          Refresh
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.space-market-container {
  position: relative;
  overflow: hidden;
}

.loading-spinner {
  height: 2rem;
  width: 2rem;
  border-top: 2px solid #22d3ee;
  border-bottom: 2px solid #22d3ee;
  border-left: 2px solid transparent;
  border-right: 2px solid transparent;
}

.item-header {
  display: flex;
  align-items: center;
  padding: 1rem;
}

.item-icon {
  margin-right: 0.75rem;
  color: #fff;

  svg {
    width: 2rem;
    height: 2rem;
  }
}

.item-cost {
  display: flex;
  align-items: center;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}

.item-description {
  padding: 1rem;
}
</style>