import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    adminPage: "Admin Page",
    snackbarText: "Yetkisiz Giriş",
    admin:true,
    snackstatus:false,
    companyData:null,
    matchComp:[],
    apiURL:"https://alpha-vantage.p.rapidapi.com",
    apiKey:"",

  },
  mutations: {
    SET_NUMBER(state,payload) {
      state.number = payload
    },
    SET_ADMIN_PERM(state,val,status){
      state.admin = val
      state.snackstatus = status
    },
    SET_COMPANY_MATCH(state,companyData){
      state.matchComp = [...companyData]
    }
  },
  actions: {
    adminPermCheck({commit},value,status){
      commit('SET_ADMIN_PERM',value,status)
    },
    searchStock({state,commit},data){
      axios.get(`${state.apiURL}/query`,{
        params:{
          keywords: data.keywords, 
          function: 'SYMBOL_SEARCH', 
          datatype: 'json'
        },
        headers: {
          'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
          'x-rapidapi-key': 'd74df39cf3mshca5d31e025558d4p14ae96jsn259fe25931f5'
        },
      })
      .then(response =>{
        console.log(response.data.bestMatches)
        commit("SET_COMPANY_MATCH",response.data.bestMatches);
      });
        
    },

  },
  modules: {},
});
