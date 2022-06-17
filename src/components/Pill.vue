<template>
  <v-sheet outlined class="mx-1 rounded-lg">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>{{ label }}: </v-list-item-title>
      </v-list-item-content>
      <v-list-item-action class="font-weight-bold">
        {{ value }}
      </v-list-item-action>
    </v-list-item>
  </v-sheet>
</template>

<script>
export default {
  props:['value', 'label'],
  data() {
    return {};
  },

  methods: {},
};
</script>
