<template>
  <div class="text-center">
    <v-dialog v-model="dialog" persistent width="1000">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Predictions
        </v-card-title>

        <v-card-text class="text-left">
          <v-sheet outlined class="m-3 p-3" rounded elevation="3">
            <h5 class="">How likely is Stock <b>A</b> to go up next?</h5>
            <div class="m-5">
              <vue-slider
                :min="1"
                :max="5"
                :marks="marks1"
                :tooltip="'always'"
                :tooltip-placement="'bottom'"
                v-model="stockUpA"
                @change="setClicker(0)"
                :tooltip-formatter="formatter1"
              >
              </vue-slider>
            </div>
            <h5 class="mt-3">How confident are you in the assessment?</h5>
            <div class="m-3">
              <vue-slider
                :min="1"
                :max="5"
                :marks="marks2"
                :tooltip="'always'"
                :tooltip-placement="'bottom'"
                v-model="confidenceA"
                @change="setClicker(1)"
                :tooltip-formatter="formatter2"
              >
              </vue-slider>
            </div>
          </v-sheet>

          <v-sheet outlined class="m-3 p-3" rounded elevation="3">
            <h5>How likely is Stock <b>B</b> to go up next?</h5>
           <div class="m-5">
              <vue-slider
                :min="1"
                :max="5"
                :marks="marks1"
                :tooltip="'always'"
                :tooltip-placement="'bottom'"
                v-model="stockUpB"
                @change="setClicker(2)"
                :tooltip-formatter="formatter1"
              >
              </vue-slider>
            </div>
            <h5 class="mt-3">How confident are you in the assessment?</h5>
            <div class="m-3">
              <vue-slider
                :min="1"
                :max="5"
                :marks="marks2"
                :tooltip="'always'"
                :tooltip-placement="'bottom'"
                v-model="confidenceB"
                @change="setClicker(3)"
                :tooltip-formatter="formatter2"
              >
              </vue-slider>
            </div>
          </v-sheet>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="closeDialog" :disabled="!allClicked">
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import _ from "lodash";
import { mapState, mapActions, mapMutations } from "vuex";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";
export default {
  components: {
    VueSlider,
  },
  data() {
    return {
      marks1: {
        1: "Very unlikely (1)",
        2: "Unlikely (2)",
        3: "Neither likely nor unlikely",
        4: "Likely (4)",
        5: "Very likely (5)",
      },
      marks2: {
        1: "Very unconfident  (1)",
        2: "2",
        3: "3",
        4: "4",
        5: "Very confident (5)",
      },
      tooltips2: {
        1: "Very unconfident  (1)",
        2: "Somewhat unconfident (2)",
        3: "Neither confident nor unconfident (3)",
        4: "Somewhat confident (4)",
        5: "Very confident (5)",
      },
      clickers: [0, 0, 0, 0],
      dialog: true,
      stockUpA: 3,
      confidenceA: 1,
      stockUpB: 3,
      confidenceB: 1,
    };
  },
  mounted() {
    this.PAUSE();
  },
  computed: {
    allClicked() {
      return _.every(this.clickers, (e) => e === 1);
    },
  },
  methods: {
    formatter1(v) {
      return this.marks1[v];
    },
    formatter2(v) {
      return this.tooltips2[v];
    },
    setClicker(id) {
      this.clickers.splice(id, 1, 1);
    },
    ...mapActions(["nextTick", "sendMessage"]),
    ...mapMutations(["PAUSE"]),
    async closeDialog() {
      const { stockUpA, stockUpB, confidenceA, confidenceB } = this;
      await this.sendMessage({
        name: "PREDICTIONS_SENT",
        action: "predictions_send",
        stockUpA,
        stockUpB,
        confidenceA,
        confidenceB,
      });
      this.nextTick();
      this.dialog = false;
    },
  },
};
</script>
