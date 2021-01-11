<template>
  <v-toolbar-title>
    {{this.title}}
    <v-btn icon @click="openDialog"><v-icon>mdi-grease-pencil</v-icon></v-btn>
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title>
          제목 수정
          <v-spacer/>
          <v-btn icon @click="dialog=false"><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="text" outlined color="black" label="제목" @keypress.enter="save" hide-details></v-text-field>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-toolbar-title>
</template>

<script>
export default {
name: "title.vue",
  data(){
    return{
      dialog:false,
      text: this.title
    }
  },
  props:['title'],
  methods:{
    openDialog(){
      this.dialog=true
    },
    async save(){
      try {
        await this.$firebase.database().ref().child('site').update({title: this.text})
      }finally {
        this.dialog = false
      }
    }
  }
}

</script>

<style scoped>

</style>