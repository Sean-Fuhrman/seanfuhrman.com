<template>
    <v-card class="bg-transparent" elevation="0">
        <v-container>
            <v-row>
                <v-col cols="9">
                    <v-card-title>{{title}}</v-card-title>
                    <v-card-text>{{text }}</v-card-text>
                </v-col>

                <v-col cols="3">
                    <v-img height="150" :src="img"></v-img>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
export default {
    props: ['title', 'text', 'img']
}
</script>