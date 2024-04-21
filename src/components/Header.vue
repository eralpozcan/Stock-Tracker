<template>
  <Toolbar>
    <template #start>
      <router-link to="/">
        <img src="/src/assets/logo.png" width="42px" height="42px" alt="Stock Tracker Logo">
      </router-link>
    </template>

    <template #center v-if="isLoggedIn">
      <AutoComplete v-model="selectedStock" optionLabel="symbol" :delay="500" placeholder="Search to Stock" dropdown :suggestions="stocksData" @complete="getSearchStock">
        <template #option="slotProps">
          <div class="flex flex-wrap flex-column p-p-2">
            <span class="font-bold m-1">{{ slotProps.option.instrument_name }}</span>
            <span class="m-1 text-400">{{ slotProps.option.symbol }}</span>
            <span class="m-1 text-400">{{ slotProps.option.country }}</span>
          </div>
        </template>
        <template #dropdownicon>
          <i class="pi pi-search"></i>
        </template>
      </AutoComplete>
    </template>

    <template #end>
      <Button v-if="!isLoggedIn" label="Login" @click="login" />
      <Button icon="pi pi-sun" severity="secondary" text aria-label="Mode" />
      <Avatar v-if="isLoggedIn" image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle"
        @click="toggle" aria-controls="overlay_tmenu" aria-haspopup="true" />
      <TieredMenu ref="menu" id="overlay_tmenu" :model="items" popup />
    </template>
  </Toolbar>
</template>

<script setup>
import { ref ,computed,watch} from "vue";
import { useRouter } from 'vue-router';
import { useSessionStore } from '@/stores/session';

import useStockService from '@/services/stockService';

const router = useRouter()
const sessionStore = useSessionStore()
const menu = ref()
const items = ref([
  {
    label: 'Dashboard',
    icon: 'pi pi-home',
    command: () => {
      router.push("/dashboard");
    }
  },
  {
    separator: true
  },
  {
    label: 'Quit',
    icon: 'pi pi-sign-out',
    command: () => {
      logout();
    }
  }
])
const selectedStock = ref('')
const stocksData = ref([])

const isLoggedIn = computed(() => {
  return sessionStore.isLoggedIn;
})

function toggle(event) {
  menu.value.toggle(event);
}

function logout() {
  sessionStore.logout();
}

function login() {
  sessionStore.login();
}

function getSearchStock(event) {
  const searchStock = event.query.trim();
  useStockService.searchStocks(searchStock).then((response) => {
    stocksData.value = response;
  });
}

watch(() => selectedStock.value, (value) => {
  setTimeout(() => {
    if (value.symbol) {
      router.push(`/symbol/${value.symbol}`);
      selectedStock.value = '';
    }
  }, 250);
});

</script>
