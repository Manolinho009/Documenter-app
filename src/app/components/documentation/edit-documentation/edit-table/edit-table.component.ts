import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-edit-table',
  templateUrl: './edit-table.component.html',
  styleUrl: './edit-table.component.css'
})


export class EditTableComponent {
  
  @Output() onDeleteTable: EventEmitter<any> = new EventEmitter();
  @Output() onAddColumn: EventEmitter<any> = new EventEmitter();

  @Input() viewOnly:any = false
  @Input() titulo:any = ''
  @Input() dh_alteracao:any = ''
  @Input() index:any 

  @Input() colunas:any[] = []

  editMode:any = false;
  coluna:any = {
    nome:'',
    tipo:'',
    descricao:''
  }

  editIndex:any 

  enableEditMode(index:any) {
    this.editMode = true;
    this.coluna = this.colunas[index]
    this.editIndex = index
  }

  disableEditMode(event: any) {
    this.editMode = false;
    console.log(event);
    const descricao = event.descricao != undefined ? event.descricao.target.value : this.coluna.descricao
    const nome = event.nome != undefined ? event.nome.target.value : this.coluna.nome  
    const tipo = event.tipo != undefined ? event.tipo.target.value : this.coluna.tipo 
    // Salvar as alterações
    this.coluna = {
      nome:nome,
      tipo:tipo,
      descricao:descricao
    };

    this.colunas[this.editIndex] = this.coluna

    this.onAddColumn.emit(this.colunas);
  }

  saveChanges(event: any) {
    this.editMode = false;
    console.log(event);
    
    const descricao = event.descricao != undefined ? event.descricao.target.value : this.coluna.descricao
    const nome = event.nome != undefined ? event.nome.target.value : this.coluna.nome  
    const tipo = event.tipo != undefined ? event.tipo.target.value : this.coluna.tipo 
    // Salvar as alterações
    this.coluna = {
      nome:nome,
      tipo:tipo,
      descricao:descricao
    };

    this.colunas[this.editIndex] = this.coluna

    this.onAddColumn.emit(this.colunas);
  }


  deleteThisTable(){
    this.onDeleteTable.emit(this.index)
  }
  addColuna(){
    if(this.coluna.nome == '' || this.coluna.tipo == ''){
      return
    }
    this.colunas.push(this.coluna)

    this.onAddColumn.emit(this.colunas);
  }

}
