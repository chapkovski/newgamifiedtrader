<template></template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
import _ from "lodash";
export default {
  props: ["value", "label"],
  data() {
    return {};
  },
  computed: {
    ...mapState(["transactionCounter", "awardTrades", "awardGiven"]),
  },
  watch: {
    "$store.state.marketA.priceDynamicCounter"(v) {
      const absDynamic = Math.abs(v);
      console.debug("JOJOJOJOJOJ", absDynamic)
      if (absDynamic > 1) this.addSnackMessage("A", v, absDynamic);
    },
    "$store.state.marketB.priceDynamicCounter"(v) {
      const absDynamic = Math.abs(v);
      if (absDynamic > 1) this.addSnackMessage("B", v, absDynamic);
    },
    transactionCounter(v) {
      if (this.awardTrades.includes(v)) {
        if (this.$store.state.gamified) {
          this.$confetti.start({ defaultType: "heart" });
          this.pause();
          this.giveAward();
          this.awardShow();
          const that = this;
          setTimeout(function () {
            that.$confetti.stop();
            that.awardHide();
            that.unpause();
          }, 3000);
        }
      }
    },
  },
  methods: {
    ...mapActions(["giveAward", "nextTick"]),
    ...mapMutations({
      awardShow: "AWARD_SHOW",
      awardHide: "AWARD_HIDE",
      pause: "PAUSE",
      unpause: "UNPAUSE",
      addSnackMessageToStore: "ADD_SNACK_MESSAGE",
      removeSnackMessage: "REMOVE_SNACK_MESSAGE",
    }),
    addSnackMessage(marketName, v, absV) {
      const direction = v > 0 ? "up" : "down";
      const directionColor = v > 0 ? "green" : "red";
      const msg = `Alert: Stock ${marketName} went ${direction} ${absV} times in a row`;

      this.addSnackMessageToStore({
        message: msg,
        color: directionColor,
        top: true,
        absolute: true,
      });
      const that = this;
      setTimeout(() => that.removeSnackMessage(), 3000);
    },
  },
};
</script>
