import { Component } from '@angular/core';
import { Documentation } from '../documentation';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login/login.service';
import { DocumentationService } from '../../../services/api/documentation.service';

// Importe as bibliotecas necessárias
import * as imageSize from 'image-size';
import { NgxImageCompressService } from 'ngx-image-compress';
import { ImageService } from '../../../services/image.service';

@Component({
  selector: 'app-new-documentation',
  templateUrl: './new-documentation.component.html',
  styleUrl: './new-documentation.component.css'
})
export class NewDocumentationComponent {

  titulo:any = '';
  descricao:any = '';
  documentacaoModelo:Documentation | undefined;
  
  validaTitulo:boolean = true


  selectedFile: any;

  errorMessage:any = ''

  constructor(
    private router: Router
    ,private loginService: LoginService
    ,private documentationService: DocumentationService
    ,private imageCompress: NgxImageCompressService
    ,private imageService : ImageService
  ){}

  criarNovaDocumentacao(){


    if (this.titulo == ''){
      this.validaTitulo = false
      return
    }

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




  
  selecionarImagem(imagemInput:any){
    this.imageService.processImage(imagemInput, (event:any) => {

      if (event.type === "loadend") {
        const processFile = event.target.result;

        this.imageService.gerarFile(processFile).then((result)=>{
          const imagemComprimida = result
          this.selectedFile = imagemComprimida
        });
        
      }
    });
  }

}
