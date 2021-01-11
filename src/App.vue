<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon  @click="drawer=!drawer"/>
      <site-title v-bind:title="site.title"></site-title>
      <v-spacer/>
      <site-sign></site-sign>
    </v-app-bar>

    <v-navigation-drawer v-bind:width="400" app v-model="drawer">
      <site-menu v-bind:items="site.menu"></site-menu>
    </v-navigation-drawer>

    <site-footer :footer="site.footer"></site-footer>

    <v-main>
      <h1>Hello</h1>
    </v-main>
  </v-app>
</template>

<script>
import siteTitle from './components/title';
import siteFooter from './components/footer';
import siteMenu from './components/menu';
import siteSign from './components/sign'

export default {
  name: 'App',

  components: {
    siteTitle,
    siteFooter,
    siteMenu,
    siteSign
  },

  data(){
    return{
      site:{
        menu:[
          {
            title: 'home',
            icon: 'mdi-home',
            subItems: [
              {
                title: 'Dashboard',
                to:'/'
              },{
                title: 'About',
                to:'/about'
              }
            ]
          },
          {
            title: 'Dashboard',
            icon: 'mdi-view-dashboard'
          },
          {
            title: 'about',
            active: true,
            icon: 'mdi-account',
            subItems: [
              {
                title:'xxx',
                to:'/xxx'
              },
              {
                title: 'abc',
                to:'/abc'
              }
            ]
          }
        ],
        title:'나의 타이틀이다',
        footer:'푸터'
      }
      ,drawer:false
    }
  },
  created() {
    this.subscribe()
  },
  methods:{
    subscribe(){
      this.$firebase.database().ref().child('site').on("value", (sn)=>{
        const v=sn.val()
        if(!v){
          this.$firebase.database().ref().child('site').set(this.site)
          return
        }
        this.site=v
      },(e)=>{
        console.log(e.message)
      })
    },
    save(){
      console.log('save')
      this.$firebase.database().ref('kdm').child('kdm-data').set({
        title:'abcd',text:'tttt'
      })
    },
    read(){
      this.$firebase.database().ref('kdm').child('abcd').on('value',(sn)=>{
        console.log(sn)
        console.log(sn.val())
      })
    },
    async readone(){
      const sn = await this.$firebase.database().ref('kdm').child('kdm-data').once('value')
      console.log(sn.val())
    }

    /*
    readone(){
      this.$firebase.database().ref('kdm').child('kdm-data').once('value',(sn)=>{
        console.log(sn)
        console.log(sn.val())
      })
    }*/
  }
};
</script>
