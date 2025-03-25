import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterUser, UserWithRole } from '../shared/interfaces';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 userbaseURL = environment.apiUrl + "/userapi/";
 authBaseURL = environment.apiUrl + "/authapi/";
  constructor(private http: HttpClient) { }

  addNewUser(user:RegisterUser){
    return this.http.post<RegisterUser>(this.userbaseURL+`members`, user)
  }

  addNewUserAuth(user:RegisterUser){
    return this.http.post<RegisterUser>(this.authBaseURL+`register`, user)
  }

  getUserDetails():Observable<UserWithRole[]>{
    return this.http.get<UserWithRole[]>( this.userbaseURL+'fetch-user')
  }

  deleteUser(id: string){
    return this.http.delete<string>(this.userbaseURL+`delete/${id}`)
  }

  updateUser(id:string, reqBody:UserWithRole){
    return this.http.put<UserWithRole>(this.userbaseURL+`update/${id}`, reqBody);
  }

}
