<template>
    <v-app-bar color="background" height="60px" elevation="0" >
        <v-btn
            @click="callScroll('home')"
        >Home</v-btn>
        <v-btn 
            @click="callScroll('about')"
        >About</v-btn>
        <v-btn 
            @click="callScroll('portfolio')"
        >Portfolio</v-btn>
    </v-app-bar>
</template>

<script>
    export default {
        methods: {
            callScroll(id) {  
                this.$root.scroll(id);
            },
        }
    }
</script>