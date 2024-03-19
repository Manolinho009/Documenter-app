import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DowloadDocumentationService {

  
  constructor() {}

  downloadPage(htmlContent: string) {
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'pagina_renderizada.html';

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    window.URL.revokeObjectURL(url);
  }

}
