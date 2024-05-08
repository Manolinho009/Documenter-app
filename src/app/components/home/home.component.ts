import { Component, OnInit } from '@angular/core';
import { StorageAcessService } from '../../services/storage-acess.service';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { DocumentationService } from '../../services/api/documentation.service';
import { CookieService } from 'ngx-cookie-service';
import { ImageService } from '../../services/image.service';
import { Documentation } from '../../models/documentation';
import { User } from '../../models/user';
declare const bootstrap: any; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {


  dropdownUsers:any 

  documentationUserLists: User[] = []
  documentationEdit:Documentation = new Documentation({usuarioAlteracao:new User()})

  addUserDocumentationValue:any = ''
  usersList:User[] = []

  listDocumentations : Documentation[] = []
  imagemPerfilSelecionada:any = undefined

  acoesAcesso: any 


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
              {
                nome: element.nome
              }
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
    const dropdownUsers = new bootstrap.Dropdown(dropdownElement)
    this.dropdownUsers = dropdownUsers
    
  }

  ngOnInit(): void {
    
    const retornoUsuarios = this.loginService.getAllUser()
    retornoUsuarios.subscribe(
      response=>{
        console.log(response);
        
        response.map((value: any)=>{
            let user = new User(
              {
                login: value.login
                ,nome: value.nome
              }
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
            {
              titulo: element.titulo
              , usuarioAlteracao: new User(element.usuarioAlteracao)
              , descricao: element.descricao
              , abas: element.abas
              , commitText: element.commitText
              , versao: element.versao
              , status: element.status
              , dataAlteracao: element.dataAlteracao
              , imagemCapa: element.imagemCapa
              , id: element.id
              , tags: element.tags
            }
          )
          const userDocumentationsAcess = this.loginService.getUser().projetos
          if( element.id in userDocumentationsAcess){
            doc.acessoUsuario = userDocumentationsAcess[element.id]          
          }
          docs.push(doc)
          
        });

        this.listDocumentations = docs
        console.log(this.listDocumentations);
        
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
