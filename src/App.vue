<template>
  <v-app>

    <Navbar/>
    <v-main>

    </v-main>

    <Footer/>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

export default {
  components: { Navbar,Footer },
  name: 'App',
  data: () => ({
      snackbar: false,
      switch1:true,
      text: `Yetkisiz Giriş`,
  }),
  methods:{
    adminState(){
      if (this.switch1){
        // Admin route.
        return this.snackbar = false
      }else {
        return this.snackbar = true
      }
    }
    
  }
};
</script>
