import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state:{
        editable: true,
        fireUser: null
    },
    mutations:{
        setEdit (st,edit){
            st.editable=edit
        },
        setFireUser(st, fu){
            st.fireUser=fu
        }
    },
    actions:{
    },
    modules:{}
})

