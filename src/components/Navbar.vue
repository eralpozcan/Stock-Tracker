<template>
    <v-app>
        <v-app-bar
        app
        color="primary"
        dark
        >
        <div class="d-flex align-center">
          <router-link :to="{ name: 'Home' }">
            <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
            transition="scale-transition"
            width="40"
            />
          </router-link>
        </div>
        <v-spacer></v-spacer>
        <Input 
        :items="searchCompanyMatch" 
        @company-select="goSelectCompany"
        @keywords="setKeywords"/>        
        <v-btn
            class="mb-2 ml-2"
            depressed
            elevation="4"
            raised
            rounded
            light
            @click="SearchDataKeywords"
        >Search</v-btn>
        <v-spacer></v-spacer>
        <v-btn
            class="mb-2 ml-2"
            depressed
            elevation="4"
            raised
            rounded
            light
            @click="adminPage()"
        >{{adminButtonText}}</v-btn>
        <v-switch
        class = "mt-3"
        @change="adminStatusVuex()"
        v-model="isAdmin"
        :label="`Admin mode: ${isAdmin ? true:false}`"
        ></v-switch>      
        </v-app-bar>     
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
        keywords:"",
        selectedCompany:null,
        isAdmin : false,
      }
  },
  computed:{
      adminButtonText(){
        return this.$store.state.adminPageText;
      },
      adminStatus(){
        return this.isAdmin === false ? "User" : "Admin";
      },
      searchCompanyMatch(){
        return this.$store.state.searchMatch;
      }
  },
  watch: {

  },
  methods:{
    adminPage(){
      // Check Admin perm and logs route
      if (this.$store.getters['getAdminPerm']){
        this.$router.push({
          name: `Logs`,
          params: {},
        });
      }else {
        this.$store.dispatch('SetSnackStatus',this.isAdmin ? false:true)
      }     
    },
    adminStatusVuex(){
      // Set Admın vuex 
      this.$store.commit("SET_ADMIN_PERM", this.isAdmin);
    },
    SearchDataKeywords(){
      // Send Keywords
      if (this.keywords.length > 3) {
          localStorage.setItem("searchKeywords", this.keywords);
          this.$store.dispatch("SearchCompany", { keywords: this.keywords });    
      }else {
          console.log("1")
      }
    },
    setKeywords(keywords){
      // Set Keywords components data
        this.keywords = keywords
    }, 
     // Selected company route   
    goSelectCompany(company) {
      this.selectedCompany = company;
      this.$store.dispatch('SetCompanyData',company)
      this.$router.push({
        name: `Result`,
        params: { symbol: company["1. symbol"], company },
      });
        
    },
  }

};
</script>
