import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { CookieService } from 'ngx-cookie-service';
import { StorageAcessService } from '../storage-acess.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/user';
  private user :User = new User(undefined,undefined,undefined);



  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private storageAcessService: StorageAcessService
  ) { }

  authUser(usuario: User): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<any>(this.apiUrl+'/login', usuario, httpOptions);
  }


  alterarImagemUser(usuario: User): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.user.imagem = usuario.imagem
    // this.cookieService.set('imagemPerfil', usuario.imagem)
    this.storageAcessService.setValue('imagemPerfil',{'image':usuario.imagem})
    
    return this.http.post<any>(this.apiUrl+'/image', usuario, httpOptions);
  }

  getUser(): User{
    return this.user
  }

  setUser(user:User): User{
    this.user = user
    this.storageAcessService.setValue('imagemPerfil',{'image':user.imagem})
    return this.user
  }

  reAuthUser(): boolean {
    const user = this.cookieService.get('user')
    const imageUser =  this.storageAcessService.getValue('imagemPerfil');
    
    if(user){
      
      const userJson = JSON.parse(user)
      const userNew = new User(
        userJson.login
        ,undefined
        ,userJson.nome
      )
      userNew.id = userJson.id
      userNew.imagem = imageUser.image//this.user.imagem 
      userNew.funcao = userJson.funcao

      this.user = userNew
      return true
    }
    else{
      return false
    }
  }

}
