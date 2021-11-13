<template>
    <div>
        <v-app-bar>
            <v-toolbar-title>
                <span @click="goToHomePage" class="home-navigator">
                    Home Page
                </span>
            </v-toolbar-title>
        </v-app-bar>
        <div>
            <v-container>
                <v-treeview dense hoverable color="warning" :items="logItems"></v-treeview>
            </v-container>
        </div>
    </div>
</template>

<script>

export default {
    data(){
        return {
            // Get logs store
            logItems: this.$store.getters.getLogs
        }
    },
    methods: {
        goToHomePage() {
            this.$router.push({ name: 'Home' });
        }
    }
}
</script>

<style>
    .home-navigator {
        font-weight: bold;
        color: rgb(13, 108, 146);
        cursor: pointer;
    }
</style>