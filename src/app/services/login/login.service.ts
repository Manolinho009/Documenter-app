import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/user';
  private user :User = new User(undefined,undefined,undefined);



  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  authUser(usuario: User): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<any>(this.apiUrl+'/auth', usuario, httpOptions);
  }

  getUser(): User{
    return this.user
  }

  reAuthUser(): boolean {
    const user = this.cookieService.get('user')
    
    if(user){
      
      const userJson = JSON.parse(user)
      this.user = new User(
        userJson.login
        ,undefined
        ,userJson.nome
      )

      return true
    }
    else{
      return false
    }
  }

}
