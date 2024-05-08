import { Component } from '@angular/core';
import { Documentation } from '../../../models/documentation';
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
      {
        titulo: this.titulo
        , usuarioAlteracao: this.loginService.getUser()
        , descricao: this.descricao
      }
    )

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

  // addUserDocumentation(){
    
  //   const selectedUser = this.loginService.getUser()
  //   let idUser = selectedUser.id


  //   const retorno = this.documentationService.addUsersDocumentation(this.documentacaoModelo,idUser)
  //   retorno.subscribe(
  //     response=>{
  //       console.log(response);
  //     }
  //     ,error=>{
  //       console.log(error.error.status);

  //       this.errorMessage = error.error.status
        
        
  //     }
  //   )
  // }



  
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


  
  goTo(path:any = '/'){
    this.router.navigate([path])
  }


}
