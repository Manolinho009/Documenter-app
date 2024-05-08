import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { CookieService } from 'ngx-cookie-service';
import { StorageAcessService } from '../storage-acess.service';
import { GlobalVariables } from '../../global-variables';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = GlobalVariables.BASE_API_URL+'/user';
  private user :User = new User();



  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private storageAcessService: StorageAcessService
  ) { }

  getAllUser(): Observable<any> {

    return this.http.get<any>(this.apiUrl+'/all');
  }


  authUser(usuario: User): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<any>(this.apiUrl+'/login', usuario, httpOptions);
  }

  createUser(usuario: User): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<any>(this.apiUrl+'/create', usuario, httpOptions);
  }


  alterarImagemUser(usuario: User): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.user.imagem = usuario.imagem
    this.storageAcessService.setValue('imagemPerfil',{'image':usuario.imagem})
    
    return this.http.post<any>(this.apiUrl+'/image', usuario, httpOptions);
  }

  getUser(): User{
    return this.user
  }

  setUser(user:User): User{

    this.cookieService.set('user','');
    this.user = user
    
    this.storageAcessService.setValue('imagemPerfil',{'image':user.imagem})

    // Apaga a imagem do cookie para conseguir armazenar o valor
    user.imagem = ''
    const userVal =  JSON.stringify(user)
    this.cookieService.set('user',userVal);

    return this.user
  }

  reAuthUser(): boolean {
    const user = this.cookieService.get('user')
    const imageUser =  this.storageAcessService.getValue('imagemPerfil');
    
    if(user){
      
      const userJson = JSON.parse(user)
      userJson.imagem = imageUser.image
      const userNew = new User(
        userJson
      )

      this.user = userNew
      return true
    }
    else{
      return false
    }
  }



  verificaAuthUser(AuthResponse:any){
    
    if('user' in AuthResponse){
      console.log('Usuario Authenticado :', AuthResponse.user);

      this.cookieService.set('token', AuthResponse.token);

      let user = new User(AuthResponse.user)
      this.setUser(user)

      return user
    }
    else{
      console.error('Erro ao Authenticar usuário:', AuthResponse);
      return undefined
    }
  }

}
