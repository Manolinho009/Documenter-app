import { Component } from '@angular/core';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrl: './entrar.component.css'
})
export class EntrarComponent {

  login:any ='';
  password:any ='';


  onLogin(){
    console.log(this.login);
    console.log(this.password);
  }


}
