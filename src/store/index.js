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
    searchKeywords:"",
    matchComp:[],
    apiURL:"https://alpha-vantage.p.rapidapi.com",
    timeSeries:"TIME_SERIES_DAILY"

  },
  mutations: {
    SET_NUMBER(state,payload) {
      state.number = payload
    },
    SET_ADMIN_PERM(state,val,status){
      state.admin = val
      state.snackstatus = status
    },
    SET_SEARCH_KEYWORDS(state,val){
      state.searchKeywords = val
    },
    SET_COMPANY_MATCH(state,companyData){
      state.matchComp = [...companyData]
    },
    SET_COMPANY_STOCKDETAIL(state,companyDetails){

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
    setKeywords({state,commit},data){
      console.log("data",data)
      console.log("data key",data.keywords)
      state.keywords = data
      commit("SET_SEARCH_KEYWORDS",data)
    },
    getDetailStock({state,commit},data){
      axios.get(`${state.apiURL}/query`,{
        params:{
          symbol:data.searchKeywords,
          function: state.timeSeries,
          outputsize:"compact",
          datatype:"json",
        },
        headers: {
          'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
          'x-rapidapi-key': 'd74df39cf3mshca5d31e025558d4p14ae96jsn259fe25931f5'
        },
      })
      .then((response) =>{
        let series = 'TIME_SERIES_DAILY'
        const timeSeries = Object.keys(response.data[series]).map((key) => key);

        let companyDetails = [];
        timeSeries.map((item) => {
          let detail = {
            timestamp: item,
            open: response.data[series][item]["1. open"],
            high: response.data[series][item]["2. high"],
            low: response.data[series][item]["3. low"],
            close: response.data[series][item]["4. close"],
            volume: response.data[series][item]["5. volume"],
          };
          companyDetails.push(detail);
        });
        commit("SET_COMPANY_STOCKDETAIL", {
          companyDetails,
        });        
      });
    }

  },
  modules: {},
});
