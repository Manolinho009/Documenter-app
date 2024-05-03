import { AfterViewInit, Component, EventEmitter, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { EditTableComponent } from './edit-table/edit-table.component';
import { DownloadPageService } from '../../../services/download-page.service';
import { StorageAcessService } from '../../../services/storage-acess.service';
import { ViewDocumentationComponent } from '../view-documentation/view-documentation.component';
import { EditProcedureComponent } from './edit-procedure/edit-procedure.component';
import { LoginService } from '../../../services/login/login.service';
import { DocumentationService } from '../../../services/api/documentation.service';
import { Documentation } from '../documentation';
import { User } from '../../../models/user';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Select2Data } from 'ng-select2-component';
declare const bootstrap: any; 

@Component({
  selector: 'app-edit-documentation',
  templateUrl: './edit-documentation.component.html',
  styleUrl: './edit-documentation.component.css'
})
export class EditDocumentationComponent implements OnInit, AfterViewInit{


  modalNewSection:any

  @Output() onUpdateStorage: EventEmitter<any> = new EventEmitter();

  @ViewChildren(ViewDocumentationComponent) viewDocumentationComponents!: QueryList<ViewDocumentationComponent>;
  
  @ViewChildren(EditTableComponent) editTableComponents!: QueryList<EditTableComponent>;
  @ViewChildren(EditProcedureComponent) editProcedureComponents!: QueryList<EditProcedureComponent>;
  sectionTables:any[] = []
  sectionProcedures:any[] = []

  sectionTableNameAtual:any = ''
  sectionTableDescAtual:any = ''


  documentationVersion:any = 0
  documentationTitle:any = ''
  documentationCommitText:any = ''

  sectionAtiva:number = 9999
  tipoSectionAtiva:any = ''
  sections:any[] = []

  tipoNovaSection:any = ''
  nomeNovaSection:any = ''
  
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
    private cookieService: CookieService,
    private router: Router
     ){
      this.loadDocumentacao = new Documentation(
        undefined
        ,this.loginService.getUser()
    )
     }



  limparCampos(){
    this.errorMessage = ''
    this.tipoNovaSection = ''
    this.nomeNovaSection = ''
  }

  goTo(path:any = '/'){
    this.router.navigate([path])
  }

  commit(){
    
    this.sections.forEach((sec,i)=>{
      this.sections[i].changes = 0
    })
    
    this.loadDocumentacao.version = this.documentationVersion + 1;
    this.loadDocumentacao.commitText = this.documentationCommitText
    this.loadDocumentacao.tags = this.tagsSelecionadas

    this.updateStorage()

    const retorno = this.documentationService.updateDocumentation(
      this.loadDocumentacao
    )
    retorno.subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error.error);
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
    this.sections.splice(sectionId, 1);
    this.loadDocumentacao.sections = this.sections
    this.updateStorage()

    this.selectSection(this.sections[0],0)
  }

  createSection(){

    if (this.nomeNovaSection == '') {
      this.errorMessage = 'Preencha o campo: Titulo'
      return
    }
    if (this.tipoNovaSection == '') {
      this.errorMessage = 'Selecione um Tipo'
      return
    }

    const novaSection = {
      tipo: this.tipoNovaSection
      , nome: this.nomeNovaSection
      , html:''
      , tables:[]
      , procedures:[]
      , changes:1
    }
    const index = this.sections.length

    this.sections.push(novaSection)

    this.selectSection(novaSection,index)

    this.loadDocumentacao.sections = this.sections
    this.updateStorage()
    this.limparCampos()

    this.modalNewSection.hide()
  }


  selectSection(section:any,index:number ){
    this.sectionAtiva = index;
    this.currentHtml = section.nome+' - '+section.html;
    this.conteudoEditor = section.html
    this.tipoSectionAtiva = section.tipo
    this.sectionTables = section.tables
    this.sectionProcedures = section.procedures
  }


  setHtmlContent(event:any){

    this.currentHtml = event
    this.conteudoEditor = event

    const ativa = this.sectionAtiva

    this.sections[ativa].html = event
    this.sections[ativa].tables = this.sectionTables
    this.sections[ativa].procedures = this.sectionProcedures
    this.sections[ativa].changes = 1

    this.loadDocumentacao.sections = this.sections

    this.updateStorage()
  }

  deleteTable(index:any){
    
    const ativa = this.sectionAtiva
    this.sectionTables.splice(index,1)

    this.sections[ativa].tables = this.sectionTables
    this.sections[ativa].changes = 1

    this.loadDocumentacao.sections = this.sections
    this.updateStorage()  }

  deleteProcedures(index:any){
    console.log(index);
    
    const ativa = this.sectionAtiva
    this.sectionProcedures.splice(index,1)

    this.sections[ativa].procedures = this.sectionProcedures
    this.sections[ativa].changes = 1

    this.loadDocumentacao.sections = this.sections
    this.updateStorage()  }

  addTabela(){
    const now = new Date();
    
    this.sectionTables.push(
      {
        colunas:[],
        titulo:this.sectionTableNameAtual,
        descricao:this.sectionTableDescAtual,
        dh_alteracao: now.toLocaleString()
      }
    )

    const ativa = this.sectionAtiva
    this.sections[ativa].tables = this.sectionTables
    this.sections[ativa].changes = 1

    this.loadDocumentacao.sections = this.sections

    this.updateStorage()

  }
  addProcedure(){
    const now = new Date();
    
    this.sectionProcedures.push(
      {
        params:[],
        titulo:this.sectionTableNameAtual,
        descricao:this.sectionTableDescAtual,
        dh_alteracao: now.toLocaleString()
      }
    )

    const ativa = this.sectionAtiva
    this.sections[ativa].procedures = this.sectionProcedures
    this.sections[ativa].changes = 1

    this.loadDocumentacao.sections = this.sections

    this.updateStorage()

  }

  editTabelas(table:any){

    console.log(table);
    
    this.editTableComponents.forEach(editTableComponent => {
      
      if( editTableComponent.index == table.index ) {
        this.sectionProcedures[editTableComponent.index].descricaoTabela = table.descricaoTabela
        this.sectionProcedures[editTableComponent.index].titulo = table.titulo
        this.sectionProcedures[editTableComponent.index].colunas = table.colunas
        this.sectionProcedures[editTableComponent.index].dh_alteracao = table.dh_alteracao
      }
    });

    const ativa = this.sectionAtiva
    this.sections[ativa].tables = this.sectionTables
    this.sections[ativa].changes = 1

    this.loadDocumentacao.sections = this.sections

    this.updateStorage()
  }
  
  // editProcedures(params:any){
  //   console.log(params);
  //   // ===
  //   this.editProcedureComponents.forEach(editProcedureComponent => {
  //     this.sectionProcedures[editProcedureComponent.index].params = params
  //   });

    
  //   const ativa = this.sectionAtiva
  //   this.sections[ativa].procedures = this.sectionProcedures
  //   this.sections[ativa].changes = 1

  //   this.loadDocumentacao.sections = this.sections

  //   this.updateStorage()
  // }


  editProcedures(procedure:any){
    console.log(procedure);
    // ===
    this.editProcedureComponents.forEach(editProcedureComponent => {
      
      if( editProcedureComponent.index == procedure.index ) {
        this.sectionProcedures[editProcedureComponent.index].descricaoProcedure = procedure.descricaoProcedure
        this.sectionProcedures[editProcedureComponent.index].params = procedure.params
        this.sectionProcedures[editProcedureComponent.index].titulo = procedure.titulo
        this.sectionProcedures[editProcedureComponent.index].dh_alteracao = procedure.dh_alteracao
      }
    });

    
    const ativa = this.sectionAtiva
    this.sections[ativa].procedures = this.sectionProcedures
    this.sections[ativa].changes = 1

    this.loadDocumentacao.sections = this.sections

    this.updateStorage()
  }



  updateStorage(){
    this.loadDocumentacao.dh_alteracao = new Date().toLocaleString()
    this.loadDocumentacao.user_alteracao = this.loginService.getUser()
    
    this.storageAcessService.updateStorage(this.loadDocumentacao)
    this.storageAcessService.addDocumentationList(this.loadDocumentacao)

    this.onUpdateStorage.emit(this.loadDocumentacao)

    this.viewDocumentationComponents.forEach(viewDocumentationComponent => {
      viewDocumentationComponent.reload()
    });
  }

  ngOnInit(): void {
    const loadDocumentacaoStorage = this.storageAcessService.changeStorage()
    this.loadDocumentacao = new Documentation(
      loadDocumentacaoStorage.titulo,
      this.loginService.getUser(),
      loadDocumentacaoStorage.descricao,
      loadDocumentacaoStorage.sections,
      loadDocumentacaoStorage.commitText,
      loadDocumentacaoStorage.sectionsChanges,
      loadDocumentacaoStorage.version,
      loadDocumentacaoStorage.status,
      loadDocumentacaoStorage.dh_alteracao,
      
    )
    
    this.loadDocumentacao.imagemCapa = loadDocumentacaoStorage.imagemCapa
    this.sections = this.loadDocumentacao.sections
    this.documentationTitle = this.loadDocumentacao.titulo
    this.documentationVersion = parseFloat(this.loadDocumentacao.version)

    
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

  }



}
