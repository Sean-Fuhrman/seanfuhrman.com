<template>
    <v-container :class=this.$root.componentClass>
        <h1>Portfolio</h1>
        <v-timeline justify="center">
          <v-scroll-x-transition group>
              <v-timeline-item
              v-for="(item, i) in items"
              :key="i"
              :dot-color="item.color"
              :icon="item.icon"
              fill-dot
              width="100%"
              >
                  <template v-slot:opposite>
                      {{item.date }}
                  </template>
                  <v-card>
                      <v-card-title :class="['text-h6', `bg-${item.color}`]">
                      {{item.title}}
                      </v-card-title>
                      <v-card-text class="pt-2 bg-white text--primary text-body-1">
                      <p>{{ item.text }}</p>
                      </v-card-text>
                  </v-card>
              </v-timeline-item>
            </v-scroll-x-transition>
        </v-timeline>
    </v-container>
    
</template>

<script>
  export default {
    data: () => ({
      items: [
      {
          color: 'primary',
          icon: 'mdi-head-lightbulb',
          title: 'Research Internship',
          text: 'I starting assisting with research at UCSD\'s Systems Energy Efficiency Lab. I researched Hyperdimension Computing and it\'s use for novel machine learning techniques',
          date: 'July 2022 - Present'
        },
        {
          color: 'primary',
          icon: 'mdi-led-on',
          title: 'LED infinity mirror',
          text: 'I built and programmed a LED infinity mirror that utilized Arduino.',
          date: 'September 2020'
        },
        {
          color: 'primary',
          icon: 'mdi-school-outline',
          title: 'College!',
          text: 'I began studying Computer Engineering at University of California San Diego!',
          date: 'September 2020'
        },
        {
          color: 'primary',
          icon: 'mdi-chip',
          title: 'Room Automation System',
          text: 'I created a microcontroller system to act as “assistant” via voice commands that\'s capable of controlling lights, raising my blinds, telling the weather, and playing music.',
          date: '2016 - 2020'
        },
        {
          color: 'primary',
          icon: 'mdi-controller',
          title: 'Falling Aliens',
          text: 'After learning to program videogames, I made a arcade-style 2D mobile game, named Falling Aliens, that I uploaded to the Apple App Store!',
          date: '2016'
        },
        {
          color: 'primary',
          icon: 'mdi-star',
          title: 'The Beginning ...',
          text: 'It all started at a local coding-camp, Game-U, that taught middle-school aged kids to program videogames and build lego robots. I was a student and then eventually became a teacher-assistant after finishing my program.',
          date: '2015'
        },
      ],
    }),
  }
</script>