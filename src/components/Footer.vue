<template>
    <v-footer>
      <v-snackbar
        v-model="$store.getters.getSnackStatus"
      >
        {{ SnackText }}

        <template v-slot:action="{ attrs }">
          <v-btn
            color="pink"
            text
            v-bind="attrs"
            @click="snackBarClose()"
          >
            Close 
          </v-btn>
        </template>
      </v-snackbar>
      <v-col
        class="text-center"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>Vuetify Stock</strong>
      </v-col>      
    </v-footer>
</template>

<script>
export default {
  name: "Footer",

  data(){
    return {
    }
  },
  computed:{
    SnackText(){
      return this.$store.state.snackBarText  // Get Snackbar title text
    }
  },
  methods:{
      snackBarClose(){
        this.$store.dispatch('SetSnackStatus',false) // Set Snacbar Status
      }

  }
};
</script>
