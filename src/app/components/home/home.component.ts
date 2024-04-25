import { Component, OnInit } from '@angular/core';
import { StorageAcessService } from '../../services/storage-acess.service';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';

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
    , public loginService: LoginService
  ){}

  carregarDocumentacao(documentation:any){
    this.storageAcessService.updateStorage(documentation)
    this.router.navigate(['/documentation/edit'])
  }

  ngOnInit(): void {
    const documentationList = this.storageAcessService.listDocumentations()
    this.listDocumentations = Object.keys(documentationList).map((key)=>{return documentationList[key]})
    
    console.log(this.listDocumentations);
    console.log(this.loginService.getUser());
    
  }


  redirectTo(goto:string){
    this.router.navigate([goto])
  }
}
