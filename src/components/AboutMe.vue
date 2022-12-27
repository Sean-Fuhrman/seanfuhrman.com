<template>
    <v-container :class=this.$root.componentClass>
        <v-row>
            <v-col>
                <h1> About Me </h1>
            </v-col>

            <v-col cols="2">
                <v-btn class=""> Resume </v-btn> 
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <p class="ma-3 body-text" color="text">
                Welcome to my website! I’m Sean Fuhrman and currently in my 3rd year at University of California San Diego studying Computer Engineering.
                I also assist with research at Systems Energy Efficiency Lab (link to lab?) , where I help research Hyper-dimensional Computing 
                and it's use for machine learning algorithms that run well on low power edge devices.
                <br/><br/>In my free time, I like to work on side projects, ski, hike, and explore the world! 
                </p>
            </v-col>
        </v-row>
    </v-container>
</template>

<style>
.body-text {
    font-size: large;
}

</style>