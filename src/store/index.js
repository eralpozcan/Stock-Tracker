import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);


export default new Vuex.Store({
  state:{
    adminPageText:"Admin Page",
    snackBarText: "Yetkisiz Giriş",
    isAdmin:false,  // Admin Status 
    isSnackStatus:false,  // Footer Snackbar Status
    searchKeywords:"", // Arama Anahtarı - Search Key
    companyData:null,
    searchMatch:[], // Aramaya göre en iyi sonuçların Array'yi  - Best Search Key match array
    apiURL:"https://alpha-vantage.p.rapidapi.com",
    isWarningDialogOpen: true,
    timeSeries: "TIME_SERIES_DAILY",
    timeSeriesAPI: "Time Series (Daily)",
    routeArray:[],
    highest: null,
    lowest: null,
    
  },
  mutations:{
    SET_ADMIN_PERM(state,val){
      state.isAdmin = val
    },
    SET_SNACK_STATUS(state,val){
      state.isSnackStatus = val
    },
    SET_TIME_SERIES(state,val){
      state.timeSeries = val
    },
    SET_COMPANY_MATCH(state,val){
      state.searchMatch = val
    },
    SET_COMPANY_DETAIL(state,val){
      state.companyData = null
      state.companyData = val
    },
    SET_ROUTE_CHANGE_ARRAY(state, payload) {
      state.routeArray.push(payload);
    },
    SET_LOWEST(state,val){
      state.lowest = val
    },
    SET_HIGHEST(state,val){
      state.highest = val
    },
    SET_DIALOG(state,val){
      state.isWarningDialogOpen = val
    }    

  },
  getters:{
    // Getters All States get.
    getAdminPerm(state){
      return state.isAdmin
    },
    getSnackStatus(state){
      return state.isSnackStatus
    },
    getSearchKeywords(state){
      return state.searchKeywords
    },
    getCompanyData(state){
      return state.companyData
    },
    getLowest(state) {
      return state.lowest
    },
    getHighest(state) {
      return state.highest
    }, 
    getTimeSeries(state){
      return state.timeSeries
    },   
    getTimeSeriesKey(state) {
      switch (state.timeSeries) {
        case "TIME_SERIES_DAILY":
          return "Time Series (Daily)";
        case "TIME_SERIES_WEEKLY":
          return "Weekly Time Series";
        case "TIME_SERIES_MONTHLY":
          return "Monthly Time Series";
      }
      return state.timeSeriesAPI
    },
    getLogs(state){
      return state.routeArray
    },

  },
  actions:{
    //Set Snack Status 
    SetSnackStatus(context,val){
      context.commit('SET_SNACK_STATUS',val)
    },
    //Set Admin Status 
    SetAdminStatus(context,val){
      context.commit('SET_ADMIN_PERM',val)
    },
    //Set Time Series
    SetTimeSeries(context,val){
      context.commit('SET_TIME_SERIES',val)
    },
    //Set Company Data 
    SetCompanyData({commit},val){
      commit('SET_COMPANY_DETAIL',val)
    },
    // Search Best Keywords 
    SearchCompany({state,commit},data){
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
        commit("SET_COMPANY_MATCH",response.data.bestMatches);
      });      
    },
    // Search Stock Detail Daily- Weekenly-Montly
    SearchDetailStock(context,data){
      console.log("stoks",context.getters.getTimeSeries)
      axios.get(`${context.state.apiURL}/query`,{
        params:{
          symbol: data.symbol,
          function: `${context.state.timeSeries}`,
          datatype:"json",
        },
        headers: {
          'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
          'x-rapidapi-key': 'd74df39cf3mshca5d31e025558d4p14ae96jsn259fe25931f5'
        },
      })
      .then((response) => {
        console.log("timeAPI",context.getters.getTimeSeriesKey)
        console.log("response",response.data)

        var timeSeries = response.data[context.getters.getTimeSeriesKey];
        var configuredResData = Object.keys(timeSeries).map(timeSeriesKey => {
            timeSeries[timeSeriesKey]["6. date"] = timeSeriesKey;
            return timeSeries[timeSeriesKey];
        }).reverse().slice(-100)
        context.commit('SET_COMPANY_DETAIL', configuredResData);          
        let minChartThreshold = Math.min(...configuredResData.map(item => Number(item["3. low"])));
        context.commit('SET_LOWEST', minChartThreshold - minChartThreshold % 20);
        let maxChartThreshold = Math.max(...configuredResData.map(item => Number(item["2. high"])));
        context.commit('SET_HIGHEST', maxChartThreshold - maxChartThreshold % 20 + 20);        

      });
    }



  },
  modules:{

  }




});




// export default new Vuex.Store({
//   state: {
//     adminPage: "Admin Page",
//     snackbarText: "Yetkisiz Giriş",
//     isAdmin:false,
//     snackstatus:false,
//     companyData:null,
//     searchKeywords:"",
//     matchComp:[],
//     apiURL:"https://alpha-vantage.p.rapidapi.com",
//     api_functions: {
//       daily: { function: "TIME_SERIES_DAILY", series: "Time Series (Daily)" },
//       weekly: { function: "TIME_SERIES_WEEKLY", series: "Weekly Time Series" },
//       monthly: {
//         function: "TIME_SERIES_MONTHLY",
//         series: "Monthly Time Series",
//       },
//     },

//   },
//   mutations: {
//     SET_NUMBER(state,payload) {
//       state.number = payload
//     },
//     SET_ADMIN_PERM(state,val){
//       state.isAdmin = val
//     },
//     SET_SNACK_STATUS(state,val){
//       state.snackstatus = val
//     },
//     SET_SEARCH_KEYWORDS(state,val){
//       state.searchKeywords = val
//     },
//     SET_COMPANY_MATCH(state,companyData){
//       state.matchComp = [...companyData]
//     },
//     SET_COMPANY_STOCKDETAIL(state,companyDetails){
//       state.companyData = null,
//       state.companyData = companyDetails
//     },
//     SET_TIME_SERIES(state,payload){
//       state.timeSeries = payload
//     }

//   },
//   getters:{
//     getSnackStatus(state){
//       return state.snackstatus
//     },
//     getAdminStatus(state){
//       return state.isAdmin
//     },
//     // Returns api functions.
//     getApiFunctions(state) {
//       return state.api_functions;
//     },
//   },
//   actions: {
//     adminPermCheck({commit},value,status){
//       commit('SET_ADMIN_PERM',value,status)
//     },
//     setSnackStatus({commit},data){
//       commit('SET_SNACK_STATUS',data)
//     },

//     searchStock({state,commit},data){
//       axios.get(`${state.apiURL}/query`,{
//         params:{
//           keywords: data.keywords, 
//           function: 'SYMBOL_SEARCH', 
//           datatype: 'json'
//         },
//         headers: {
//           'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
//           'x-rapidapi-key': 'd74df39cf3mshca5d31e025558d4p14ae96jsn259fe25931f5'
//         },
//       })
//       .then(response =>{
//         console.log(response.data.bestMatches)
//         commit("SET_COMPANY_MATCH",response.data.bestMatches);
//       });
        
//     },
//     setCompanyData({commit},data){
//       commit('SET_COMPANY_STOCKDETAIL',data)
//     },
//     setKeywords({state,commit},data){
//       console.log("data",data)
//       state.keywords = data
//       commit("SET_SEARCH_KEYWORDS",data)
//     },
//     setTimeSeries({commit},data){
//       commit("SET_TIME_SERIES",data)
//     },
//     getDetailStock({context},data){
//       axios.get(`${context.state.apiURL}/query`,{
//         params:{
//           symbol: data.symbol,
//           function: data.function,
//           outputsize:"compact",
//           datatype:"json",
//         },
//         headers: {
//           'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
//           'x-rapidapi-key': 'd74df39cf3mshca5d31e025558d4p14ae96jsn259fe25931f5'
//         },
//       })
//       .then((response) =>{
//         let series = "";
//         switch (data.function) {
//           case context.state.api_functions.daily.function:
//             series = context.state.api_functions.daily.series;
//             break;
//           case context.state.api_functions.weekly.function:
//             series = context.state.api_functions.weekly.series;
//             break;
//           case context.state.api_functions.monthly.function:
//             series = context.state.api_functions.monthly.series;
//             break;
//         }
//         const timeSeries = Object.keys(response.data[series]).map((key) => key);
//         console.log("135")
//         let companyDetails = [];
//         timeSeries.map((item) => {
//           let detail = {
//             timestamp: item,
//             open: response.data[series][item]["1. open"],
//             high: response.data[series][item]["2. high"],
//             low: response.data[series][item]["3. low"],
//             close: response.data[series][item]["4. close"],
//             volume: response.data[series][item]["5. volume"],
//           };
//           companyDetails.push(detail);
//         });
//         console.log("Company Detail",companyDetails)
//         context.commit("SET_COMPANY_STOCKDETAIL", {
//           companyDetails,
//           metaData: response.data["Meta Data"],
//         });        
//       });
//     }

//   },
//   modules: {},
// });