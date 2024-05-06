import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ScrollService } from '../../../services/scroll.service';
import { StorageAcessService } from '../../../services/storage-acess.service';
import { DownloadPageService } from '../../../services/download-page.service';

@Component({
  selector: 'app-view-documentation',
  templateUrl: './view-documentation.component.html',
  styleUrl: './view-documentation.component.css'
})
export class ViewDocumentationComponent implements OnInit{


  @Input() sections:any[] = []
  @Input() loadDocumentacao:any = this.storageAcessService.changeStorage()

  caminhoAtual:any = location.href
  
  constProc:any = 0
  constTable:any = 0


  constructor(
    private scrollService: ScrollService, 
    private storageAcessService:StorageAcessService,
    private changeDetectorRef:ChangeDetectorRef
    ) { }
  

  prepararIndice(indice:any){
    const gerarHash = (texto:string) => texto.split('').reduce((prev, curr) =>
      Math.imul(31, prev) + curr.charCodeAt(0) | 0, 0).toString(16);

    return  gerarHash(indice);
  }
  
  recarregarViewComponent() {
    this.changeDetectorRef.detectChanges(); 
  }

  scrollToElement(elementId: string): void {
    this.scrollService.scrollToElement(elementId);
  }

  reload(){
    this.loadDocumentacao=this.storageAcessService.changeStorage()
    this.sections = this.loadDocumentacao.sections
  }
 
  ngOnInit():void {
    this.loadDocumentacao=this.storageAcessService.changeStorage()
    this.sections = this.loadDocumentacao.sections


    this.sections.map((value)=>{ 
      
      if(value.tipo == 1){
        this.constTable = 1
      }
      if(value.tipo == 2){
        this.constProc = 1
      }
    
    });
  };
    
}
