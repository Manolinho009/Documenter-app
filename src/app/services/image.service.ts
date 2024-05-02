import { Injectable } from '@angular/core';
import { DataUrl, NgxImageCompressService } from 'ngx-image-compress';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private imageCompress: NgxImageCompressService
  ) { }

  public imagemReduzida: any = undefined;
  public imagemOriginal: any = undefined;
  public reduceFile: any = undefined;

  file: any;
  localCompressedURl: any;
  sizeOfOriginalImage: any;
  sizeOFCompressedImage: any;
  


  processImage(fileInput:any, handler:any = (event:any)=>{return event.target.result}){
    const file: File = fileInput.files[0];
    console.log(file, 'asasisija');
    
    const reader = new FileReader();

    reader.addEventListener("loadstart", handler);
    reader.addEventListener("load", handler);
    reader.addEventListener("loadend", handler);
    reader.addEventListener("progress", handler);
    reader.addEventListener("error", handler);
    reader.addEventListener("abort", handler);

    reader.readAsDataURL(file);
  }


  gerarFile(file:any){
      const maxSizeInBytes = 5000 / (1024 * 1024); // 500 KB
      const originalSizeInBytes = this.imageCompress.byteCount(file) / (1024 * 1024)
      
      if (originalSizeInBytes <= maxSizeInBytes) {
        console.log('É Menor que o limite');
        const compress = this.compressFile(file).then((result)=>{
          return result
        })
        return compress
        
      }else{
        console.log('É Maior que o limite');
        const compress = this.compressFile(file,20).then((result)=>{
          return result
        })
        return compress
      }

  }

  async compressFile(image: any, quality = 100) {
    const orientation = -1;
    return this.imageCompress.compressFile(image, orientation, quality, quality) ;
      
    }

  dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }
    return new Blob([arrayBuffer], { type: 'image/jpeg' });
  }

}
