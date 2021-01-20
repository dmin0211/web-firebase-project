<template>
  <div>
    <v-list>
      <v-list-item v-for="(item,index) in items"
                   :key="index"
                   no-action
                   @click="gotoView(item)"
      >
        <v-list-item-icon><v-icon>{{ item.icon }}</v-icon></v-list-item-icon>
        <v-list-item-title class="white--text" v-text="item.title"></v-list-item-title>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  props: ['items'],
  name: "menu.vue",
  created() {
    console.log(this.items)
  },
  methods:{
    gotoView(item){
      console.log(item.title)
    },

  }
}
</script>

<style scoped>

</style>