<template>
  <main class="main">
    <CandleStick />
  </main>
</template>

<script>
import CandleStick from "../components/CandleStick.vue";

export default {
  name: "Result",
  components: {
    CandleStick,
  },
  data(){
    return {
      companySymbol:null,
      companyResultData:this.$store.getters['getCompanyData'],
    }
  },
  created() {
    const symbol = this.$route.params.symbol; // Params symbol from route
    this.companySymbol = symbol;
    this.$store.dispatch("SearchDetailStock",{symbol:symbol,function:this.$store.state.timeSeries});
  },
  methods: {

  },
};
</script>

<style>

</style>