import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { EditTableComponent } from './edit-table/edit-table.component';

@Component({
  selector: 'app-edit-documentation',
  templateUrl: './edit-documentation.component.html',
  styleUrl: './edit-documentation.component.css'
})
export class EditDocumentationComponent implements OnInit{

  
  @ViewChildren(EditTableComponent) editTableComponents!: QueryList<EditTableComponent>;
  sectionTables:any[] = []
  sectionTableNameAtual:any = ''


  documentationTitle:any = ''

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



  exportar(){
    

  }


  createSection(){
    this.sections.push({tipo: this.tipoNovaSection, nome: this.nomeNovaSection, html:'', tables:[]})
    this.loadDocumentacao.sections = this.sections
    
    localStorage.setItem('novaDocumentacao',JSON.stringify(this.loadDocumentacao))

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

    this.loadDocumentacao.sections = this.sections

    localStorage.setItem('novaDocumentacao',JSON.stringify(this.loadDocumentacao))

  }

  deleteTable(index:any){
    
    const ativa = this.sectionAtiva
    this.sectionTables.splice(index,1)

    this.sections[ativa].tables = this.sectionTables

    this.loadDocumentacao.sections = this.sections
    localStorage.setItem('novaDocumentacao',JSON.stringify(this.loadDocumentacao))
  }

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

    this.loadDocumentacao.sections = this.sections

    localStorage.setItem('novaDocumentacao',JSON.stringify(this.loadDocumentacao))


  }

  editTabelas(colunas:any){
    console.log(colunas);
    
    this.editTableComponents.forEach(editTableComponent => {
      this.sectionTables[editTableComponent.index].colunas = colunas
    });

    
    const ativa = this.sectionAtiva
    this.sections[ativa].tables = this.sectionTables

    this.loadDocumentacao.sections = this.sections

    localStorage.setItem('novaDocumentacao',JSON.stringify(this.loadDocumentacao))

  
  }

  ngOnInit(): void {
    
    const valorLocalStorage = localStorage.getItem('novaDocumentacao')

    if (valorLocalStorage) {
      this.loadDocumentacao = JSON.parse(valorLocalStorage);

      this.sections = this.loadDocumentacao.sections
      this.documentationTitle = this.loadDocumentacao.titulo

      console.log('Objeto do localStorage:', this.loadDocumentacao);
    } else {
      console.log('Nenhum valor encontrado no localStorage.');
    }
  }


}
