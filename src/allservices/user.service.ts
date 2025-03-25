import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterUser, UserWithRole } from '../shared/interfaces';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 baseURL = environment.apiUrl + "/userapi/";
  constructor(private http: HttpClient) { }

  addNewUser(user:RegisterUser){
    return this.http.post<RegisterUser>(this.baseURL+`members`, user)
  }

  addNewUserAuth(user:RegisterUser){
    return this.http.post<RegisterUser>(this.baseURL+`register`, user)
  }

  getUserDetails():Observable<UserWithRole[]>{
    return this.http.get<UserWithRole[]>( this.baseURL+'fetch-user')
  }

  deleteUser(id: string){
    return this.http.delete<string>(this.baseURL+`delete/${id}`)
  }

  updateUser(id:string, reqBody:UserWithRole){
    return this.http.put<UserWithRole>(this.baseURL+`update/${id}`, reqBody);
  }

}
