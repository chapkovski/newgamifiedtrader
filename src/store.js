import Vue from "vue";
import Vuex from "vuex";
import awards from "./awards";
import _ from "lodash";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAwardGiven: false,
    awardGiven: {},
    gamified: true,
    transactionCounter: 0,
    awardTrades: [1, 2, 3, 4, 5],
    awards,
    counter: 0,
    cash: 50,
    pause: false,
    marketA: {
      name: "A",
      currentPrice: 100,
      prices: [100],
      shares: 1,
      purchasePrice: 100,
      profit: 0,
    },
    marketB: {
      name: "B",
      currentPrice: 100,
      prices: [[new Date().getTime(), 100]],
      shares: 1,
      purchasePrice: 100,
      profit: 0,
    },
  },
  mutations: {
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
  },
  actions: {
    giveAward({ commit, state }) {
      const ind = state.awardTrades.indexOf(state.transactionCounter);
      if (ind >= 0) {
        const award = state.awards[ind];
        commit("UNLOCK_AWARD", ind);
        commit("PROVIDE_GIVEN_AWARD", award);
      }
    },
    async nextTick({ commit, dispatch, getters }) {
      commit("INCREASE_COUNTER");
      const priceA = _.random(50, 150);
      dispatch("setPrice", { market: "A", value: priceA });
      const priceB = _.random(50, 150);
      dispatch("setPrice", { market: "B", value: priceB });
    },
    setPrice({ commit, getters }, { market, value }) {
      const currentMarket = getters.getMarket(market);
      commit("ADD_PRICE_TO_HISTORY", { market, value });
      commit("UPDATE_PRICE", { market, value });
      const { shares, purchasePrice } = currentMarket;

      if (purchasePrice !== null && shares && shares > 0) {
        const profit = value - purchasePrice;
        commit("UPDATE_PROFIT", { market, profit });
      }
    },
    purchase({ commit, getters }, { market }) {
      if (getters.isTransactionAllowed(market, "buy")) {
        commit("INCREASE_TRANSACTION_COUNTER");
        const currentMarket = getters.getMarket(market);
        commit("BUY_SHARE", { market });
        const value = currentMarket.currentPrice;
        commit("SET_PURCHASE_PRICE", { market, value });
        commit("UPDATE_CASH", { value: -value });
        const profit = 0;
        commit("UPDATE_PROFIT", { market, profit });
      }
    },
    sell({ commit, getters }, { market }) {
      if (getters.isTransactionAllowed(market, "sell")) {
        commit("INCREASE_TRANSACTION_COUNTER");
        commit("SELL_SHARE", { market });
        const currentMarket = getters.getMarket(market);
        const value = null;
        commit("SET_PURCHASE_PRICE", { market, value });
        commit("UPDATE_CASH", { value: currentMarket.currentPrice });
        const profit = null;
        commit("UPDATE_PROFIT", { market, profit });
      }
    },
  },
  getters: {
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
