<template>
    <v-container class="h-screen">
        <v-row class="mt-4 fill-height" align-content="center" justify="center">
            <v-col cols="12">
                <v-sheet max-width="400" class="mx-auto bg-transparent">
                    <v-carousel 
                        eager
                        hide-delimiters
                        cycle
                        interval="2000"
                        show-arrows="hover"
                        height="auto" 
                        class="rounded-circle"
                    >
                        <template v-slot:prev="{ props }">
                            <v-btn
                                size="xx-small"
                                color="white"
                                icon="mdi-chevron-left"
                                @click="props.onClick"
                                :class="props.class"
                            ></v-btn>
                        </template>
                            <v-carousel-item eager v-for="img in images">
                                <v-img class="rounded-circle" :src="img" height="100%" eager/>
                            </v-carousel-item>
                        <template v-slot:next="{ props }">
                            <v-btn
                                size="xx-small"
                                color="white"
                                icon="mdi-chevron-right"
                                @click="props.onClick"
                                :class="props.class"
                            ></v-btn>
                        </template>
                    </v-carousel>
                </v-sheet>
                
                <h1 center class="mt-5 text-center" color="secondary">Sean Fuhrman </h1>
                <p class="text-center">
                Computer Engineering Student | University of California San Diego <br/>
                Hiking | Sking | Exploring
                </p>
                <div class="d-flex justify-center align-center">
                    <v-btn class="bg-transparent" elevation="0"  icon="mdi-github" href="https://github.com/Sean-Fuhrman"></v-btn> 
                    <v-btn class="bg-transparent"  elevation="0"  icon="mdi-linkedin" href="www.linkedin.com/in/sean-fuhrman"></v-btn>
                    <v-btn class="bg-transparent"  elevation="0"  icon="mdi-gmail" href="mailto: seantfuhrman@gmail.com"></v-btn>
                </div>
            </v-col>
        </v-row>
    </v-container>  
</template>

<script>
import img1 from "/src/assets/IMG_6810.jpg"
import img2 from "/src/assets/IMG_6807.jpg"
import img3 from "/src/assets/IMG_6793-2.jpg"
import img4 from "/src/assets/IMG_6812-2.jpg"
import img5 from "/src/assets/IMG_6815.jpg"
import img6 from "/src/assets/IMG_6813.jpg"
import img7 from "/src/assets/IMG_6816.jpg"

export default {
    data() {
        return {
            images : [img1]
        }
    }
}
</script>