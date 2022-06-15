<template>
       <v-col cols="6" fill-height style="background:lightgreen" class="d-flex flex-column">
          <div id="btns" 
          style="background:orange"
           class="flex-grow-0 flex-shrink-0">Stock {{name}}</div>
          <div id="chart"   
          style="background:lightblue; height=100%"
          class="flex-grow-1 flex-shrink-0">
          <highcharts
          :constructorType="'stockChart'"
          class="hc"
          :options="chartOptions"
          ref="priceGraph"
          :updateArgs="[true, true, true]"
        ></highcharts>
        </div>
          <div id="btns" 
          style="background:orange"
           class="flex-grow-0 flex-shrink-0">
           <buy-sell-bar></buy-sell-bar>
           </div>
          <div id="btns" 
          style="background:orange"
           class="flex-grow-0 flex-shrink-0">
          <info-bar></info-bar>
           </div>
           
        </v-col>
</template>

<script>
const maxPrices = window.max_length;
const startingPrice = window.starting_price;
const tickFrequency = window.tick_frequency;
import BuySellBar from "./BuySellBar";
import InfoBar from "./InfoBar";
import { Chart } from "highcharts-vue";
import { differenceInSeconds, addSeconds, getTime } from "date-fns";
export default {
  components: {
    highcharts: Chart,
    BuySellBar,
    InfoBar,
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
        yAxis: { startOnTick: false, endOnTick: false },
        xAxis: {
          startOnTick: false,
          endOnTick: false,
          showLastLabel: true,
          min: getTime(new Date()),
          max: getTime(addSeconds(new Date(), tickFrequency * maxPrices)),
        },
        navigator: { enabled: false },
        rangeSelector: {
          enabled: false,
          inputEnabled: false,
          selected: 0,
        },
        series: [
          { name: "Stock price", data: [[getTime(new Date()), startingPrice]] },
        ],
      },
      onPause: false,
      counter: 0,
    };
  },
  async mounted() {
    this.stockInterval = setInterval(async () => {
      if (!this.onPause) {
        this.timeInTrade += this.tickFrequency;
        const addendum = _.random(0, 2);
        this.currentPrice += addendum;
        this.counter++;

        this.prices.push(this.currentPrice);

        this.chartOptions.series[0].data.push([
          getTime(new Date()),
          this.currentPrice,
        ]);
      }
    }, this.tickFrequency * 1000);
  },
  methods: {},
};
</script>
