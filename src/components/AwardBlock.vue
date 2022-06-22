<template>
  <div class="d-flex">
    <div v-for="(award, ind) in awards" :key="ind" style="width: 60px">
      <transition
        enter-active-class="animate__animated animate__flipInX animate__slow"
      >
        <v-img
          contain
          max-height="50"
          max-width="50"
          :key="getAward(award)"
          :src="getAward(award)"
          class="mx-3"
        ></v-img>
      </transition>
    </div>
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
