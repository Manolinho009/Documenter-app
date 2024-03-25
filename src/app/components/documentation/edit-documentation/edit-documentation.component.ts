import { Component, EventEmitter, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { EditTableComponent } from './edit-table/edit-table.component';
import { DownloadPageService } from '../../../services/download-page.service';
import { StorageAcessService } from '../../../services/storage-acess.service';
import { ViewDocumentationComponent } from '../view-documentation/view-documentation.component';

@Component({
  selector: 'app-edit-documentation',
  templateUrl: './edit-documentation.component.html',
  styleUrl: './edit-documentation.component.css'
})
export class EditDocumentationComponent implements OnInit{

  @Output() onUpdateStorage: EventEmitter<any> = new EventEmitter();

  @ViewChildren(ViewDocumentationComponent) viewDocumentationComponents!: QueryList<ViewDocumentationComponent>;
  
  @ViewChildren(EditTableComponent) editTableComponents!: QueryList<EditTableComponent>;
  sectionTables:any[] = []
  sectionTableNameAtual:any = ''


  documentationVersion:any = 0
  documentationTitle:any = ''
  documentationCommitText:any = ''

  sectionAtiva:number = 9999
  tipoSectionAtiva:any = ''
  sections:any[] = []

  tipoNovaSection:any = ''
  nomeNovaSection:any = ''
  
  currentHtml:any = ''
  loadDocumentacao:any

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


  constructor(private downloadPageService:DownloadPageService,private storageAcessService:StorageAcessService ){}

  exportar(){
    this.sections.forEach((sec,i)=>{
      this.sections[i].changes = 0
    })
    this.loadDocumentacao.version = this.documentationVersion + 1;
    this.loadDocumentacao.commitText = this.documentationCommitText
    
    this.updateStorage()
    this.downloadPageService.salvarHTML()
  }


  createSection(){
    this.sections.push({
        tipo: this.tipoNovaSection
        , nome: this.nomeNovaSection
        , html:''
        , tables:[]
        , changes:1
      })
    this.loadDocumentacao.sections = this.sections
    
    this.updateStorage()
  }


  selectSection(section:any,index:number ){
    this.sectionAtiva = index;
    this.currentHtml = section.nome+' - '+section.html;
    this.conteudoEditor = section.html
    this.tipoSectionAtiva = section.tipo
    this.sectionTables = section.tables
  }


  setHtmlContent(event:any){

    this.currentHtml = event
    this.conteudoEditor = event

    const ativa = this.sectionAtiva

    this.sections[ativa].html = event
    this.sections[ativa].tables = this.sectionTables
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

  addTabela(){
    const now = new Date();
    
    this.sectionTables.push(
      {
        colunas:[],
        titulo:this.sectionTableNameAtual,
        dh_alteracao: now.toLocaleTimeString()
      }
    )

    const ativa = this.sectionAtiva
    this.sections[ativa].tables = this.sectionTables
    this.sections[ativa].changes = 1

    this.loadDocumentacao.sections = this.sections

    this.updateStorage()

  }

  editTabelas(colunas:any){
    console.log(colunas);
    
    this.editTableComponents.forEach(editTableComponent => {
      this.sectionTables[editTableComponent.index].colunas = colunas
    });

    
    const ativa = this.sectionAtiva
    this.sections[ativa].tables = this.sectionTables
    this.sections[ativa].changes = 1

    this.loadDocumentacao.sections = this.sections

    this.updateStorage()
  }



  updateStorage(){
    this.storageAcessService.updateStorage(this.loadDocumentacao)
    this.onUpdateStorage.emit(this.loadDocumentacao)

    this.viewDocumentationComponents.forEach(viewDocumentationComponent => {
      viewDocumentationComponent.reload()
    });
  }

  ngOnInit(): void {
    
    this.loadDocumentacao = this.storageAcessService.changeStorage()
    this.sections = this.loadDocumentacao.sections
    this.documentationTitle = this.loadDocumentacao.titulo
    this.documentationVersion = parseFloat(this.loadDocumentacao.version)
  }


}
