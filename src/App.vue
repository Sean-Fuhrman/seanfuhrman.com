<template>
  <v-app>
    <app-bar/>
      <v-main>
        <div class="background" id="myBackground">
            <my-introduction ref="home"/>
            <about-me ref="about"/>
            <my-timeline ref="portfolio"/>
        </div>
        <my-footer/>
      </v-main>
  </v-app>
</template>

<script>
//components 
import AboutMe from './components/AboutMe.vue';
import AppBar from './components/AppBar.vue';
import MyFooter from './components/MyFooter.vue';
import MyIntroduction from './components/MyIntroduction.vue';
import MyTimeline from './components/MyTimeline.vue';

import star from './assets/star.png'

export default {
  mounted() {
    this.createBackground(400);

    window.setInterval(this.updateStars, 50);
  },
  data () {
    return{
      componentClass : "rounded-lg bg-transparent mx-auto mt-5",
      stars : [],
      distances : [],
    }
  },
  methods: {
      scroll(id) {
        this.$refs[id].$el.scrollIntoView({behavior: "smooth", block: "start"});
      },
      createStar(distance) {
        const newStar = document.createElement('img');
        newStar.setAttribute('src', star);

        let yPos = Math.random() * 100;
        let xPos = Math.random() * 100;
        let size = 20 * distance;
        this.distances.push(distance)

        newStar.style.position = "absolute"
        newStar.style.top= yPos + "%";
        newStar.style.left= xPos + "%";
        newStar.style.height= size + "px";
        newStar.style.width= size + "px";
        newStar.style.zIndex = 0;

        document.getElementById('myBackground').appendChild(newStar);
        this.stars.push(newStar);
      },
      createBackground(numStars) {
        //two-thirds of the stars are 'far' stars
        for(let i = 0; i < 2* numStars/3; i++){
          this.createStar(Math.random() / 4);
        }
        
        //other are normal 
        for(let i = 0; i < numStars/3; i++){
          this.createStar(Math.random()/2);
        }
      },
      updateStars(){
        for(let i = 0; i < this.stars.length; i++){ 
          let shift = this.distances[i] * 1.5;
          let newX = this.stars[i].getBoundingClientRect().left + shift;
          if(newX > document.body.getBoundingClientRect().right) {
            newX = -10;
          }
          this.stars[i].style.left = newX + "px";
  
        }
      }
  },
  components: { AboutMe, MyIntroduction, AppBar, MyFooter, MyTimeline }
}
</script>

<style>
  * {
    scroll-margin: 60px; 
    z-index: 1;
  } 
</style>
