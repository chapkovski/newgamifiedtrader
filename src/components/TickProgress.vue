<template>
  <countdown
    :autoStart="true"
    ref="tickTimer"
    :leftTime="tickFrequency"
    :style="{ width: '100%' }"
    @finish="toDo()"
    :speed="100"
  >
    <template #process="{ timeObj }">
      <v-progress-linear
        width="100%"
        height="15px"
        :color="color"
        :value="(timeObj.leftTime / tickFrequency) * 100"
      >
      </v-progress-linear>
    </template>
  </countdown>
</template>

<script>
const MILLISECONDS = 1000;
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "Timer",
  props: {
    progressMessage: String,
    whatToDo: String,
    color: String,
    timerFinish: String,
    showProgress: { type: Boolean, default: true },
  },
  data() {
    return { tickFrequency: window.tickFrequency * MILLISECONDS };
    // return { tickFrequency: 1 * MILLISECONDS };
  },
  computed: {
    ...mapState(["pause"]),
  },
  watch: {
    pause(v) {
      if (v === true) {
        this.$refs.tickTimer.stopCountdown();
      } else {
        this.$refs.tickTimer.startCountdown(true);
      }
    },
  },
  methods: {
    ...mapActions(["nextTick"]),
    ...mapMutations(["PAUSE"]),
    toDo() {
      this.nextTick();
      const that = this;
      setTimeout(function () {
        if (!that.pause) {
          that.$refs.tickTimer.startCountdown(true);
        }
      }, 500);
    },
  },
};
</script>
