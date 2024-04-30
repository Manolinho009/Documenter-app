import { Component } from '@angular/core';
import { Documentation } from '../documentation';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login/login.service';
import { DocumentationService } from '../../../services/api/documentation.service';

@Component({
  selector: 'app-new-documentation',
  templateUrl: './new-documentation.component.html',
  styleUrl: './new-documentation.component.css'
})
export class NewDocumentationComponent {

  titulo:any = '';
  descricao:any = '';
  documentacaoModelo:Documentation | undefined;
  
  selectedFile: any;

  errorMessage:any = ''

  constructor(
    private router: Router
    ,private loginService: LoginService
    ,private documentationService: DocumentationService
  ){}

  criarNovaDocumentacao(){

    this.documentacaoModelo = new Documentation(
      this.titulo
      , this.loginService.getUser()
      , this.descricao
    )
    this.documentacaoModelo.idUser = this.loginService.getUser().id

    if (this.selectedFile){
      this.documentacaoModelo.imagemCapa = this.selectedFile
    }

    
    const retorno = this.documentationService.createDocumentation(this.documentacaoModelo)
    
    localStorage.setItem('novaDocumentacao', 
      JSON.stringify(this.documentacaoModelo)
    );

    retorno.subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/documentation/edit']);
      },
      error => {
        console.log(error.error);
        this.errorMessage = error.error.status
      }
    )

  }


  processImage(imageInput:any){
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = event.target.result
    });
    
    reader.readAsDataURL(file);
  }

}
