<template>
  <v-row>
    <v-col cols="6">
      <pill label="Position" :value="market.shares"></pill>
    </v-col>
    <v-col cols="6">
      <v-sheet
        outlined
        class="mx-1 d-flex flex-row justify-space-around align-center"
        min-height="66"
      >
        <v-btn large @click="buy" :color="colorBuy" :disabled="!btnEnabled('buy')"
          >Buy</v-btn
        >
        <v-btn large @click="sell" :color="colorSell" :disabled="!btnEnabled('sell')"
          >Sell</v-btn
        >
      </v-sheet>
    </v-col>
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
