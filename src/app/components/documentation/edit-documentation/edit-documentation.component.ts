import { AfterViewInit, Component, EventEmitter, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { EditTableComponent } from './edit-table/edit-table.component';
import { DownloadPageService } from '../../../services/download-page.service';
import { StorageAcessService } from '../../../services/storage-acess.service';
import { ViewDocumentationComponent } from '../view-documentation/view-documentation.component';
import { EditProcedureComponent } from './edit-procedure/edit-procedure.component';
import { LoginService } from '../../../services/login/login.service';
import { DocumentationService } from '../../../services/api/documentation.service';
import { Documentation } from '../../../models/documentation';
import { User } from '../../../models/user';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { TagService } from '../../../services/api/tag.service';
import { Tag } from '../../../models/tag';
declare const bootstrap: any; 

@Component({
  selector: 'app-edit-documentation',
  templateUrl: './edit-documentation.component.html',
  styleUrl: './edit-documentation.component.css'
})
export class EditDocumentationComponent implements OnInit, AfterViewInit{


  modalNewSection:any
  modalCommit:any
  modalTag:any

  newTagColor:any = ''
  newTagText:any = ''

  @Output() onUpdateStorage: EventEmitter<any> = new EventEmitter();

  @ViewChildren(ViewDocumentationComponent) viewDocumentationComponents!: QueryList<ViewDocumentationComponent>;
  
  @ViewChildren(EditTableComponent) editTableComponents!: QueryList<EditTableComponent>;
  @ViewChildren(EditProcedureComponent) editProcedureComponents!: QueryList<EditProcedureComponent>;

  abaTables:any[] = []
  abaProcedures:any[] = []

  abaTableNameAtual:any = ''
  abaTableDescAtual:any = ''


  documentationVersion:any = 0
  documentationTitle:any = ''
  documentationCommitText:any = ''

  abaAtiva:number = 9999
  tipoAbaAtiva:any = ''
  abas:any[] = []

  tipoNovaAba:any = ''
  nomeNovaAba:any = ''
  
  currentHtml:any = ''
  loadDocumentacao:Documentation

  tagsList:any = []
  tagsSelecionadas:any = []
  tagsListSelect2:any = [];


  configSummerNote = {
    placeholder: '',
    tabsize: 2,
    height: 200,
    uploadImagePath: '/api/upload',
    toolbar: [
        ['misc', ['codeview', 'undo', 'redo']],
        ['style', ['bold', 'italic', 'underline', 'clear']],
        ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
        ['fontsize', ['fontname', 'fontsize', 'color']],
        ['para', ['style', 'ul', 'ol', 'paragraph', 'height']],
        ['insert', ['table', 'picture', 'link', 'video', 'hr']]
    ],
    fontNames: ['Helvetica', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Roboto', 'Times'],
  }

  conteudoEditor:any = ''
  focus: any;

  errorMessage:any = ''


  constructor(
    private downloadPageService:DownloadPageService,
    private storageAcessService:StorageAcessService,
    private loginService: LoginService,
    private documentationService:DocumentationService,
    private tagService:TagService,
    private cookieService: CookieService,
    private router: Router
     ){
      this.loadDocumentacao = new Documentation(
        {usuarioAlteracao:this.loginService.getUser()}
    )
     }



  
  createTag(){
    console.log(this.newTagColor);
    console.log(this.newTagText);

    if(this.newTagText == ''){
      
      this.errorMessage = 'Preencha o Campo: Texto Tag'
      return
    }

    const retorno = this.tagService.createTag(new Tag(this.newTagText, this.newTagColor))
    retorno.subscribe(
      response=>{
        console.log(response.status);
        this.errorMessage = response.status

        this.limparCampos()
        this.modalTag.hide()
        this.modalCommit.show()
        this.carregarTags()
      },
      error=>{
        console.log(error.error.status);
        this.errorMessage = error.error.status
        
      }
    )
  }

  limparCampos(){
    this.errorMessage = ''
    this.tipoNovaAba = ''
    this.nomeNovaAba = ''
  }

  goTo(path:any = '/'){
    this.router.navigate([path])
  }

  commit(){


    if (this.documentationCommitText == '') {
      this.errorMessage = 'Preencha o campo: CommitText'
      return
    }


    this.loadDocumentacao.abasAlteradas = []

    this.abas.forEach((sec,i)=>{
      
      if(sec.changes == 1){
        this.loadDocumentacao.abasAlteradas.push(sec) 
        console.log(sec);
      }

      this.abas[i].changes = 0

    })
    
    this.documentationVersion += 1
    this.loadDocumentacao.versao = this.documentationVersion;
    this.loadDocumentacao.commitText = this.documentationCommitText
    this.loadDocumentacao.tags = this.tagsSelecionadas
    
    console.log(this.loadDocumentacao.abasAlteradas);
    
    this.updateStorage()

    const retorno = this.documentationService.updateDocumentation(
      this.loadDocumentacao
    )
    retorno.subscribe(
      response => {
        console.log(response);

        this.documentationCommitText = ''
        this.limparCampos()
        
        this.modalCommit.hide()
      },
      error => {
        console.log(error.error);
        this.errorMessage = error.error
      }
    )
  }
  

  exportar(){
    this.downloadPageService.salvarHTML()

  }

  copiarTexto(texto: string): void {
    const tempTextArea = document.createElement("textarea");
    tempTextArea.value = texto;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand("copy");
    document.body.removeChild(tempTextArea);
  }

  deleteSection(sectionId:any){
    this.abas.splice(sectionId, 1);
    this.loadDocumentacao.abas = this.abas
    this.updateStorage()

    if(this.abas.length > 0){
      this.selectSection(this.abas[0],0)
    }else{
      this.abaAtiva = 9999
      this.tipoAbaAtiva = ''
    }
  }

  createSection(){

    if (this.nomeNovaAba == '') {
      this.errorMessage = 'Preencha o campo: Titulo'
      return
    }
    if (this.tipoNovaAba == '') {
      this.errorMessage = 'Selecione um Tipo'
      return
    }

    const novaSection = {
      tipo: this.tipoNovaAba
      , nome: this.nomeNovaAba
      , html:''
      , tables:[]
      , procedures:[]
      , changes:1
    }
    const index = this.abas.length

    this.abas.push(novaSection)

    this.selectSection(novaSection,index)

    this.loadDocumentacao.abas = this.abas
    this.updateStorage()
    this.limparCampos()

    this.modalNewSection.hide()
  }


  selectSection(section:any,index:number ){
    this.abaAtiva = index;
    this.currentHtml = section.nome+' - '+section.html;
    this.conteudoEditor = section.html
    this.tipoAbaAtiva = section.tipo
    this.abaTables = section.tables
    this.abaProcedures = section.procedures
  }


  setHtmlContent(event:any){

    this.currentHtml = event
    this.conteudoEditor = event

    const ativa = this.abaAtiva

    this.abas[ativa].html = event
    this.abas[ativa].tables = this.abaTables
    this.abas[ativa].procedures = this.abaProcedures
    this.abas[ativa].changes = 1

    this.loadDocumentacao.abas = this.abas

    this.updateStorage()
  }

  deleteTable(index:any){
    
    const ativa = this.abaAtiva
    this.abaTables.splice(index,1)

    this.abas[ativa].tables = this.abaTables
    this.abas[ativa].changes = 1

    this.loadDocumentacao.abas = this.abas
    this.updateStorage()  }

  deleteProcedures(index:any){
    console.log(index);
    
    const ativa = this.abaAtiva
    this.abaProcedures.splice(index,1)

    this.abas[ativa].procedures = this.abaProcedures
    this.abas[ativa].changes = 1

    this.loadDocumentacao.abas = this.abas
    this.updateStorage()  }

  addTabela(){
    const now = new Date();
    
    this.abaTables.push(
      {
        colunas:[],
        titulo:this.abaTableNameAtual,
        descricao:this.abaTableDescAtual,
        dataAlteracao: now.toLocaleString()
      }
    )

    const ativa = this.abaAtiva
    this.abas[ativa].tables = this.abaTables
    this.abas[ativa].changes = 1

    this.loadDocumentacao.abas = this.abas

    this.updateStorage()

  }
  addProcedure(){
    const now = new Date();
    
    this.abaProcedures.push(
      {
        params:[],
        titulo:this.abaTableNameAtual,
        descricao:this.abaTableDescAtual,
        dataAlteracao: now.toLocaleString()
      }
    )

    const ativa = this.abaAtiva
    this.abas[ativa].procedures = this.abaProcedures
    this.abas[ativa].changes = 1

    this.loadDocumentacao.abas = this.abas

    this.updateStorage()

  }

  editTabelas(table:any){

    console.log('dojfndspijndfiounsfpib',table);
    
    this.editTableComponents.forEach(editTableComponent => {
      
      if( editTableComponent.index == table.index ) {
        console.log(this.abaTables);
        
        this.abaTables[editTableComponent.index].descricao = table.descricaoTabela
        this.abaTables[editTableComponent.index].titulo = table.titulo
        this.abaTables[editTableComponent.index].colunas = table.colunas
        this.abaTables[editTableComponent.index].dataAlteracao = table.dataAlteracao
      }
    });

    const ativa = this.abaAtiva
    this.abas[ativa].tables = this.abaTables
    this.abas[ativa].changes = 1

    this.loadDocumentacao.abas = this.abas

    this.updateStorage()
  }
  
  // editProcedures(params:any){
  //   console.log(params);
  //   // ===
  //   this.editProcedureComponents.forEach(editProcedureComponent => {
  //     this.abaProcedures[editProcedureComponent.index].params = params
  //   });

    
  //   const ativa = this.abaAtiva
  //   this.abas[ativa].procedures = this.abaProcedures
  //   this.abas[ativa].changes = 1

  //   this.loadDocumentacao.abas = this.abas

  //   this.updateStorage()
  // }


  editProcedures(procedure:any){
    console.log(procedure);
    // ===
    this.editProcedureComponents.forEach(editProcedureComponent => {
      
      if( editProcedureComponent.index == procedure.index ) {
        this.abaProcedures[editProcedureComponent.index].descricao = procedure.descricaoProcedure
        this.abaProcedures[editProcedureComponent.index].params = procedure.params
        this.abaProcedures[editProcedureComponent.index].titulo = procedure.titulo
        this.abaProcedures[editProcedureComponent.index].dataAlteracao = procedure.dataAlteracao
      }
    });

    
    const ativa = this.abaAtiva
    this.abas[ativa].procedures = this.abaProcedures
    this.abas[ativa].changes = 1

    this.loadDocumentacao.abas = this.abas

    this.updateStorage()
  }



  updateStorage(){
    this.loadDocumentacao.dataAlteracao = new Date().toLocaleString()
    this.loadDocumentacao.usuarioAlteracao = this.loginService.getUser()
    
    this.storageAcessService.updateStorage(this.loadDocumentacao)
    this.storageAcessService.addDocumentationList(this.loadDocumentacao)

    this.onUpdateStorage.emit(this.loadDocumentacao)

    this.viewDocumentationComponents.forEach(viewDocumentationComponent => {
      viewDocumentationComponent.reload()
    });
  }



  carregarTags(){
    const retornoTag = this.documentationService.listTags()
    retornoTag.subscribe(
      response => {

        let tags:any =[]
        response.forEach((element: any) => {
          tags.push(element)
          this.tagsListSelect2.push(
            {
              value: element,
              label: element,
              data: { color: 'green', name: element },
            }
          )
        });

        this.tagsList = tags
        console.log(tags);

        
      },
      error => {
        console.log(error.error);
      }
    )
  }

  ngOnInit(): void {
    const loadDocumentacaoStorage = this.storageAcessService.changeStorage()

    
    this.loadDocumentacao = new Documentation(
      {
        titulo: loadDocumentacaoStorage.titulo
        ,usuarioAlteracao: this.loginService.getUser()
        ,descricao: loadDocumentacaoStorage.descricao
        ,abas: loadDocumentacaoStorage.abas
        ,commitText: loadDocumentacaoStorage.commitText
        ,abasAlteradas: loadDocumentacaoStorage.abasAlteradas
        ,versao: loadDocumentacaoStorage.versao
        ,status: loadDocumentacaoStorage.status
        ,dataAlteracao: loadDocumentacaoStorage.dataAlteracao
      }
      
    )
    
    this.loadDocumentacao.imagemCapa = loadDocumentacaoStorage.imagemCapa
    this.abas = this.loadDocumentacao.abas
    this.documentationTitle = this.loadDocumentacao.titulo
    this.documentationVersion = parseFloat(this.loadDocumentacao.versao)


    this.carregarTags()
  }

  
  ngAfterViewInit(): void {
    // Inicializa os popovers do Bootstrap
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
      const pop =  new bootstrap.Popover(popoverTriggerEl,{
        delay: { "show": 100, "hide": 100 }
      });

      pop._element.addEventListener('show.bs.popover', () => {
      
        setTimeout(() => {
          pop.hide();
        }, 1000); 
        
      })
    });
    
    // Fecha o popover após 5 segundos

    this.modalNewSection = new bootstrap.Modal('#newSectionModal')
    this.modalCommit = new bootstrap.Modal('#saveDocModal')
    this.modalTag = new bootstrap.Modal('#novaTagModal')

  }



}
