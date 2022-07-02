<template>
  <v-app-bar app clipped-left class="">
    <monitor></monitor>
    <instructions-dialog></instructions-dialog>
    <pill label="Cash" :value="`\$${$store.state.cash}`"></pill>
    <pill label="Round" :value="getRoundInfo()"></pill>
    <pill label="Price updates left" :value="getPriceUpdatesLeft()"></pill>

    <div
      class="flex-grow-1 flex-shrink-0 d-flex p-1"
      style="height: 100%"
      v-if="!gamified"
    >
      <v-sheet
        elevation="3"
        outlined
        rounded
        class="
          flex-grow-1 flex-shrink-0
          d-flex
          flex-column
          justify-center
          align-center
        "
      >
        <div>{{ msg()("A") }}</div>
        <div>{{ msg()("B") }}</div>
      </v-sheet>
    </div>
    <v-spacer v-if="gamified"></v-spacer>
    <div
      class="flex-grow-0 flex-shrink-0 d-flex align-center"
      style="height: 100%"
    >
      <award-block v-if="gamified"></award-block>

      <v-switch
        v-if="false"
        class="mx-3"
        label="Gamified"
        v-model="gamified"
        dense
        hide-details
      ></v-switch>
    </div>
    <template #extension>
      <timer
        
        what-to-do="allowExitPermission"
        :progress-message="''"
        :show-progress="true"
        timer-finish="You may leave the chat now or continue for as long as you like."
        color="blue"
      />
    </template>
  </v-app-bar>
</template>

<script>
import InstructionsDialog from "./InstructionsDialog";
import Timer from "./TickProgress";
import AwardBlock from "./AwardBlock";
import Pill from "./Pill";
import { mapState, mapMutations, mapGetters } from "vuex";
import Monitor from "./Monitor";
export default {
  components: {
    InstructionsDialog,
    AwardBlock,
    Pill,
    Timer,
    Monitor,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({ internalGamified: "gamified", counter: "counter" }),
    gamified: {
      get() {
        return this.internalGamified;
      },
      set(newValue) {
        this.switchGamification();
      },
    },
  },
  methods: {
    ...mapMutations({ switchGamification: "SWITCH_GAMIFICATION" }),
    ...mapGetters(["msg"]),
    getRoundInfo() {
      return `${window.round_number} out of ${window.num_rounds}`;
    },
    getPriceUpdatesLeft() {
      return `${window.window.initialPricesA.length - this.counter} `;
    },
  },
};
</script>
