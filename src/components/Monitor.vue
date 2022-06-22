<template>
  
</template>
<script>
import { mapState, mapActions } from 'vuex';
export default {
  props:['value', 'label'],
  data() {
    return {};
  },
  computed:{...mapState(['transactionCounter','awardTrades'])},
watch:{transactionCounter(v){
  if (this.awardTrades.includes(v)) {this.giveAward()}
}},
  methods: {...mapActions(['giveAward'])},
};
</script>
