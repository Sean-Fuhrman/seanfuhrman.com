<template>
    <v-container :class=this.$root.componentClass>
        <v-row>
            <v-col>
                <h1>Projects</h1>
   
                <project-card v-for="project in projects"
                :title = "project.title"
                :text = "project.text"
                :img = "project.img"/>
            </v-col>
        </v-row>
    </v-container>
    
</template>

<script>
import ProjectCard from './ProjectCard.vue';

let sampletext = 'Welcome to my website! I’m Sean Fuhrman and currently in my 3rd year at University of California San Diego studying Computer Engineering I also assist with research at Systems Energy Efficiency Lab (link to lab?) , where I help research Hyper-dimensional Computing and its use for machine learning algorithms that run well on low power edge devices'
export default {
    data() {
        return {
            projects : [
                {title: 'Project 1', text: sampletext , img: 'src/assets/logo.png'},
                {title: 'Project 2', text: sampletext , img: 'src/assets/logo.png'},
                {title: 'Project 3', text: sampletext, img: 'src/assets/logo.png'},
            ]
        }
    },
    components: {ProjectCard},
}
</script>