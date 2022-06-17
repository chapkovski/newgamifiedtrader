<template>
  <v-col
    cols="6"
    fill-height
    style="background: lightgreen"
    class="d-flex flex-column"
  >
    <div id="btns" style="background: orange" class="flex-grow-0 flex-shrink-0">
      Stock {{ name }}.
      <pill label="Current price" :value="market.currentPrice"></pill>
    </div>
    <div
      id="chart"
      style="background:lightblue; height=100%"
      class="flex-grow-1 flex-shrink-0"
    >
      <highcharts
        :constructorType="'stockChart'"
        class="hc"
        :options="chartOptions"
        ref="priceGraph"
        :updateArgs="[true, true, true]"
      ></highcharts>
    </div>
    <div id="btns" style="background: orange" class="flex-grow-0 flex-shrink-0">
      <buy-sell-bar
        :market="market"
        @sell="sellClicked"
        @buy="buyClicked"
      ></buy-sell-bar>
    </div>
    <div id="btns" style="background: orange" class="flex-grow-0 flex-shrink-0">
      <info-bar :market="market"></info-bar>
    </div>
  </v-col>
</template>

<script>
const maxPrices = window.max_length;
const startingPrice = window.starting_price;
const tickFrequency = window.tick_frequency;
import BuySellBar from "./BuySellBar";
import InfoBar from "./InfoBar";
import Pill from "./Pill";
import { Chart } from "highcharts-vue";
import { differenceInSeconds, addSeconds, getTime } from "date-fns";
import { mapMutations, mapActions, mapGetters } from "vuex";
export default {
  components: {
    highcharts: Chart,
    BuySellBar,
    InfoBar,
    Pill,
  },
  props: ["name"],
  data() {
    const minx = Date.UTC(2009, 0, 1);
    const maxx = getTime(addSeconds(new Date(), tickFrequency * maxPrices));

    return {
      minx,
      maxx,
      prices: [],
      startingPrice,
      tickFrequency: window.tick_frequency,
      currentPrice: startingPrice,
      chartOptions: {
        time: { useUTC: false },
        rangeSelector: { enabled: true, inputEnabled: false },
        navigator: { enabled: false },
        credits: { enabled: false },
        series: [
          {
            name: "Stock price",
            data: [
              // [new Date().getTime(), 1],
              // [new Date().getTime()+1000, 2],
              // [new Date().getTime()+2000, 1.5],
            ],
          },
        ],
      },

      onPause: false,
      counter: 0,
    };
  },
  computed: {
    ...mapGetters(["getMarket"]),
    market() {
      return this.getMarket(this.name);
    },
  },
  async mounted() {
    this.chartOptions.series[0].data = this.market.prices;
    // this.stockInterval = setInterval(async () => {
    //   if (!this.onPause) {
    //     this.timeInTrade += this.tickFrequency;

    //     this.currentPrice = _.random(0, 10);
    //     this.setPrice({ market: this.name, value: this.currentPrice });
    //   }
    // }, this.tickFrequency * 1000);
  },
  methods: {
    ...mapMutations(["SET_MARKET_PROPERTY"]),
    ...mapActions(["setPrice", "purchase", "sell"]),
    sellClicked() {
      this.sell({ market: this.name });
    },
    buyClicked() {
      this.purchase({ market: this.name });
    },
  },
};
</script>
