<template>
  <v-autocomplete
    class="mt-5"
    v-model="companySelect"
    :search-input.sync="keywords"
    :items="items"
    item-text="2. name"
    item-value="2. name"
    hide-no-data
    hide-selected
    dense
    outlined
    filled
    rounded
    solo-inverted
    label="Companies"
    placeholder="Search a company"
    return-object
  >
    <template v-slot:item="data">
      <template>
        <v-list-item-content class="item">
          <v-list-item-title v-html="data.item['2. name']"></v-list-item-title>
            <v-list-item-subtitle v-html="data.item['1. symbol']"></v-list-item-subtitle>
            <v-list-item-subtitle v-html="data.item['4. region']"></v-list-item-subtitle>
        </v-list-item-content>
      </template>
    </template>
  </v-autocomplete>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      companySelect: null, // Seçilen Şirket
      keywords: null, // Şirket keywords'ü
    };
  },
  watch: {
      // Üst components'e gönderiyoruz yani Navbar vue'ye
    companySelect(val) {
      this.$emit("company-select", val);
    },
     // Üst component'e gönderiyoruz girilen Keyworld'ü
    keywords(val) {
      this.$emit("keywords", val);
    },
  },
};
</script>
