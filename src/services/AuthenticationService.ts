import { from } from "@vueuse/rxjs"
import { map, Observable } from "rxjs"
import axios from "axios"
import { PersonDTO } from "../models/Person"

// axios.defaults.headers.get['header-name'] = 'value'

const AuthenticationService = {
    getSAMLInfo: (redirectUrl: string): Observable<any> => {
        console.log("AuthenticationService getSAMLInfo")
        return from(axios.get(`/api/v1/maintenance/saml/sso2?redirectUrl=${redirectUrl}`, {}))
        .pipe(
            map((value, index) => {
                return value
                // return value.data[0] as PersonDTO
            })
        );
    },
    getSAMLUserInfo: (lastRequestId: string): Observable<any> => {
        console.log("AuthenticationService getSAMLUserInfo")
        return from(axios.get(`/api/v1/maintenance/saml/data?lastRequestId=${lastRequestId}`))
        .pipe(
            map((value, index) => {
                return value
            })
        )
    }
}
export { AuthenticationService }