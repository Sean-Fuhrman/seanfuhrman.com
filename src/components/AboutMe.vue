<template>
    <v-container :class=this.$root.componentClass>
        <v-row justify="space-between">
            <v-col>
                <div class="d-flex w-100 align-space-between px-10">
                    <h1> About Me </h1>

                    <v-spacer></v-spacer>
                    <v-btn :href="resume"> 
                        Resume 
                        <v-icon>mdi-open-in-new</v-icon>
                    </v-btn> 
                </div>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <p class="ma-3 body-text">
                Welcome to my website! <br/> <br/> I’m Sean Fuhrman, I'm in my 3rd year studying Computer Engineering at University of California San Diego.
                I also assist with research at Systems Energy Efficiency Lab, where I help research <a href="http://varys.ucsd.edu/research/">Hyperdimensional-Computing</a>.
                In my free time, I like to work on side projects, ski, hike, and explore the world! 
                </p>
            </v-col>
        </v-row>
    </v-container>
</template>


<script>
import resume from '/src/assets/Resume.pdf'

export default{
    data () {
        return {
            resume,
        }
    }
}
</script>
<style>
.body-text {
    font-size: 20px;
}
</style>