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


  reAuthUser(): boolean {
    
    const user = this.cookieService.get('user')
    
    if(user){
      return true
    }
    else{
      return false
    }

  }

}
