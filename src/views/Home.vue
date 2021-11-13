<template>
  <div>
    <v-app>
      <Navbar />

      <Footer />
    </v-app>
      <v-dialog v-model="warningDialog" width="500">
        <v-card>
          <v-card-title class="text-h5 grey lighten-2"> Warning </v-card-title>

          <v-card-text>
            Do not send too request to API. Because, we have exceeded the rate limit per
            minute for our plan, BASIC, by the API provider. Have fun.
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="closeDialog"> I accept </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>  
  </div>

</template>

<script>
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';

export default {
  name: "Home",

  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      warningDialog: true,
    };
  },
  created() {
    this.warningDialog = this.$store.state.isWarningDialogOpen;
  },
  methods: {
    closeDialog() {
      this.warningDialog = false;
      this.$store.commit("SET_DIALOG",this.warningDialog);
    },
  },
};
</script>
