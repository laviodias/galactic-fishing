<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

interface Player {
  rank: number;
  username: string;
  level: number;
  xp: number;
  gold: number;
  isInfected: boolean;
}

const players = ref<Player[]>([]);
const isLoading = ref(true);
const seeAllPlayers = ref(false);
const displayedPlayers = computed(() => {
  return seeAllPlayers.value ? players.value : players.value.slice(0, 20);
});
const message = ref<string | null>(null);

const fetchLeaderboard = async () => {
  isLoading.value = true;
  message.value = null;

  try {
    const response = await fetch('https://api-game.bloque.app/game/leaderboard');

    if (!response.ok) {
      throw new Error('Failed to fetch leaderboard data');
    }

    const data = await response.json();
    players.value = data.players;

    if (response.status === 0 || response.headers.get('X-From-Cache') === 'true') {
      message.value = 'Leaderboard data loaded from cache.';
    }
  } catch (err) {
    console.error('Error fetching market data:', err);
    message.value = 'Connection failed.';
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchLeaderboard();
});
</script>

<template>
  <div class="space-leaderboard-container relative overflow-hidden">
    <div class="bg-opacity-80 py-8 backdrop-blur-sm shadow-lg border border-indigo-500">
      <h2 class="text-2xl font-bold text-center mb-6 text-cyan-300 font-space">
        <span class="inline-flex items-center">
          <v-icon name="md-leaderboard-round" class="mr-3" />
          Galactic Fishing Leaderboard
        </span>
      </h2>

      <div v-if="isLoading" class="text-center py-8">
        <div class="loading-spinner inline-block animate-spin rounded-full h-8 w-8 border-t-2 border border-cyan-400"></div>
        <p class="text-cyan-300 mt-2">Fetching data from the starfish...</p>
      </div>

      <div v-else-if="players.length === 0" class="text-center py-8">
        <p class="text-cyan-300">The leaderboard is compromised. Sorry, check back later...</p>
      </div>

      <div v-else class="overflow-auto px-4">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-opacity-60">
              <th class="py-3 px-4 text-left text-cyan-300 rounded-tl-lg">Rank</th>
              <th class="py-3 px-4 text-left text-cyan-300">Player</th>
              <th class="py-3 px-4 text-left text-cyan-300">Level</th>
              <th class="py-3 px-4 text-left text-cyan-300">XP</th>
              <th class="py-3 px-4 text-left text-cyan-300 rounded-tr-lg">Gold</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(player, index) in displayedPlayers"
                :key="player.username"
                :class="[
                  index % 2 === 0 ? 'bg-opacity-30' : 'bg-opacity-50',
                  index === 0 ? 'border-yellow-400' : '',
                  index === 1 ? 'border-gray-300' : '',
                  index === 2 ? 'border-amber-700' : ''
                ]"
                class="leaderboard-row transition-colors duration-300">
              <td class="py-3 px-4">
                <div class="flex items-center">
                  <span v-if="player.rank <= 3" class="rank-icon mr-2">
                    <span v-if="player.rank === 1" class="font-bold text-yellow-400">👑</span>
                    <span v-else-if="player.rank === 2" class="font-bold text-gray-300">🥈</span>
                    <span v-else-if="player.rank === 3" class="font-bold text-amber-700">🥉</span>
                  </span>
                  <span :class="player.rank <= 3 ? 'font-bold' : ''">{{ player.rank }}º</span>
                </div>
              </td>
              <td class="py-3 px-4">
                {{ player.username }}
                <span v-if="player.isInfected">
                  <v-icon name="fa-radiation-alt" class="ml-2 text-cyan-300" />
                </span>
              </td>
              <td class="py-3 px-4 flex justify-center">
                <div class="level-badge bg-indigo-900 text-cyan-300 py-1 px-3 rounded-full text-xs">Lv. {{ player.level }}</div>
              </td>
              <td class="py-3 px-4">
                <div class="xp-container flex items-center">
                  <v-icon name="bi-lightning-charge-fill" class="h-4 w-4 mr-1 text-indigo-300" />
                  {{ Intl.NumberFormat('en-US').format(player.xp) }}
                </div>
              </td>
              <td class="py-3 px-4">
                <div class="gold-container flex items-center">
                  <v-icon name="ri-money-dollar-circle-fill" class="gold-icon h-4 w-4 text-yellow-400 mr-1" />
                  {{ Intl.NumberFormat('en-US').format(player.gold) }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="message" class="error-message mt-4 text-sm text-white bg-opacity-30 bg-red-600 p-3 rounded-lg">
        {{ message }}
      </div>

      <div class="actions-container mt-6 text-center flex justify-center gap-4">
        <button
          @click="fetchLeaderboard"
          class="inline-flex items-center cursor-pointer py-1 px-3 text-white rounded-lg transition-colors bg-opacity-60 duration-300 hover:bg-indigo-700">
          <v-icon name="hi-refresh" class="mr-2" />
          Refresh
        </button>

        <button
          @click="seeAllPlayers = !seeAllPlayers"
          class="inline-flex items-center cursor-pointer py-3 px-3 text-white rounded-lg transition-colors bg-opacity-60 duration-300 hover:bg-indigo-700">

          <v-icon v-if="seeAllPlayers" name="gi-podium" class="mr-2" />
          <v-icon v-else name="la-globe-solid" class="mr-2" />

          {{ seeAllPlayers ? 'See top 20' : 'See all players' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.space-leaderboard-container {
  position: relative;
  overflow: hidden;

  .inline-flex {
    @media (max-width: 768px) {
      display: initial;
    }
  }
}

.loading-spinner {
  height: 2rem;
  width: 2rem;
  border-top: 2px solid #22d3ee;
  border-bottom: 2px solid #22d3ee;
  border-left: 2px solid transparent;
  border-right: 2px solid transparent;
}

.leaderboard-row {
  transition: background-color 0.2s ease-in-out;
}

.leaderboard-row:hover {
  background-color: rgba(55, 65, 81, 0.5);
}

.rank-icon {
  margin-right: 0.5rem;
}

.level-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 999px;
  font-size: 0.75rem;
  width: max-content;
}

.xp-container {
  display: flex;
  align-items: center;
}

.xp-icon {
  height: 1rem;
  width: 1rem;
  margin-right: 0.25rem;
}

.gold-container {
  display: flex;
  align-items: center;
}

.gold-icon {
  height: 1rem;
  width: 1rem;
  margin-right: 0.25rem;
}
</style>