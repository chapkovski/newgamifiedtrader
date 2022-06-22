<template></template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  props: ["value", "label"],
  data() {
    return {};
  },
  computed: {
    ...mapState(["transactionCounter", "awardTrades", "awardGiven"]),
  },
  watch: {
    transactionCounter(v) {
      if (this.awardTrades.includes(v)) {
        this.$confetti.start({ defaultType: "heart" });
        this.giveAward();
        this.awardShow();
        const that = this;
        setTimeout(function () {
          that.$confetti.stop();
          // that.awardHide();
        }, 2000);
      }
    },
  },
  methods: {
    ...mapActions(["giveAward"]),
    ...mapMutations({ awardShow: "AWARD_SHOW", awardHide: "AWARD_HIDE" }),
  },
};
</script>
