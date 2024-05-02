import { Component, OnInit } from '@angular/core';
import { StorageAcessService } from '../../services/storage-acess.service';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { DocumentationService } from '../../services/api/documentation.service';
import { CookieService } from 'ngx-cookie-service';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {


  listDocumentations : any = []
  imagemPerfilSelecionada:any = undefined


  constructor(
    private storageAcessService : StorageAcessService
    , private router: Router
    , public loginService: LoginService
    , private documentationService : DocumentationService
    , private cookieService: CookieService
    , private imageService : ImageService
  ){}

  carregarDocumentacao(documentation:any){
    this.storageAcessService.updateStorage(documentation)
    this.router.navigate(['/documentation/edit'])
  }



  alterarImagemPerfil(){

    let user = this.loginService.getUser()

    user.imagem = this.imagemPerfilSelecionada

    const retorno = this.loginService.alterarImagemUser(user)
    retorno.subscribe(
      response => {
        console.log(response);
        
      }
      ,error => {
        console.log(error);

      }
    )
  }



  selecionarImagem(imagemInput:any){
    this.imageService.processImage(imagemInput, (event:any) => {

      if (event.type === "loadend") {
        const processFile = event.target.result;

        this.imageService.gerarFile(processFile).then((result)=>{
          const imagemComprimida = result
          this.imagemPerfilSelecionada = imagemComprimida
        });
        
      }
    });
  }


  getUserImage(): string{
    const imagem = this.cookieService.get('imagemPerfil')
    return imagem
  }


  ngOnInit(): void {
    
    const retorno = this.documentationService.listDocumentations()
    retorno.subscribe(
      response => {
        console.log(response);
        let docs:any =[]
        response.forEach((element: any) => {
          docs.push(element)
        });

        console.log(docs);
        this.listDocumentations = docs
      },
      error => {
        console.log(error.error);
      }
    )

    // const documentationList = this.storageAcessService.listDocumentations()
    // this.listDocumentations = Object.keys(documentationList).map((key)=>{return documentationList[key]})
    
    console.log(this.listDocumentations);
    console.log(this.loginService.getUser());
    
  }


  redirectTo(goto:string){
    this.router.navigate([goto])
  }
}
