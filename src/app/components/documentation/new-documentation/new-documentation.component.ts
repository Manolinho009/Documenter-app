import { Component } from '@angular/core';
import { Documentation } from '../documentation';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login/login.service';

@Component({
  selector: 'app-new-documentation',
  templateUrl: './new-documentation.component.html',
  styleUrl: './new-documentation.component.css'
})
export class NewDocumentationComponent {

  titulo:any = '';
  documentacaoModelo:Documentation | undefined;

  constructor(
    private router: Router
    ,private loginService: LoginService
  ){}

  criarNovaDocumentacao(){
    console.log(this.titulo);
    
    this.documentacaoModelo = new Documentation(
      this.titulo
      , this.loginService.getUser()
    )

    localStorage.setItem('novaDocumentacao', 
      JSON.stringify(this.documentacaoModelo)
    );
    this.router.navigate(['/documentation/edit']);
  }

}
