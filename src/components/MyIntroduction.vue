<template>
    <v-container class="h-screen">
        <v-row class="mt-4 fill-height" align-content="center" justify="center">
            <v-col cols="12">
                <v-sheet max-width="400" class="mx-auto bg-transparent">
                    <v-carousel 
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
                            <v-carousel-item src="src/assets/carousel/IMG_6810.jpg"></v-carousel-item>
                            <v-carousel-item src="src/assets/carousel/IMG_6807.jpg"></v-carousel-item>
                            <v-carousel-item src="src/assets/carousel/IMG_6793-2.jpg"></v-carousel-item>
                            <v-carousel-item src="src/assets/carousel/IMG_6812-2.jpg"></v-carousel-item>
                            <v-carousel-item src="src/assets/carousel/IMG_6815.jpg"></v-carousel-item>
                            <v-carousel-item src="src/assets/carousel/IMG_6813.jpg"></v-carousel-item>
                            <v-carousel-item src="src/assets/carousel/IMG_6816.jpg"></v-carousel-item>
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
                    <v-btn class="bg-transparent"  elevation="0"  icon="mdi-instagram" href="https://www.instagram.com/sean.fuhrman/"></v-btn>
                    <v-btn class="bg-transparent"  elevation="0"  icon="mdi-linkedin" href="www.linkedin.com/in/sean-fuhrman"></v-btn>
                    <v-btn class="bg-transparent"  elevation="0"  icon="mdi-gmail" href="mailto: seantfuhrman@gmail.com"></v-btn>
                </div>
            </v-col>
        </v-row>
    </v-container>  
</template>

