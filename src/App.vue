<template>
  <v-app>
    <app-bar/>
      <v-main>
        <div class="star1">
          <div class="star2">
            <div class="star3">
              <div class="star4">
                <my-introduction ref="home"/>
                <about-me ref="about"/>
                <my-timeline ref="portfolio"/>
              </div>
            </div>
          </div>
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
    // this.createBackground(400);

    // window.setInterval(this.updateStars, 5);
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
        for(let i = 0; i < 2 * numStars/3; i++){
          this.createStar(Math.random() / 4);
        }
        
        //other are normal 
        for(let i = 0; i < numStars/3; i++){
          this.createStar(Math.random()/2);
        }
      },
      updateStars(){
        let len = this.stars.length;
        let shift, newX, i;
        for(i = 0; i < len; i++){ 
          shift = this.distances[i] * 2;
          newX = this.stars[i].getBoundingClientRect().left + shift;

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
  @keyframes background-slide {
    from {background-position: 0px 0px;}
    to {background-position: 0px -4000px;}
  }

  .star1 {
    background: black url('/src/assets/stars.png') repeat top center;
    background-size: auto 2000px;
    animation: background-slide 100s linear infinite;
  }
  .star2 {
    background: transparent url('/src/assets/stars.png') repeat top center;
    background-size: auto 1000px;
    animation: background-slide 200s linear infinite;
  }
  .star3 {
    background: transparent url('/src/assets/stars.png') repeat top center;
    background-size: auto 800px;
    animation: background-slide 300s linear infinite;
  }
  .star4 {
    background: transparent url('/src/assets/stars.png') repeat top center;
    background-size: auto 500px;
    animation: background-slide 400s linear infinite;
  }
</style>
