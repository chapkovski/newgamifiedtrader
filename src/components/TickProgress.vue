<template>
  <countdown
    :autoStart="true"
    ref="tickTimer"
    :leftTime="1000"
    :style="{ width: '100%' }"
    @finish="toDo()"
  >
    <template #process="{ timeObj }">
      <v-progress-linear
        width="100%"
        height="15px"
        :color="color"
        :value="(timeObj.leftTime / 1000 / secsToEnd) * 100"
      >
      </v-progress-linear>
    </template>
  </countdown>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
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
      //   if (v === true) {
      //     this.$refs.tickTimer.stopCountdown();
      //   }
    },
  },
  methods: {
    ...mapActions(["nextTick"]),
    ...mapMutations(["PAUSE"]),
    toDo() {
      this.PAUSE();
      this.nextTick();
      this.$refs.tickTimer.startCountdown(true);
    },
  },
};
</script>
