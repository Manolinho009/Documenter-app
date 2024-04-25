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
  descricao:any = '';
  documentacaoModelo:Documentation | undefined;
  
  selectedFile: any;

  constructor(
    private router: Router
    ,private loginService: LoginService
  ){}

  criarNovaDocumentacao(){
    console.log(this.titulo);
    
    this.documentacaoModelo = new Documentation(
      this.titulo
      , this.loginService.getUser()
      , this.descricao
    )

    this.documentacaoModelo.imagemCapa = this.selectedFile

    localStorage.setItem('novaDocumentacao', 
      JSON.stringify(this.documentacaoModelo)
    );

    this.router.navigate(['/documentation/edit']);
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
