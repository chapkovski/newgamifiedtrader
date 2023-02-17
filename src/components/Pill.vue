<template>
  <v-sheet outlined class="m-0 rounded-lg" >
    <v-list-item>
      <v-list-item-content>
        <h3>{{ label }}:</h3>
      </v-list-item-content>
      <v-list-item-action class="font-weight-bold">
      <h3>  {{ value }}</h3>
      </v-list-item-action>
    </v-list-item>
  </v-sheet>
</template>

<script>
export default {
  props: ["value", "label"],
  data() {
    return {};
  },

  methods: {},
};
</script>
