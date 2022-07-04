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
    }),
  },
};
</script>
