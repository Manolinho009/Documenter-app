import { Component, EventEmitter, Output } from '@angular/core';
import { User } from '../../../models/user';
import { LoginService } from '../../../services/login/login.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrl: './entrar.component.css'
})
export class EntrarComponent {
  
  
  @Output() onChangeForm: EventEmitter<any> = new EventEmitter();

  login:any ='';
  password:any ='';

  errorMessage:any = '';

  constructor(
    private loginService: LoginService, 
    private cookieService: CookieService,
    private router: Router
  ) {}


  verificaAuthUsuario(AuthResponse:any){

    console.log(AuthResponse.imagem);
    
    if('user' in AuthResponse){
      console.log('Usuario Authenticado :', AuthResponse.login);

      // this.cookieService.set('userImage', AuthResponse.imagem);
      this.cookieService.set('user', JSON.stringify(AuthResponse.user));
      this.cookieService.set('token', AuthResponse.token);

      let user = new User('', '','')

      user.nome = AuthResponse.user.nome
      user.funcao = AuthResponse.user.funcao
      user.imagem = AuthResponse.imagem
      user.login = AuthResponse.user.login
      user.id = AuthResponse.user.id

      this.loginService.setUser(user)
      
      this.router.navigate(['/'])
    }
    else{
      this.errorMessage = AuthResponse.status
      console.error('Erro ao Authenticar usuário:', AuthResponse);
    }
  }

  onLogin(){

    const user = new User(
      this.login
      , this.password
      , undefined
    )

    const authenticated = this.loginService.authUser(user)
    authenticated.subscribe(
      response => {
        this.verificaAuthUsuario(response)
      },
      error => {
        this.verificaAuthUsuario(error.error)
      }
    )
    
  }


  onCreateButton(){
    this.onChangeForm.emit()
  }


}
