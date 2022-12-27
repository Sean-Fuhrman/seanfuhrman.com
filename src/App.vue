<template>
  <v-app>
    <app-bar/>
      <v-main>
        <div class="stars">
          <div class="twinkle">
            <my-introduction ref="home"/>
            <about-me ref="about"/>
            <my-timeline ref="timeline"/>
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

export default {
  data () {
    return{
      componentClass : "rounded-lg bg-transparent mx-auto mt-5",
    }
  },
  methods: {
      scroll(id) {
        this.$refs[id].$el.scrollIntoView({behavior: "smooth", block: "start"});
      }
  },
  components: { AboutMe, MyIntroduction, AppBar, MyFooter, MyTimeline }
}
</script>

<style>
  * {
    scroll-margin: 60px; 
  }

  @keyframes move-twinkling {
      from {background-position: 0 0}
      to {background-position: 10000 0}
  }

  .stars .twinkle {
      top:0;
      left:0;
      right:0;
      bottom:0;
      width: 100%;
      height: 100%;
      display: block;
  } 

  .stars{
      background: black url(src/assets/stars.png) repeat top center;
      z-index: 0;
  }
  .twinkle {
      background: transparent url(src/assets/twinkling.png) repeat top center;
      z-index: 1;
      animation: move-twinkling 20s linear infinite;
  }

</style>
