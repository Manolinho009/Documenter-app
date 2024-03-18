import { Component } from '@angular/core';
import { Documentation } from '../documentation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-documentation',
  templateUrl: './new-documentation.component.html',
  styleUrl: './new-documentation.component.css'
})
export class NewDocumentationComponent {

  titulo:any = '';
  documentacaoModelo:Documentation = new Documentation();

  constructor(private router: Router){}

  criarNovaDocumentacao(){
    console.log(this.titulo);

    this.documentacaoModelo.titulo = this.titulo;

    // Edite o JSON conforme necessário
    localStorage.setItem('novaDocumentacao', 
      JSON.stringify(this.documentacaoModelo)
    );
    this.router.navigate(['/documentation/edit']);
  }

}
