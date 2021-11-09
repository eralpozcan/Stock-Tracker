<template>
    <v-footer>
      <v-snackbar
        v-model="snackBarStatus"
      >
        {{ $store.state.snackbarText }}

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
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </v-col>      
    </v-footer>
</template>

<script>
export default {
  name: "Footer",

  data(){
    return {
        snackbar:false,
    }
  },
  computed:{
      snackBarStatus(){
        if (this.$store.state.admin){
            return false
        }else{
            return true
        }
      }
  },
  watch:{

  },
  methods:{
      snackBarClose(){
        return 
      }
  }
};
</script>
