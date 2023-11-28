import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) {}

    loginUser(username: string, password: string) {
        return firstValueFrom(this.http.get('/user/is-exist', {
            params: {
                username,
                password
            }
        }))
    }

    createUser(username: string, password: string) {
        return firstValueFrom(this.http.post('/user/signup', {
            username,
            password,
            userType: 'customer'
        }))
    }
}