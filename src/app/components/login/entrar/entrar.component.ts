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
    const user = this.loginService.verificaAuthUser(AuthResponse);
    console.log(user);
    
    if(user){
      this.router.navigate(['/'])
    }else{
      this.errorMessage = AuthResponse.status
    }
  }

  onLogin(){

    const user = new User(
      {
          login : this.login
        , password : this.password
      }
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
