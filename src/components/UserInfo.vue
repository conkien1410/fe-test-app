<script lang="ts">

import { mapActions, mapState, mapStores } from 'pinia'
import { useAuthenticationStore } from '../stores/AuthenticationStore'
import { AuthenticationService } from '../services/AuthenticationService'
import { useSubscription } from '@vueuse/rxjs'

import { defineComponent, ref } from 'vue'

export default defineComponent({
  computed: {
    ...mapStores(useAuthenticationStore),
    ...mapState(useAuthenticationStore, ['authentication']),
  },
  methods: {
    ...mapActions(useAuthenticationStore, ['getAuthenticationInfo'])
  },
  
  data() {
    return {
        person: {
            displayName: "",
            email: ""
        },
    }
 
  },
  created() {
    console.log("UserInfo created")  
  },
  mounted() {
    console.log("UserInfo mounted")
    
    let lastRequestId = window.location.href.substring("https://localhost:5173/#/userInfo?lastRequestId=".length)
    useSubscription(
      AuthenticationService.getSAMLUserInfo(lastRequestId)
        .subscribe((samlUserData) => {
          if(!samlUserData || !samlUserData.data) {
            return
          }
          console.log(samlUserData.data)
          this.person.displayName = samlUserData.data["http://schemas.microsoft.com/identity/claims/displayname"][0]
          this.person.email = samlUserData.data["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"][0]
      })
    )
  }
})
</script>
 
<template>
    <div>
        Person information in Application 1
        <div>
          <span>Display Name: </span>
          <span>{{this.person.displayName}}</span>
        </div>
        <div>
          <span>Email: </span>
          <span>{{this.person.email}}</span>
        </div>
    </div>
</template>