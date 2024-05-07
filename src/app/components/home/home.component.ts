import { Component, OnInit } from '@angular/core';
import { StorageAcessService } from '../../services/storage-acess.service';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { DocumentationService } from '../../services/api/documentation.service';
import { CookieService } from 'ngx-cookie-service';
import { ImageService } from '../../services/image.service';
import { Documentation } from '../documentation/documentation';
import { User } from '../../models/user';
declare const bootstrap: any; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {


  dropdownUsers:any 

  documentationUserLists: any = []
  documentationEdit:Documentation = new Documentation('',new User('','',''))

  addUserDocumentationValue:any = ''
  usersList:any = []

  listDocumentations : any = []
  imagemPerfilSelecionada:any = undefined

  errorMessage:any = ''

  constructor(
    private storageAcessService : StorageAcessService
    , private router: Router
    , public loginService: LoginService
    , private documentationService : DocumentationService
    , private cookieService: CookieService
    , private imageService : ImageService
  ){}

  deleteUserDocumentation(user:any){
    console.log(user);
    
    const retorno = this.documentationService.deleteUsersDocumentation(this.documentationEdit,user)
    retorno.subscribe(
      response=>{
        console.log(response);
        this.errorMessage = ''
        this.carregarListaUsuarios(this.documentationEdit)
      }
      ,error=>{
        console.log(error.error.status);

        this.errorMessage = error.error.status
      }
    )
  }

  addUserDocumentation(){
    
    const selectedUser = this.addUserDocumentationValue
    let idUser = selectedUser.split('-')[0]


    const retorno = this.documentationService.addUsersDocumentation(this.documentationEdit,idUser)
    retorno.subscribe(
      response=>{
        console.log(response);
        
        this.dropdownUsers.hide()
        this.errorMessage = ''
        this.carregarListaUsuarios(this.documentationEdit)
      }
      ,error=>{
        console.log(error.error.status);

        this.errorMessage = error.error.status
        
        
      }
    )
  }

  carregarListaUsuarios(documentation:Documentation){

    this.documentationEdit = documentation

    const retorno = this.documentationService.selectUsersDocumentation(documentation);
    retorno.subscribe(
      response=>{
        let result: User[] = []
        response.forEach((element: any) => {
          let user = new User(
              ''
              ,''
              ,element.nome
            )

            user.funcao = element.funcao
            user.id = element.id
            
            result.push(user)
        });
        console.log(result);
        
        this.documentationUserLists = result

      },
      error=>{
        console.log(error.error);
        
      }
    )

  }



  carregarDocumentacao(documentation:Documentation){
    this.storageAcessService.updateStorage(documentation)
    this.router.navigate(['/documentation/edit'])
  }


  deleteDocumentation(documentation:any){
    console.log(documentation);


    if (confirm('Deseja mesmo deletar a documentação : '+documentation.titulo)) {
      const retorno = this.documentationService.deleteDocumentation(documentation)
      retorno.subscribe(
        result=>{
          console.log(result);
          this.ngOnInit()
        }
        ,error=>{
          console.log(error);
          
        }
      )
    }
    
  }

  separarTags(tag:string){
    const arr = tag.split(';');
    let finalArr:any = [];
    arr.forEach((element)=>{

      finalArr.push({'tagName':element.split(':')[0], 'tagColor':element.split(':')[1], 'TagId':element.split(':')[3] })
    })

    return finalArr
  }


  deletarTagDocumentacao(idDoc:any,idTag:any){
    console.log(idDoc,idTag);
    
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


  ngAfterViewInit(): void {

    const dropdownElement = document.querySelector('#dropDownUsers')
    console.log(dropdownElement);
    const dropdownUsers = new bootstrap.Dropdown(dropdownElement)
    console.log(dropdownUsers);

    this.dropdownUsers = dropdownUsers
    
  }

  ngOnInit(): void {
    
    const retornoUsuarios = this.loginService.getAllUser()
    retornoUsuarios.subscribe(
      response=>{
        console.log(response);
        
        response.map((value: any)=>{
            let user = new User(
              value.login
              ,''
              ,value.nome
            )
            user.imagem = value.imagem
            user.id = value.id
            user.funcao = value.funcao

            this.usersList.push(user)
        })
      }
      ,error=>{
        console.log(error);
        
      }
    )


    const retorno = this.documentationService.listDocumentations()
    retorno.subscribe(
      response => {
        console.log(response);
        let docs:any =[]
        response.forEach((element: any) => {
          let doc = new Documentation(
            element.titulo
            , element.usuarioAlteracao
            , element.descricao
            , element.abas
            , element.commitText
            , []
            , element.versao
            , element.status
            , element.dataAlteracao
          )
          doc.id = element.id
          doc.imagemCapa = element.imagemCapa
          doc.tags = element.tags
          docs.push(doc)
          
        });

        this.listDocumentations = docs
      },
      error => {
        console.log(error.error);
      }
    )
  }


  redirectTo(goto:string){
    this.router.navigate([goto])
  }
}
