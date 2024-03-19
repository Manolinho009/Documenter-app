import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-documentation',
  templateUrl: './view-documentation.component.html',
  styleUrl: './view-documentation.component.css'
})
export class ViewDocumentationComponent implements OnInit{


  sections:any[] = []
  loadDocumentacao:any

  
  ngOnInit():void {
    const valorLocalStorage = localStorage.getItem('novaDocumentacao')

    if (valorLocalStorage) {
      this.loadDocumentacao = JSON.parse(valorLocalStorage);

      this.sections = this.loadDocumentacao.sections

      console.log('Objeto do localStorage:', this.loadDocumentacao);
    } else {
      console.log('Nenhum valor encontrado no localStorage.');
    }
  }
}
