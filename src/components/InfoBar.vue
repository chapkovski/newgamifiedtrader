<template>
  <v-row>
    <v-col> Purchase price: {{market.purchasePrice !== null?market.purchasePrice:'NA'}} </v-col>
    <v-col> Profit: {{market.profit !== null?market.profit:'NA'}}</v-col>
  </v-row>
</template>

<script>
import _ from 'lodash'
export default {
  props:['market'],
  data() {
    return {};
  },

  methods: {},
};
</script>
