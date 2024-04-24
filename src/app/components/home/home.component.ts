import { Component, OnInit } from '@angular/core';
import { StorageAcessService } from '../../services/storage-acess.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {


  listDocumentations : any = []

  constructor(
    private storageAcessService : StorageAcessService
    , private router: Router
  ){}

  carregarDocumentacao(documentation:any){
    this.storageAcessService.updateStorage(documentation)
    this.router.navigate(['/documentation/edit'])
  }

  ngOnInit(): void {
    const documentationList = this.storageAcessService.listDocumentations()
    this.listDocumentations = Object.keys(documentationList).map((key)=>{return documentationList[key]})
    console.log(this.listDocumentations);
    
  }

}
