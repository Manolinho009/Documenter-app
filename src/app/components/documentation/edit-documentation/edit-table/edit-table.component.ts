import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-edit-table',
  templateUrl: './edit-table.component.html',
  styleUrl: './edit-table.component.css'
})


export class EditTableComponent {
  
  @Output() onDeleteTable: EventEmitter<any> = new EventEmitter();
  @Output() onEditTable: EventEmitter<EditTableComponent> = new EventEmitter();

  @Input() viewOnly:any = false
  @Input() titulo:any = ''
  @Input() descricaoTabela:any = ''
  @Input() dh_alteracao:any = ''
  @Input() index:any 

  @Input() colunas:any[] = []

  editMode:any = false;
  coluna:any = {
    nome:'',
    tipo:'',
    formato:'',
    tamanho:'',
    descricao:'',
    marcacao:'',
    exemplo:''
  }

  editIndex:any 

  enableEditMode(index:any) {
    this.editMode = true;
    this.coluna = this.colunas[index]
    this.editIndex = index
  }

  disableEditMode(event: any) {
    this.saveChanges(event)
  }

  saveChanges(event: any) {
    this.editMode = false;
    
    const descricaoTabela = event.descricaoTabela != undefined ? event.descricaoTabela.target.value : this.descricaoTabela
    const titulo = event.titulo != undefined ? event.titulo.target.value : this.titulo
    
    const descricao = event.descricao != undefined ? event.descricao.target.value : this.coluna.descricao
    const nome = event.nome != undefined ? event.nome.target.value : this.coluna.nome  
    const tipo = event.tipo != undefined ? event.tipo.target.value : this.coluna.tipo 
    const formato = event.formato != undefined ? event.formato.target.value : this.coluna.formato 
    const tamanho = event.tamanho != undefined ? event.tamanho.target.value : this.coluna.tamanho 
    const exemplo = event.exemplo != undefined ? event.exemplo.target.value : this.coluna.exemplo 
    const marcacao = event.marcacao != undefined ? event.marcacao.target.value : this.coluna.marcacao 
    // Salvar as alterações
    this.coluna = {
      nome:nome,
      tipo:tipo,
      formato:formato,
      tamanho:tamanho,
      descricao:descricao,
      marcacao:marcacao,
      exemplo:exemplo
    };

    this.titulo = titulo
    console.log(descricaoTabela);
    
    this.descricaoTabela = descricaoTabela
    this.colunas[this.editIndex] = this.coluna

    this.onEditTable.emit(this);
  }


  deleteThisTable(){
    this.onDeleteTable.emit(this.index)
  }

  addColuna(){
    if(this.coluna.nome == '' || this.coluna.tipo == ''){
      return
    }
    this.colunas.push(this.coluna)

    this.onEditTable.emit(this);
  }

  dellColuna(index:any){
    this.colunas.splice(index,1)
    this.onEditTable.emit(this);
  }

}
