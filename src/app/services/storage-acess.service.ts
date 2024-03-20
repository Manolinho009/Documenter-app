import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageAcessService {

  constructor() { }

 
  updateStorage(loadDocumentacao:any){
    localStorage.setItem('novaDocumentacao',JSON.stringify(loadDocumentacao))
  }

  changeStorage(){
    console.log('era para funcionar');
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
