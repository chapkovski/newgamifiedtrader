<template>
  <v-app app>
    <v-app-bar app clipped-left height="100" :style="getMenuStyle">
      <instructions-dialog></instructions-dialog>

      <v-spacer></v-spacer>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main app v-show="true">
      <v-row fill-height style="background:yellow;height:100%" >
        <market name="A"></market>
           <market name="B"></market>
        
      </v-row>
    
    </v-main>
  </v-app>
</template>

<script>
/* eslint-disable */
import icon from "./assets/icon.js";

import { ParticlesBg } from "particles-bg-vue";
import  Market from "./components/Market";


import { differenceInSeconds, addSeconds, getTime } from "date-fns";
import InstructionsDialog from "./components/InstructionsDialog";
import gsap from "gsap";
import _ from "lodash";
import add from "date-fns/fp/add/index.js";

const maxPrices = window.max_length;
const startingPrice = window.starting_price;
const tickFrequency = window.tick_frequency;

const formatDown = {
  color: "red",
  icon: "mdi-arrow-down-bold",
};
const formatUp = {
  color: "green darken-3",
  icon: "mdi-arrow-up-bold",
};
const numToStr = {
  1: "One",
  2: "Two",
  3: "Three",
  4: "Four",
  5: "Five",
  6: "Six",
  7: "Seven",
  8: "Eight",
  9: "Nine",
  10: "Ten",
};
export default {
  name: "App",
  components: {
    Market,
    
    InstructionsDialog,
    ParticlesBg,
  },
  data: function () {
    const minx = Date.UTC(2009, 0, 1);
    const maxx = getTime(addSeconds(new Date(), tickFrequency * maxPrices));

    return {
      gamified: window.gamified,
      training: window.training,

      awardJustGiven: null,
      isAwardGiven: false,
      timeInTrade: 0,

      particle_type: "fountain",
      heartConfig: {
        num: [4, 7],
        rps: 0.1,
        radius: [5, 40],
        life: [1.5, 3],
        v: [2, 3],
        tha: [-30, 30],
        body: icon,
        alpha: [0.6, 0],
        scale: [0.1, 0.4],
        position: "all",
        cross: "dead",
        random: 1,
      },

      sample: {
        colors: ["red", "green", "blue"],
        interval: 3000,
        transition: {
          duration: 1000,
        },
      },
      minx,
      maxx,
      prices: [],
      startingPrice,
      currentPrice: startingPrice,
     
      onPause: false,
      counter: 0,
      startTime: new Date(),
      endTime: null,
      timeSpent: null,
      reset: false,
      messageMoveDelay: 5000,
      dialog: false,
      tweenedPrice: null,
      stockInterval: null,
      
      awardsGiven: [],
      awards: {
        4: {
          id: 0,
          img: "https://cdn0.iconfinder.com/data/icons/business-finance-vol-2-56/512/stock_trader_trade_exchange-256.png",
          name: "Level I",
          brief: "Level I Badge: Trading intern",
          desc: [
            "Level up! Doing well 👍",
            "Way to go -- stay strong! 💎🤲",
            "You are definitely going places! 🙌",
          ],
        },
        9: {
          id: 1,
          img: "https://cdn2.iconfinder.com/data/icons/financial-strategy-20/496/trader-bitcoin-cryptocurrency-investment-businessman-1024.png",
          name: "Level II",
          brief: "Level II Badge: Trading manager",
          desc: [
            "Level up again! You belong on the trading floor 🤑",
            "Nerves of steel: stocks are going strong! 📈",
            "Bulls 🐂 are in the arena. Good job!",
            "Have you ever thought of opening your own trading firm?",
          ],
        },
        19: {
          id: 2,
          img: "https://cdn1.iconfinder.com/data/icons/office-and-internet-3/49/217-512.png",
          name: "Level III",
          brief: "Level III Badge: Money Boss",
          desc: [
            "You are the money-maker! 💰",
            "Diamond hands 💎🤲 Impressive run!",
            "To the moon! 🚀 🚀 🚀",
          ],
        },
      },
    };
  },
  computed: {
    getMenuStyle() {
      return this.training ? { top: "25px" } : null;
    },
    awardTimes() {
      return _.keys(this.awards);
    },

    pconfig() {
      if (this.particle_type == "fountain") return {};
      return this.heartConfig;
    },
    formattedTween() {
      if (this.tweenedPrice) return this.tweenedPrice.toFixed(2);
      return this.currentPrice.toFixed(2);
    },
  },
  watch: {
    dialog(v) {
      this.onPause = v;
    },
  },

 
  methods: {
    tweenUpd(v) {
      this.tweenedPrice = _.round(this.tweenedPrice, 2);
    },

    async sell() {},
  },
};
</script>

<style>
#app {
  background: rgba(0, 0, 0, 0);
  /* font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}

.word-break {
  word-break: break-word;
}

.titlestyle {
  padding-left: 10px;
  margin-left: 20px;
  white-space: pre-wrap;
}

.message {
  padding-left: 10px;
  margin-left: 20px;
  white-space: normal;
  font-family: "Open Sans", sans-serif;
  box-sizing: border-box;
  position: relative;
  max-width: 400px;
  padding: 6px 15px;
  font-size: 12px;
  word-break: break-word;
  color: #fff;
  border: none;
  background-color: rgb(0, 153, 255);
  border-radius: 20px;
}

.listouter1 {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.listouter2 {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  /* flex-direction: column-reverse; */
  overflow-y: scroll;
}

.canvas {
  z-index: 1000;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}

.fade-enter,
.fade-leave-to
/* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.funnyam {
  position: fixed;
  z-index: 1000;
  bottom: 10px;
  right: 10px;
}

.gray {
  filter: gray;
  /* IE6-9 */
  -webkit-filter: grayscale(1);
  /* Google Chrome, Safari 6+ & Opera 15+ */
  filter: grayscale(1);
  /* Microsoft Edge and Firefox 35+ */
}
</style>
