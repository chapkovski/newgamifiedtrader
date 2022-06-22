<template></template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  props: ["value", "label"],
  data() {
    return {};
  },
  computed: { ...mapState(["transactionCounter", "awardTrades"]) },
  watch: {
    transactionCounter(v) {
      if (this.awardTrades.includes(v)) {
        this.$confetti.start({defaultType:'heart'});
        this.giveAward();
        const that = this;
        setTimeout(function () {
          that.$confetti.stop();
        }, 2000);
      }
    },
  },
  methods: { ...mapActions(["giveAward"]) },
};
</script>
