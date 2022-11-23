import { defineStore } from 'pinia'
import { PersonDTO } from '../models/Person'
import { AuthenticationService } from '../services/AuthenticationService'
import { useSubscription } from '@vueuse/rxjs'


export const useAuthenticationStore = defineStore('authentication', {
    state: ()  => {
        return {
            authentication: {},
           
        }
    },
    actions: {
        getAuthenticationInfo() {
            return "Test"
            // useSubscription(
            //     AuthenticationService.getSAMLInfo()
            //       .subscribe((res) => {
            //         // console.log('1111111111111111111111')
            //         console.log(res)
            //         this.authentication = res
            //         return res
            //     })
            // )
        }
    }
})