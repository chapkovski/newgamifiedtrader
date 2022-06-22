<template>
  <div class="d-flex">
    <award-given-block
      v-if="isAwardGiven"
      :awardGiven="awardGiven"
    ></award-given-block>
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
import AwardGivenBlock from "./AwardGiven";
import { mapState } from "vuex";
export default {
  components: { AwardGivenBlock },
  data() {
    return {};
  },
  computed: {
    ...mapState(["awards", "isAwardGiven", "awardGiven"]),
  },
  methods: {
    getAward(award) {
      return award.lock ? award.locked : award.unlocked;
    },
  },
};
</script>
