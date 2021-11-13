<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
export default {

  name: 'App',
  data: () => ({

  }),
  watch: {
    $route(to, from) {
      // save logs for each success routing with authorized status
      let newRouteItem = {
        name: `Route Change - ${new Date().toLocaleString("en-US")}`,
        children: [
          { name: `From : ${from.fullPath}` },
          { name: `To : ${to.fullPath}` },
        ],
      };
      this.$store.commit('SET_ROUTE_CHANGE_ARRAY', newRouteItem);  
    }  
  },
};
</script>
