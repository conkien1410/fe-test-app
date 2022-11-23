<script lang="ts">
// import { defineComponent } from 'vue'
// import  { PropType } from 'vue'
import { PersonDTO } from '../models/Person'
import { mapActions, mapState, mapStores } from 'pinia'
import { useAuthenticationStore } from '../stores/AuthenticationStore'



// export default defineComponent({
//     props: {
//         person: {
//             type: Person,
//             required: true
//         }
//     },
//     mounted() {
//         this.person = {
//             name: "Test",
//             id: "123",
//         }
//     }
// })

import { defineComponent, ref } from 'vue'
import type { PropType } from 'vue'
import { AuthenticationService } from '../services/AuthenticationService'
import { useObservable, useSubscription } from '@vueuse/rxjs'
import { useTimeoutFn } from '@vueuse/shared'

// interface PersonDTO {
//   name?: string
//   dob?: Date
//   id?: string
// }

export default defineComponent({
  computed: {
    ...mapStores(useAuthenticationStore),
    ...mapState(useAuthenticationStore, ['authentication']),
    // person() {
    //   return this.personStore.person
    // }
  },
  methods: {
    ...mapActions(useAuthenticationStore, ['getAuthenticationInfo'])
  },
  
  data() {
    return {
        person2: {
            name: "asdf"
        },
    }
    // person: {
    //   // provide more specific type to `Object`
    //   type: Object as PropType<Person>,
    //   required: true
    // },
   
  },
  created() {
    console.log("created")
    // this.person  = ref<PersonDTO>({
    //     name: "Anh123",
    // })
    //this.getPerson()

    

    // TS Error: argument of type 'string' is not
    // assignable to parameter of type 'number'
    // this.callback?.('123')
  },
  mounted() {
    console.log("mounted")

    
    useTimeoutFn(() => {

      let authenticationInfo = this.getAuthenticationInfo()
      window.location.hash = authenticationInfo.samlIDP
      localStorage.setItem("samlRequestId", authenticationInfo.samlRequestId)

    }, 5000)

 
  }
})

</script>
 
<template>
    <div>
        <!-- <div>{{this.title}}</div>
        <div>{{this.person.name}}</div> -->
        
    </div>
</template>