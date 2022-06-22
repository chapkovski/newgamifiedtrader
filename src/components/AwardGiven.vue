<template>
  <v-overlay :value="true" :dark="false" :opacity="0" z-index="10000">
    <div class="d-flex flex-column justify-center align-center">
      <v-card elevation="3" width="600">
        <v-card-title class="d-flex align-center justify-center text-center">
          <video width="320" autoplay loop>
            <source src="@/assets/bronze.mp4" type="video/mp4" />

            Your browser does not support the video tag.
          </video>
        </v-card-title>
        <v-card-text>
          <h3 class="text-center">{{ awardGiven.message }}</h3>
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
