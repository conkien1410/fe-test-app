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
  },
  mounted() {
    console.log("mounted")
    console.log('BBBBBBBBBBBBBBBBB')
    if (localStorage.getItem("samlRequestId") != null) {
      console.log(localStorage.getItem("samlRequestId"))
    }
    else {
      useTimeoutFn(() => {
        // let authenticationInfo = this.getAuthenticationInfo()
        console.log('22222222222222222222222')

        // console.log(authenticationInfo)

        let redirectUrl = "APP1"

        useSubscription(
          AuthenticationService.getSAMLInfo(redirectUrl)
            .subscribe((authenticationInfo) => {
              console.log('3333333333333333333333')
              console.log( authenticationInfo.data.samlIDP)
              // this.authentication = res
              localStorage.setItem("samlRequestId", authenticationInfo.data.samlRequestId)
              window.location.href = authenticationInfo.data.samlIDP
              // return res
          })
        )
        
      }, 5000)
    }
    
  

    // PersonService.getAllPeople().subscribe(res => 
    // {
    //   // console.log("123 456")
    //   console.log(res)
    //   this.person = res

    // });

    // fetch('https://localhost:7000/api/person')
    // .then((response) => {
    //   console.log("123")
    //   console.log(response)
    // })

 
  }
})

</script>
 
<template>
    <div>
        AHHHHHHHHHHHHHHHHhh
        
    </div>
</template>