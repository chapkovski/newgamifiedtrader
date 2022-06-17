<template>
  <v-app-bar app clipped-left>
    <instructions-dialog></instructions-dialog>
    <pill label="Cash" :value="`\$${$store.state.cash}`"></pill>

    <v-spacer></v-spacer>

    <v-spacer></v-spacer>

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
import Pill from "./Pill";
export default {
  components: {
    InstructionsDialog,
    Pill,
    Timer,
  },
  data() {
    return {};
  },

  methods: {},
};
</script>
