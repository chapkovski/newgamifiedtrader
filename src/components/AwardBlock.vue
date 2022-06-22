<template>
  <div class="d-flex">
    <v-img
      v-for="(award, ind) in awards"
      max-height="50"
      max-width="50"
      :key="ind"
      :src="getAward(award)"
      class="mx-3"
    ></v-img>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState(["awards"]),
  },
  methods: {
    getAward(award) {
      return award.lock ? award.locked : award.unlocked;
    },
  },
};
</script>
