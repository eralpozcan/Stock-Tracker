<template>
    <v-app>
        <v-app-bar
        app
        color="primary"
        dark
        >
        <div class="d-flex align-center">
            <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
            transition="scale-transition"
            width="40"
            />
        </div>
        <v-spacer></v-spacer>
        <Input 
        :items="searchCompanyState" 
        @company-select="goSelectCompany"
        @keywords="setKeywords"/>        
        <v-btn
            class="mb-2 ml-2"
            depressed
            elevation="4"
            raised
            rounded
            light
            @click="getSearchDataKeywords"
        >Search</v-btn>
        <v-spacer></v-spacer>
        <v-btn
            class="mb-2 ml-2"
            depressed
            elevation="4"
            raised
            rounded
            light
            @click="adminState()"
        >{{adminButtonText}}</v-btn>
        <!--!Switch Vuex bağını gözden geçir -->
        <v-switch
        class = "mt-3"
        v-model="switchButton"
        :label="`Admin mode: ${switchButton ? true:false}`"
        ></v-switch>      
        </v-app-bar>
        <v-row class="mt-5">
            {{searchCompanyState}} 
        </v-row>
        
    </v-app>
</template>
<script>
import Input from './Input.vue'

export default {
  name: "NavBar",
  components:{
      Input
  },
  data() {
      return{
        switchButton:true,
        state:false,
        keywords:"",
        selectedCompany:null,
      }
  },
  computed:{
      adminButtonText(){
        return this.$store.state.adminPage;
      },
      searchCompanyState(){
        return this.$store.state.matchComp;
      }
  },
  methods:{
    adminState(){
      let adminEnable = false
      if (this.switchButton){
        // Admin Page route. Eklenecek
        adminEnable = true
        this.$store.dispatch('adminPermCheck',adminEnable,this.switchButton)
      }else {
        adminEnable = false
        this.$store.dispatch('adminPermCheck', adminEnable,this.switchButton)
      }
    },
    getSearchDataKeywords(){
        if (this.keywords.length > 1) {
            console.log("testVal",this.keywords)
            this.$store.dispatch("searchStock", { keywords: this.keywords });
        }else {
            console.log("1")
        }
        this.selectedCompany = null
    },
    setKeywords(keywords){
        this.keywords = keywords
    },    
    goSelectCompany(company) {
        console.log("getSelect",company);
    },
  }

};
</script>
