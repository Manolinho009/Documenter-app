import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ScrollService } from '../../../services/scroll.service';
import { StorageAcessService } from '../../../services/storage-acess.service';
import { DownloadPageService } from '../../../services/download-page.service';
import { Documentation } from '../../../models/documentation';
import { DocumentationService } from '../../../services/api/documentation.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-documentation',
  templateUrl: './view-documentation.component.html',
  styleUrl: './view-documentation.component.css'
})
export class ViewDocumentationComponent implements OnInit{


  @Input() abas:any[] = []
  @Input() loadDocumentacao:Documentation = this.storageAcessService.changeStorage()

  caminhoAtual:any = location.href
  
  constProc:any = 0
  constTable:any = 0


  constructor(
    private scrollService: ScrollService, 
    private storageAcessService:StorageAcessService,
    private changeDetectorRef:ChangeDetectorRef,
    private documentationService:DocumentationService,
    private thisRoute: ActivatedRoute
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
    this.abas = this.loadDocumentacao.abas
  }
 
  ngOnInit():void {

    
    this.thisRoute.params.subscribe(params => {
      let id = params['id'];
      console.log(id, 'catapimbas');
      
      const retorno = this.documentationService.getDocumentation(new Documentation({id: id}));
        retorno.subscribe(
          response=>{

            console.log(response, 'carambolas');
            
            this.loadDocumentacao = new Documentation(
              response
            )

          
            this.loadDocumentacao=this.storageAcessService.changeStorage()
            this.abas = this.loadDocumentacao.abas


            this.abas.map((value)=>{ 
              
              if(value.tipo == 1){
                this.constTable = 1
              }
              if(value.tipo == 2){
                this.constProc = 1
              }
            
            });
            // loadDocumentacaoStorage = response
          },
          error=>{
            console.log(error, 'carambolas');

          }
        )
    });
  };
    
}
