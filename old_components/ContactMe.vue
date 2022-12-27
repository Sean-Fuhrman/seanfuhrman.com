<template>
    <v-container :class=this.$root.componentClass>
        <v-form v-model="valid">
            <v-row>
                <v-col>
                    <h1>Contact Me!</h1>
                    <p>Feel free to email me <a href="mailto: seantfuhrman@gmail.com">here</a> or write a message below!</p>
                </v-col>
            </v-row>
            <v-row class="mx-5" justify="space-between">
                <v-col cols="5">
                    <v-text-field
                        v-model="name"
                        :rules="nameRules"
                        label="Your Name"
                    ></v-text-field>
                </v-col>
                <v-col cols="5">
                    <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="Your Email"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row class="mx-7">
                <v-textarea
                    label="Your Message"
                    auto-grow
                    v-model="message"
                ></v-textarea>
            </v-row>
            <v-btn 
                class="ml-7 mt-2"
                @click="submitMessage"
            >Submit</v-btn>
        </v-form>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            valid : false,
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
            name: '',
            nameRules: [ v => !!v || 'Name is required'],
            message: '',
        }
    },
    methods : {
        submitMessage() {
            //work in progresss
        }
    }
}
</script>