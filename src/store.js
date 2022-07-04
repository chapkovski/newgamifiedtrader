import Vue from "vue";
import Vuex from "vuex";
import awards from "./awards";
import _ from "lodash";
import { differenceInSeconds, addSeconds, getTime } from "date-fns";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    baseLotteryProb: 0.02,
    tradeHappened: false,
    tradingTicksCounter: 0,
    snackMessages: [],
    startTime: new Date(),
    showPredictionAt: window.predictionAt,
    tradingAt: window.tradingAt,
    // tradingAt: 0,
    isAwardGiven: false,
    awardGiven: {},
    training: window.training || false,
    // training: false,
    gamified: window.gamified || false,
    // gamified: false,
    transactionCounter: 0,
    awardTrades: [10, 20, 30, 40, 50],
    // awardTrades: [1, 2, 3, 4, 5],
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
    SWITCH_TRADE_EVENT(state, value) {
      state.tradeHappened = value;
    },
    TRADING_TICK_INCREASE(state) {
      state.tradingTicksCounter++;
    },
    SET_START_TIME(state) {
      state.startTime = new Date();
    },
    ADD_SNACK_MESSAGE(state, message) {
      state.snackMessages.push(message);
    },
    REMOVE_SNACK_MESSAGE(state) {
      console.debug("REOMVOE SNAKC RIEACH");
      state.snackMessages.splice(0, 1);
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
      commit("SWITCH_TRADE_EVENT", false);
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
      if (priceDynamicCounter !==0 && priceDiff * priceDynamicCounter < 0) {
        commit("UPDATE_DYNAMIC_COUNTER", { market, value: Math.sign(priceDiff) });
      } else {
        if (priceDiff > 0) {
          commit("UPDATE_DYNAMIC_COUNTER", {
            market,
            value: priceDynamicCounter + 1,
          });
        } else if (priceDiff < 0) {
          commit("UPDATE_DYNAMIC_COUNTER", {
            market,
            value: priceDynamicCounter - 1,
          });
        }
      }

      commit("ADD_PRICE_TO_HISTORY", { market, value });
      commit("UPDATE_PRICE", { market, value });

      if (purchasePrice !== null && shares && shares > 0) {
        const profit = value - purchasePrice;
        commit("UPDATE_PROFIT", { market, profit });
      }
    },
    increaseTradedTicks({ state, commit }) {
      const { tradeHappened } = state;
      if (!tradeHappened) {
        commit("TRADING_TICK_INCREASE");
        commit("SWITCH_TRADE_EVENT", true);
      }
    },
    async purchase({ commit, getters, dispatch }, { market }) {
      if (getters.isTransactionAllowed(market, "buy")) {
        commit("INCREASE_TRANSACTION_COUNTER");
        dispatch("increaseTradedTicks");
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
        dispatch("increaseTradedTicks");
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
    fullLoteryProb:
      ({ baseLotteryProb, tradingTicksCounter }) =>
      () => {
        return _.round(baseLotteryProb * tradingTicksCounter * 100, 1);
      },
    showPredictionDlg:
      ({ showPredictionAt, counter }) =>
      () => {
        return counter === showPredictionAt;
      },
    tradingAllowed:
      ({ tradingAt, counter }) =>
      () => {
        return counter >= tradingAt;
      },
    endGame:
      ({ counter }) =>
      () => {
        return counter >= 10;
      },
    isTransactionAllowed: (state, getters) => (marketName, operation) => {
      const market = getters.getMarket(marketName);
      const isTradingAllowed = getters.tradingAllowed();
      if (!isTradingAllowed) return false;
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
