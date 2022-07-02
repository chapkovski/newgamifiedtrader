<template>
  <div class="text-center">
    <v-dialog v-model="dialog" persistent width="600">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Predictions
        </v-card-title>

        <v-card-text class="text-left">
          <v-sheet outlined class="m-3 p-3" rounded elevation="3">
            <h5>How likely is Stock <b>A</b> to go up next?</h5>
            <v-slider label="0" min="0" max="5" v-model="stockUpA">
              <template #append>5</template>
            </v-slider>
            <h5>How confident are you in the assessment?</h5>
            <v-slider label="0" min="0" max="5" v-model="confidenceA">
              <template #append>5</template>
            </v-slider>
          </v-sheet>

          <v-sheet outlined class="m-3 p-3" rounded elevation="3">
            <h5>How likely is Stock <b>B</b> to go up next?</h5>
            <v-slider label="0" min="0" max="5" v-model="stockUpB">
              <template #append>5</template>
            </v-slider>

            <h5>How confident are you in the assessment?</h5>
            <v-slider label="0" min="0" max="5" v-model="confidenceB">
              <template #append>5</template>
            </v-slider>
          </v-sheet>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="closeDialog"> Submit </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      dialog: true,
      stockUpA: 0,
      confidenceA: 0,
      stockUpB: 0,
      confidenceB: 0,
    };
  },
  mounted() {
    this.PAUSE();
  },

  methods: {
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
