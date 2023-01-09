<template>
    <v-container class="h-screen">
        <v-row class="mt-4 fill-height" align-content="center" justify="center">
            <v-col cols="12">
                <v-sheet max-width="400" class="mx-auto bg-transparent">
                    <v-img class="rounded-circle" :src="portrait" height="100%" eager/>
                </v-sheet>
                
                <h1 center class="mt-5 text-center" color="secondary">Sean Fuhrman </h1>
                <p class="text-center">
                Computer Engineering Student | University of California San Diego <br/>
                Hiking | Skiing | Exploring
                </p>
                <div class="d-flex justify-center align-center">
                    <v-btn class="bg-transparent" elevation="0"  icon="mdi-github" href="https://github.com/Sean-Fuhrman"></v-btn> 
                    <v-btn class="bg-transparent"  elevation="0"  icon="mdi-linkedin" href="https://linkedin.com/in/sean-fuhrman"></v-btn>
                    <v-btn class="bg-transparent"  elevation="0"  icon="mdi-gmail" href="mailto: seantfuhrman@gmail.com"></v-btn>
                </div>
            </v-col>
        </v-row>
    </v-container>  
</template>

<script>
import portrait from "/src/assets/IMG_6810.jpg"

export default {
    data() {
        return {
            portrait,
        }
    }
}
</script>