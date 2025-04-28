import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { GiSpaceship, MdLeaderboardRound, FaShoppingBasket, FaShoppingCart, RiMoneyDollarCircleFill, BiLightningChargeFill, FaRadiationAlt, GiPoisonBottle, GiFishingPole, HiRefresh, GiPodium, LaGlobeSolid } from "oh-vue-icons/icons";
import { OhVueIcon, addIcons } from "oh-vue-icons";

addIcons(GiSpaceship, MdLeaderboardRound, FaShoppingBasket, FaShoppingCart, RiMoneyDollarCircleFill, BiLightningChargeFill, FaRadiationAlt, GiPoisonBottle, GiFishingPole, HiRefresh, GiPodium, LaGlobeSolid);

const app = createApp(App)
app.component("v-icon", OhVueIcon);
app.mount('#app')