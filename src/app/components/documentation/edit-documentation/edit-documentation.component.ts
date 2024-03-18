import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-documentation',
  templateUrl: './edit-documentation.component.html',
  styleUrl: './edit-documentation.component.css'
})
export class EditDocumentationComponent implements OnInit{

  documentationTitle:any = ''

  sectionAtiva:number = 9999
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

  createSection(){
    this.sections.push({tipo: this.tipoNovaSection, nome: this.nomeNovaSection, html:''})
    this.loadDocumentacao.sections = this.sections
    
    localStorage.setItem('novaDocumentacao',JSON.stringify(this.loadDocumentacao))

  }


  selectSection(section:any,index:number ){
    this.sectionAtiva = index;
    this.currentHtml = section.nome+' - '+section.html;
    this.conteudoEditor = section.html
  }


  setHtmlContent(event:any){

    this.currentHtml = event
    this.conteudoEditor = event

    const ativa = this.sectionAtiva

    this.sections[ativa].html = event
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
