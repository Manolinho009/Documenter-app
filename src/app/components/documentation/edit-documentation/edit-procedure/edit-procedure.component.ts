import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-edit-procedure',
  templateUrl: './edit-procedure.component.html',
  styleUrl: './edit-procedure.component.css'
})
export class EditProcedureComponent {

  @Output() onDeleteProcedure: EventEmitter<any> = new EventEmitter();
  @Output() onAddParam: EventEmitter<any> = new EventEmitter();
  @Output() onEditProcedure: EventEmitter<EditProcedureComponent> = new EventEmitter();

  @Input() viewOnly:any = false
  @Input() titulo:any = ''
  @Input() descricaoProcedure:any = ''
  @Input() dh_alteracao:any = ''
  @Input() index:any 

  @Input() params:any[] = []

  editMode:any = false;
  param:any = {
    nome:'',
    tipo:'',
    formato:'',
    tamanho:'',
    descricao:'',
    exemplo:''
  }

  editIndex:any 

  enableEditModeDescricaoTitulo(tipo:any) {
    this.editMode = true;
    // this.editIndex = index
  }
  enableEditMode(index:any) {
    this.editMode = true;
    this.param = this.params[index]
    this.editIndex = index
  }

  disableEditMode(event: any) {
    this.saveChanges(event)
  }

  saveChanges(event: any) {
    this.editMode = false;

    
    const descricaoProcedure = event.descricaoProcedure != undefined ? event.descricaoProcedure.target.value : this.descricaoProcedure
    const titulo = event.titulo != undefined ? event.titulo.target.value : this.titulo

    
    const descricao = event.descricao != undefined ? event.descricao.target.value : this.param.descricao
    const nome = event.nome != undefined ? event.nome.target.value : this.param.nome  
    const tipo = event.tipo != undefined ? event.tipo.target.value : this.param.tipo 
    const formato = event.formato != undefined ? event.formato.target.value : this.param.formato 
    const tamanho = event.tamanho != undefined ? event.tamanho.target.value : this.param.tamanho 
    const exemplo = event.exemplo != undefined ? event.exemplo.target.value : this.param.exemplo 
    // Salvar as alterações
    this.param = {
      nome:nome,
      tipo:tipo,
      formato:formato,
      tamanho:tamanho,
      descricao:descricao,
      exemplo:exemplo
    };

    this.titulo = titulo
    this.descricaoProcedure = descricaoProcedure
    this.dh_alteracao = new Date().toLocaleString()
    this.params[this.editIndex] = this.param
    this.onEditProcedure.emit(this);


  }


  deleteThisTable(){
    this.onDeleteProcedure.emit(this.index)
  }

  addParam(){
    if(this.param.nome == '' || this.param.tipo == ''){
      return
    }
    this.params.push(this.param)

    this.onEditProcedure.emit(this);
  }

  dellParam(index:any){
    this.params.splice(index,1)
    this.onEditProcedure.emit(this);
  }

}
