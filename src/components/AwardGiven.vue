<template>
  <v-overlay
    :value="true"
    :dark="false"
    :opacity="0"
    z-index="10000"
    :absolute="false"
  >
    <div class="d-flex flex-column justify-center align-center">
      <v-img
        contain
        max-height="300"
        max-width="300"
        :src="awardGiven.url"
      ></v-img>

      <v-card elevation="3" height="3000">
        <v-card-title class="d-flex align-center justify-center text-center">
          <div>{{ awardGiven.name }}</div>
        </v-card-title>
        <v-card-text>
          {{ awardGiven.message }}
        </v-card-text>
      </v-card>
    </div>
  </v-overlay>
</template>

<script>
export default {
  props: ["awardGiven"],
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>
