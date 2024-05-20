import { Injectable } from '@angular/core';
import { Documentation } from '../models/documentation';

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
    try {
      localStorage.setItem(key,JSON.stringify(value))
    } catch(e:any) {
      if (e.code === 22) {
        console.log('Local Storage está cheio');
      }
    }


    
  }

  addDocumentationList(documentation:any){
    let docs = this.listDocumentations()

    docs[documentation.titulo] = documentation

    try {
      localStorage.setItem('listaDocumentacoes',JSON.stringify(docs))
    } catch(e:any) {
      if (e.code === 22) {
        console.log('Local Storage está cheio');
      }
    }
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
 
  updateStorage(loadDocumentacao:Documentation){
    try {
      localStorage.setItem('novaDocumentacao',JSON.stringify(loadDocumentacao))
    } catch(e:any) {
      if (e.code === 22) {
        console.log('Local Storage está cheio');
      }
    }
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
