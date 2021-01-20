<template>
  <v-app>
    <template>
      <v-simple-table>
        <template v-slot:default>
          <tbody>
          <tr
              v-for="(item,index) in desserts"
              :key="index"
          >
            <td>{{ item.name }}</td>
            <td>{{ item.content }}</td>
            <td>{{ changeDateFormat(item.upload) }}</td>
            <v-btn icon @click="deleteChat(index)">
              <v-icon>mdi-trash-can</v-icon>
            </v-btn>
            <v-btn icon @click="openDialog(index)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
      <div>
        <v-btn icon @click="openDialog(-1)">
          <v-icon>mdi-content-save</v-icon>
        </v-btn>
        <v-btn icon @click="readChat">
          <v-icon>mdi-check</v-icon>
        </v-btn>
      </div>
    </template>
    <v-dialog max-width="400" v-model="dialogItem">
      <v-card color="#7c4def" dark>
        <v-card-title>
          추가하기
          <v-spacer/>
          <v-btn icon>
            <v-icon @click="closeDialog()">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text >
          <v-text-field v-model="createItem.name" placeholder="name input" @keydown.enter="reloadChat"></v-text-field>
          <v-text-field v-model="createItem.content" placeholder="content input"
                        @keydown.enter="reloadChat"></v-text-field>
        </v-card-text>
      </v-card>
    </v-dialog>

  </v-app>
</template>

<script>

import firebase from 'firebase/app'

export default {
  data() {
    return {
      desserts: [],
      createItem: {
        content: '',
        name: '',
      },
      dialogItem: false,
      itemIndex: -1,
      alignments: [
        'start',
        'center',
        'end',
      ],

    }
  },
  created() {
    this.readChat()
  },
  methods: {
    createChat() {
      if (this.createItem.content == '' || this.createItem.name == '') return
      firebase.firestore().collection('CHAT').add({
        content: this.createItem.content,
        name: this.createItem.name,
        upload: firebase.firestore.Timestamp.now(),
      }).then(function (){
        console.log('dessert success create')
      }).catch(function (error){
        console.log(error)
      })
      this.dialogItem = false
      this.createItem = {name: '', content: ''}
    },
    readChat() {
      firebase.firestore().collection("CHAT").orderBy('upload').onSnapshot(querySnapshot => {
        querySnapshot.docChanges().forEach((change) => {
          const changeData = change.doc.data()
          changeData.id=change.doc.id
          if (change.type === "added") {
            this.desserts.push(changeData)
          } else if (change.type === 'removed') {
            this.desserts.splice(change.oldIndex, 1)
          } else if (change.type === 'modified') {
            this.desserts.splice(change.newIndex, 1, changeData)
          }
        })
        // querySnapshot.forEach((doc) => {
        //   // doc.data() is never undefined for query doc snapshots
        //   const {name, content, upload} = doc.data()
        //   this.desserts.push({id: doc.id, name, content, upload: upload.toDate()})
        // })
      })
    },
    updateChat() {
      firebase.firestore().collection('CHAT').doc(this.desserts[this.itemIndex].id).update({
        content: this.createItem.content,
        name: this.createItem.name
      }).then(function () {
        console.log('dessert update')
      }).catch(function (error) {
        console.error(error)
      })
      this.dialogItem = false
    },
    deleteChat(index) {
      firebase.firestore().collection('CHAT').doc(this.desserts[index].id).delete().then(function () {
        console.log('Document successfully deleted!')
      }).catch(function (error) {
        console.error(error)
      })

    },
    reloadChat() {
      if (this.itemIndex < 0) {
        this.createChat()
      } else this.updateChat()
    },
    changeDateFormat(timestamp) {
      const date = timestamp.toDate()
      const now = new Date()
      const year = date.getFullYear()
      const month = date.getMonth()
      const day = date.getDate()
      const hour = date.getHours()
      const minute = date.getMinutes()
      if (now.getDate() === day) {
        return hour + '시 ' + minute + '분'
      } else if (now.getMonth() === month) {
        return day + '일 ' + hour + '시 ' + minute + '분'
      } else if (now.getFullYear() === year) {
        return month + '월 ' + day + '일 ' + hour + '시 ' + minute + '분'
      } else {
        return year + '년' + month + '월 ' + day + '일 ' + hour + '시 ' + minute + '분'
      }
    },
    openDialog(index) {
      this.dialogItem = true
      this.itemIndex = index
      if (index >= 0) {
        this.createItem = {content: this.desserts[index].content, name: this.desserts[index].name}
      } else {
        this.createItem = {content: '', name: ''}
      }
    },
    closeDialog() {
      this.dialogItem = false
    }

  }
}
</script>