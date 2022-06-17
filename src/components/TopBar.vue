<template>
  
<v-app-bar app clipped-left height="100"  >
      <instructions-dialog></instructions-dialog>
 <v-sheet outlined class="mx-1 rounded-lg ">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Cash: </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action class="font-weight-bold ">
            ${{$store.state.cash}}
          </v-list-item-action>
        </v-list-item>
      </v-sheet>
      <v-spacer></v-spacer>

      <v-spacer></v-spacer>
    </v-app-bar>

</template>

<script>
import InstructionsDialog from "./InstructionsDialog";
export default {
  components:{InstructionsDialog},
  data() {
    return {
       
    };
  },
   
  methods: {
     
   
  },
};
</script>