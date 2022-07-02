import Vue from "vue";
import Vuex from "vuex";
import awards from "./awards";
import _ from "lodash";
import { differenceInSeconds, addSeconds, getTime } from "date-fns";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    startTime: new Date(),
    showPredictionAt: 10,
    isAwardGiven: false,
    awardGiven: {},
    training: window.training || false,
    gamified: window.gamified,
    transactionCounter: 0,
    awardTrades: [1, 2, 3, 4, 5],
    awards,
    counter: window.counter || 0,
    cash: 50,
    pause: false,
    marketA: {
      name: "A",
      currentPrice: 100,
      initialPrices: window.initialPricesA,
      prices: [100],
      shares: 1,
      purchasePrice: 100,
      profit: 0,
      priceDynamicCounter: 0,
    },
    marketB: {
      name: "B",
      currentPrice: 100,
      initialPrices: window.initialPricesB,
      prices: [[new Date().getTime(), 100]],
      shares: 1,
      purchasePrice: 100,
      profit: 0,
      priceDynamicCounter: 0,
    },
    socket: {
      isConnected: false,
      message: "",
      reconnectError: false,
    },
  },
  mutations: {
    SET_START_TIME(state) {
      state.startTime = new Date();
    },
    UNLOCK_AWARD(state, ind) {
      state.awards[ind].lock = false;
    },
    INCREASE_TRANSACTION_COUNTER(state) {
      state.transactionCounter++;
    },
    INCREASE_COUNTER(state) {
      state.counter++;
    },
    SET_MARKET_PROPERTY(state, { market, key, value }) {
      state[`market${market}`][key] = value;
    },
    ADD_PRICE_TO_HISTORY(state, { market, value }) {
      state[`market${market}`].prices.push(value);
    },
    UPDATE_PRICE(state, { market, value }) {
      state[`market${market}`].currentPrice = value;
    },
    UPDATE_PROFIT(state, { market, profit }) {
      state[`market${market}`].profit = profit;
    },
    SELL_SHARE(state, { market }) {
      state[`market${market}`].shares = 0;
    },
    BUY_SHARE(state, { market }) {
      state[`market${market}`].shares = 1;
    },
    SET_PURCHASE_PRICE(state, { market, value }) {
      state[`market${market}`].purchasePrice = value;
    },
    UPDATE_DYNAMIC_COUNTER(state, { market, value }) {
      state[`market${market}`].priceDynamicCounter = value;
    },
    PAUSE(state) {
      state.pause = true;
    },
    UNPAUSE(state) {
      state.pause = false;
    },
    UPDATE_CASH(state, { value }) {
      state.cash += value;
    },
    SWITCH_GAMIFICATION(state) {
      state.gamified = !state.gamified;
    },
    AWARD_SHOW(state) {
      state.isAwardGiven = true;
    },
    AWARD_HIDE(state) {
      state.isAwardGiven = false;
    },
    PROVIDE_GIVEN_AWARD(state, award) {
      state.awardGiven = award;
    },
    // SOCKET MUTATIONS
    SOCKET_ONOPEN(state, event) {
      Vue.prototype.$socket = event.currentTarget;

      state.socket.isConnected = true;
    },
    SOCKET_ONCLOSE(state, event) {
      state.socket.isConnected = false;
    },
    SOCKET_ONERROR(state, event) {
      console.error(state, event);
    },
    // default handler called for all methods
    SOCKET_ONMESSAGE(state, message) {
      state.socket.message = message;
      console.debug("MESSAGE", message);
    },
    // mutations for reconnect methods
    SOCKET_RECONNECT(state, count) {
      console.info(state, count);
    },
    SOCKET_RECONNECT_ERROR(state) {
      state.socket.reconnectError = true;
    },
  },
  actions: {
    getServerConfirmation(context, i) {
      console.debug(i);
    },
    giveAward({ commit, state }) {
      const ind = state.awardTrades.indexOf(state.transactionCounter);
      if (ind >= 0) {
        const award = state.awards[ind];
        commit("UNLOCK_AWARD", ind);
        commit("PROVIDE_GIVEN_AWARD", award);
      }
    },
    async nextTick({ commit, dispatch, state, getters }) {
      commit("INCREASE_COUNTER");
      const marketA = getters.getMarket("A");
      const marketB = getters.getMarket("B");
      const priceA = marketA.initialPrices[state.counter];
      const priceB = marketB.initialPrices[state.counter];
      dispatch("setPrice", { market: "A", value: priceA });
      dispatch("setPrice", { market: "B", value: priceB });
      commit("UNPAUSE");
    },
    setPrice({ commit, getters }, { market, value }) {
      const currentMarket = getters.getMarket(market);
      const { shares, purchasePrice, currentPrice, priceDynamicCounter } =
        currentMarket;
      const priceDiff = value - currentPrice;
      if (priceDiff >= 0 && priceDynamicCounter >= 0) {
        commit("UPDATE_DYNAMIC_COUNTER", {
          market,
          value: priceDynamicCounter + 1,
        });
      } else if (priceDiff < 0 && priceDynamicCounter < 0) {
        commit("UPDATE_DYNAMIC_COUNTER", {
          market,
          value: priceDynamicCounter - 1,
        });
      } else {
        commit("UPDATE_DYNAMIC_COUNTER", { market, value: 0 });
      }
      commit("ADD_PRICE_TO_HISTORY", { market, value });
      commit("UPDATE_PRICE", { market, value });

      if (purchasePrice !== null && shares && shares > 0) {
        const profit = value - purchasePrice;
        commit("UPDATE_PROFIT", { market, profit });
      }
    },
    async purchase({ commit, getters, dispatch }, { market }) {
      if (getters.isTransactionAllowed(market, "buy")) {
        commit("INCREASE_TRANSACTION_COUNTER");
        const currentMarket = getters.getMarket(market);
        commit("BUY_SHARE", { market });
        const value = currentMarket.currentPrice;
        commit("SET_PURCHASE_PRICE", { market, value });
        commit("UPDATE_CASH", { value: -value });
        const profit = 0;
        commit("UPDATE_PROFIT", { market, profit });
        await dispatch("sendMessage", { name: "buy", market });
      }
    },
    async sell({ commit, getters, dispatch }, { market }) {
      if (getters.isTransactionAllowed(market, "sell")) {
        commit("INCREASE_TRANSACTION_COUNTER");
        commit("SELL_SHARE", { market });
        const currentMarket = getters.getMarket(market);
        const value = null;
        commit("SET_PURCHASE_PRICE", { market, value });
        commit("UPDATE_CASH", { value: currentMarket.currentPrice });
        const profit = null;
        commit("UPDATE_PROFIT", { market, profit });
        await dispatch("sendMessage", { name: "sell", market });
      }
    },
    sendMessage: async function ({ state }, message) {
      const { counter, startTime, cash } = state;

      await Vue.prototype.$socket.sendObj({
        tick_number: counter,
        balance: cash,
        secs_since_round_starts: differenceInSeconds(new Date(), startTime),
        ...message,
      });
    },
  },
  getters: {
    msg: (state, getters) => (marketName) => {
      const market = getters.getMarket(marketName);
      const { priceDynamicCounter } = market;

      const absDynamic = Math.abs(priceDynamicCounter);
      if (absDynamic < 2) return ``;
      const direction = priceDynamicCounter > 0 ? "up" : "down";
      const msg = `Alert: Stock ${marketName} went ${direction} ${absDynamic} times in a row`;
      console.debug("MSG", msg);
      return msg;
    },

    showPredictionDlg:
      ({ showPredictionAt, counter }) =>
      () => {
        return counter === showPredictionAt;
      },
    endGame:
      ({ counter }) =>
      () => {
        return counter >= 10;
      },
    isTransactionAllowed: (state, getters) => (marketName, operation) => {
      const market = getters.getMarket(marketName);
      if (operation === "buy") {
        return market.shares === 0 && market.currentPrice <= state.cash;
      }

      if (operation === "sell") {
        return market.shares === 1;
      }
      return false;
    },
    getMarket: (state) => (name) => {
      return state[`market${name}`];
    },
  },
});
