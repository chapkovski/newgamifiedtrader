<template>
  <countdown
    ref="tickTimer"
    :leftTime="6000"
    :style="{ width: '100%' }"
    @finish="toDo()"
  >
    <template #process="{ timeObj }">
      <v-progress-linear
        v-if="showProgress"
        width="100%"
        height="15px"
        :color="color"
        :value="(timeObj.leftTime / 1000 / secsToEnd) * 100"
      >
      </v-progress-linear>
    </template>
    <template #finish>
      <span>{{ timerFinish }}</span>
    </template>
  </countdown>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Timer",
  props: {
    secsToEnd: Number,
    progressMessage: String,
    whatToDo: String,
    color: String,
    timerFinish: String,
    showProgress: { type: Boolean, default: true },
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["pause"]),
  },
  watch: {
    pause(v) {
      console.debug("V CHANGED", v);
      if (v === true) {
        this.$refs.tickTimer.stopCountdown();
      }
      if (v === false) {
        this.$refs.tickTimer.startCountdown(true);
      }
    },
  },
  methods: {
    ...mapActions(["nextTick"]),
    toDo() {
      this.nextTick();
    },
  },
};
</script>
