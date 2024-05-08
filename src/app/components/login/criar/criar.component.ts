import { Component, EventEmitter, Output } from '@angular/core';
import { User } from '../../../models/user';
import { LoginService } from '../../../services/login/login.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-criar',
  templateUrl: './criar.component.html',
  styleUrl: './criar.component.css'
})
export class CriarComponent {

  @Output() onChangeForm: EventEmitter<any> = new EventEmitter();
  
  nome:any ='';

  login:any ='';
  password:any ='';
  passwordConfirm:any ='';

  errorMessage:any = '';

  constructor(
    private loginService: LoginService, 
    private cookieService: CookieService,
    private router: Router
  ) { }

  verificaAuthUsuario(AuthResponse:any){

    if('user' in AuthResponse){
      console.log('Usuario Authenticado :', AuthResponse.login);

      // this.cookieService.set('userImage', AuthResponse.imagem);
      this.cookieService.set('user', JSON.stringify(AuthResponse.user));
      this.cookieService.set('token', AuthResponse.token);

      let user = new User(
        {
          nome: AuthResponse.user.nome
          , funcao: AuthResponse.user.funcao
          , imagem: AuthResponse.imagem
          , login: AuthResponse.user.login
          , id: AuthResponse.user.id
        }
      )

      // user.nome = AuthResponse.user.nome
      // user.funcao = AuthResponse.user.funcao
      // user.imagem = AuthResponse.imagem
      // user.login = AuthResponse.user.login
      // user.id = AuthResponse.user.id

      this.loginService.setUser(user)
      
      this.router.navigate(['/'])
    }
    else{
      this.errorMessage = AuthResponse.status
      console.error('Erro ao Authenticar usuário:', AuthResponse);
    }

    // if(AuthResponse.auth){
    //   console.log('Usuario Authenticado :', AuthResponse.login);
    //   this.cookieService.set('user', JSON.stringify(AuthResponse));
    //   this.router.navigate(['/'])
    // }
    // else{
    //   console.error('Erro ao Authenticar usuário:', AuthResponse);
    //   this.errorMessage = AuthResponse.status
    // }
  }

  onCreate(){

    let errorMessageVasio = 'Preencha os campos: '

    if(this.nome == ''){
      errorMessageVasio += 'Nome, '
    }
    if(this.login == ''){
      errorMessageVasio += 'Matricula, '
    }
    if(this.password == ''){
      errorMessageVasio += 'Senha, '
    }
    if(this.passwordConfirm == ''){
      errorMessageVasio += 'Confirmação de Senha'
    }

    if
    (this.nome == ''
    || this.login == ''
    || this.password == ''
    || this.passwordConfirm == ''){
        this.errorMessage = errorMessageVasio
        return
    }

    if (this.password == this.passwordConfirm){
      let user = new User(
        {
        login: this.login
        , password: this.password
        }
      )




      user.funcao = '1'
      user.nome = this.nome

      const retorno = this.loginService.createUser(user)
      retorno.subscribe(
        response => {

          const authenticated = this.loginService.authUser(user)
          authenticated.subscribe(
            response => {
              this.verificaAuthUsuario(response)
            },
            error => {
              this.verificaAuthUsuario(error.error)
            }
          )
        },
        error => {
          this.verificaAuthUsuario(error.error);
        }
      )

    }
    else{
      this.errorMessage = 'As Senhas Não Conferem!'
    }
    
  }


  onLoginButton(){
    this.onChangeForm.emit()
  }

}
