<template>
  <v-row>
    <v-col>
      <pill label="Position" :value="market.shares"></pill>
    </v-col>
    <v-col
      ><v-btn @click="buy" :color="colorBuy" :disabled="!btnEnabled('buy')"
        >Buy</v-btn
      ></v-col
    >
    <v-col
      ><v-btn @click="sell" :color="colorSell" :disabled="!btnEnabled('sell')"
        >Sell</v-btn
      ></v-col
    >
  </v-row>
</template>

<script>
import Pill from "./Pill";
import { mapGetters, mapState } from "vuex";
export default {
  props: ["market"],
  components: { Pill },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["isTransactionAllowed"]),
    ...mapState(["gamified"]),
    colorSell() {
      return this.gamified ? "red" : "";
    },
    colorBuy() {
      return this.gamified ? "green" : "";
    },
  },
  methods: {
    btnEnabled(btn) {
      return this.isTransactionAllowed(this.market.name, btn);
    },

    sell() {
      this.$emit("sell");
    },
    buy() {
      this.$emit("buy");
    },
  },
};
</script>
