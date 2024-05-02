import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageAcessService {

  constructor() { }


  getValue(key:string){
    const valorLocalStorage = localStorage.getItem(key)

    if (valorLocalStorage) {
      const loadDocumentacao = JSON.parse(valorLocalStorage);
      return loadDocumentacao
    } else {

      return {}
    }

  }
  
  setValue(key:string, value:any){
    localStorage.setItem(key,JSON.stringify(value))
  }

  addDocumentationList(documentation:any){
    let docs = this.listDocumentations()

    docs[documentation.titulo] = documentation

    localStorage.setItem('listaDocumentacoes',JSON.stringify(docs))

  }

  listDocumentations(){
    const valorLocalStorage = localStorage.getItem('listaDocumentacoes')
    if (valorLocalStorage) {
      const loadDocumentacao = JSON.parse(valorLocalStorage);

      return loadDocumentacao
    } else {

      return {}
    }
  }
 
  updateStorage(loadDocumentacao:any){
    localStorage.setItem('novaDocumentacao',JSON.stringify(loadDocumentacao))
  }

  changeStorage(){
    const valorLocalStorage = localStorage.getItem('novaDocumentacao')

    if (valorLocalStorage) {
      const loadDocumentacao = JSON.parse(valorLocalStorage);

      console.log('Objeto do localStorage:', loadDocumentacao);
      return loadDocumentacao
    } else {
      console.log('Nenhum valor encontrado no localStorage.');
      return {}
    }
  }
}
