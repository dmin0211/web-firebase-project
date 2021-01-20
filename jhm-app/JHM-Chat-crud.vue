<template>
  <v-app>
    <v-main>
      
      <v-simple-table>
        <template v-slot:default>
          <tbody>
          <tr
            v-for="chat in chatArr"
            :key="chat.id"
          >
            <td>{{ chat.name }}</td>
            <td>{{ chat.content }}</td>
            <td>{{ changeDateFormat(chat.upload) }}</td>
            <td>
              <v-btn
                
                @click="deleteChat(chat.id)"
              >
                삭제
              </v-btn>
              <v-btn
                @click="updateChat(chat.id)"
              >
                수정
              </v-btn>
            </td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
      
      <v-form @submit.prevent="createChat">
        <v-container fluid>
          <v-row justify="center" align="center">
            <!-- input text field -->
            <v-col cols="1">
              <!-- input name field -->
              <v-text-field
                v-model="name"
                placeholder="name"
                outlined
              >
              </v-text-field>
            </v-col>
            
            <v-col cols="4">
              <!-- input content field -->
              <v-text-field
                v-model="content"
                placeholder="content"
                outlined
              >
              </v-text-field>
            </v-col>
          
          </v-row>
          
          <v-row justify="center">
            <v-btn
              class="col-5"
              type="submit"
            >
              Create
            </v-btn>
          
          </v-row>
        </v-container>
      </v-form>
    </v-main>
  </v-app>
</template>

<script>
import firebase from 'firebase/app'

export default {
  name: 'App',
  
  data: () => ({
    chatsReference: firebase.firestore().collection('CHAT'),
    chatArr: [],
    name: 'jhm',
    content: '',
    unsubscribe: '',
  }),
  
  created () {
    this.readChat()
  },
  
  methods: {
    getMyChat () {
      return {
        name: this.name,
        content: this.content,
        upload: firebase.firestore.Timestamp.now(),
      }
    },
    createChat () {
      this.chatsReference.add(this.getMyChat()).then(() => {
        console.log('Document successfully written!')
        this.content = ''
      }).catch(function (error) {
        console.error('Error writing document: ', error)
      })
    },
    readChat () {
      this.chatsReference.orderBy('upload').onSnapshot((snapshot) => {
        snapshot.docChanges().forEach(documentChange => {
          const documentData = documentChange.doc.data()
          if (documentChange.type === 'added') {
            this.chatArr.push(documentData)
          } else if (documentChange.type === 'modified') {
            this.chatArr.splice(documentChange.newIndex, 1, documentData)
          } else if (documentChange.type === 'removed') {
            this.chatArr.splice(documentChange.oldIndex, 1)
          }
        })
      })
    },
    updateChat (documentId) {
      this.chatsReference.doc(documentId).update({
        content: this.content,
      }).then(function () {
        console.log('Document successfully updated!')
      }).catch(function (error) {
        console.error(error)
      })
    },
    deleteChat (documentId) {
      this.chatsReference.doc(documentId).delete().then(function () {
        console.log('Document successfully deleted!')
      }).catch(function (error) {
        console.error(error)
      })
    },
    changeDateFormat (timestamp) {
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
  },
}
</script>