<template>
  <v-row>
    <v-col>
      <pill label="Position" :value="market.shares"></pill>
    </v-col>
    <v-col
      ><v-btn @click="buy" :disabled="!btnEnabled('buy')">Buy</v-btn></v-col
    >
    <v-col
      ><v-btn @click="sell" :disabled="!btnEnabled('sell')">Sell</v-btn></v-col
    >
  </v-row>
</template>

<script>
import Pill from "./Pill";
import { mapGetters } from "vuex";
export default {
  props: ["market"],
  components: { Pill },
  data() {
    return {};
  },
  computed: { ...mapGetters(["isTransactionAllowed"]) },
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
