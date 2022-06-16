import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    marketA: {
      currentPrice: 0,
      prices: [[new Date().getTime(), 0]],
      shares: 0,
      purchasePrice: null,
      profit: null,
    },
    marketB: {
      currentPrice: 0,
      prices: [[new Date().getTime(), 0]],
      shares: 0,
      purchasePrice: null,
      profit: null,
    },
  },
  mutations: {
    SET_MARKET_PROPERTY(state, { market, key, value }) {
      state[`market${market}`][key] = value;
    },
    ADD_PRICE_TO_HISTORY(state, { market, value }) {
      console.debug("AAAAA", market, value);
      state[`market${market}`].prices.push([new Date().getTime(), value]);
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
  },
  actions: {
    setPrice({ commit, getters }, { market, value }) {
      const currentMarket = getters.getMarket(market);
      commit("ADD_PRICE_TO_HISTORY", { market, value });
      commit("UPDATE_PRICE", { market, value });
      const { shares, purchasePrice } = currentMarket;

      if (purchasePrice && shares && shares > 0) {
        const profit = value - purchasePrice;
        commit("UPDATE_PROFIT", { market, profit });
      }
    },
    purchase({ commit, getters }, { market }) {
      console.debug("we reach purcahse");
      const currentMarket = getters.getMarket(market);
      commit("BUY_SHARE", { market });
      const value = currentMarket.currentPrice;
      commit("SET_PURCHASE_PRICE", { market, value });
      const profit = 0;
      commit("UPDATE_PROFIT", { market, profit });
    },
    sell({ commit, getters }, { market }) {
      commit("SELL_SHARE", { market });
      const value = null;
      commit("SET_PURCHASE_PRICE", { market, value });
      const profit = null;
      commit("UPDATE_PROFIT", { market, profit });
    },
  },
  getters: {
    getMarket: (state) => (name) => {
      return state[`market${name}`];
    },
  },
});
