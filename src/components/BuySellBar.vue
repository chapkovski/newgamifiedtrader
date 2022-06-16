<template>
  <v-row>
    <v-col>Position: {{market.shares}}</v-col>
    <v-col><v-btn @click="buy">Buy</v-btn></v-col>
    <v-col><v-btn @click="sell">Sell</v-btn></v-col>
  </v-row>
</template>

<script>

export default {
  props:['market'],
  data() {
    return {
      
    };
  },
   
  methods: {
    sell(){this.$emit('sell')},
    buy(){this.$emit('buy')}
  },
};
</script>