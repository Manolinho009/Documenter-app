import { Component } from '@angular/core';
import { Documentation } from '../documentation';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login/login.service';
import { DocumentationService } from '../../../services/api/documentation.service';

// Importe as bibliotecas necessárias
import * as imageSize from 'image-size';
import { NgxImageCompressService } from 'ngx-image-compress';

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
    ,private imageCompress: NgxImageCompressService
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


  file: any;
  localUrl: any;
  localCompressedURl: any;
  sizeOfOriginalImage: any;
  sizeOFCompressedImage: any;


  finalFile:any;
  compressFile(image: any, fileName: string) {
    
    const orientation = -1;
    this.sizeOfOriginalImage = this.imageCompress.byteCount(image) / (1024 * 1024);
    console.log('Size in bytes is now:', this.sizeOfOriginalImage);

    this.imageCompress.compressFile(image, orientation, 50, 50).then(result => {
      this.localCompressedURl = result;
      this.sizeOFCompressedImage = this.imageCompress.byteCount(result) / (1024 * 1024);
      console.log('Size in bytes after compression:', this.sizeOFCompressedImage);

      // Create a File object from the compressed data
      const imageBlob = this.dataURItoBlob(result.split(',')[1]);
      const imageFile = new File([imageBlob], fileName, { type: 'image/jpeg' });
      // Now you can send this compressed image file to an API using FormData

      console.log(imageFile);
      this.finalFile = imageFile
    });
  }

  // Helper function to convert data URI to Blob
  dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }
    return new Blob([arrayBuffer], { type: 'image/jpeg' });
  }


  processImage(imageInput:any){
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      // this.selectedFile = event.target.result;
      this.localUrl = event.target.result;
      this.compressFile(this.localUrl, this.file.name);

    });
    
    reader.readAsDataURL(file);
  }

}
