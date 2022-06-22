<template>
  <v-app-bar app clipped-left class="">
    <monitor></monitor>
    <instructions-dialog></instructions-dialog>
    <pill label="Cash" :value="`\$${$store.state.cash}`"></pill>
    <v-spacer class="flex-grow-1 flex-shrink-0"></v-spacer>
    <div
      class="flex-grow-0 flex-shrink-0 d-flex align-center"
      style="height: 100%"
    >
      <award-block v-if="gamified"></award-block>
      <v-switch
        class="mx-3"
        label="Gamified"
        :value="gamified"
        @click="switchGamification"
        dense
        hide-details
      ></v-switch>
    </div>
    <template #extension>
      <timer
        :secs-to-end="6"
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
import { mapState, mapMutations } from "vuex";
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
  computed: { ...mapState(["gamified"]) },
  methods: {
    ...mapMutations({ switchGamification: "SWITCH_GAMIFICATION" }),
  },
};
</script>
