<template>
  <div class="text-center d-flex justify-center align-center">
    <v-snackbars :objects="objects">
      <template v-slot:default="{ message }">
    <h3 class="mb-2">{{ message }}</h3>
    
  </template>
    </v-snackbars>
  </div>
</template>

<script>
import VSnackbars from "v-snackbars";
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
  components: {
    "v-snackbars": VSnackbars,
  },
  data() {
    return {};
  },
  computed: {
    objects: {
      get() {
        return this.snackMessages;
      },
      set(newValue) {
        this.removeSnackMessage(newValue);
      },
    },
    ...mapState({ objects: "snackMessages" }),
  },
  mounted() {},
  methods: {
    ...mapMutations({ removeSnackMessage: "REMOVE_SNACK_MESSAGE" }),
  },
};
</script>
