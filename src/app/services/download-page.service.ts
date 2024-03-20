import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DownloadPageService {

  constructor() { }
  
  salvarHTML() {
    // Obtenha o conteúdo HTML da página atual
    var element = document.getElementById('AllContent');
    
    if(element){
      element.hidden = false
      var html = element.outerHTML
      // Inclua scripts e estilos necessários
      var head = document.head.innerHTML;
  
      var scripts = `
        <!-- Inclua aqui os scripts necessários, como Angular e scripts personalizados -->
        <script>
        document.addEventListener('DOMContentLoaded', function() {
            var buttons = document.querySelectorAll('button[aria-label]');
            buttons.forEach(function(button) {
                button.addEventListener('click', function() {
                    scrollToElement(this);
                });
            });
        });
        
        function scrollToElement(btn) {
            var ariaLabel = btn.getAttribute('aria-label');
            if (ariaLabel) {
                var element = document.getElementById(ariaLabel);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
        </script>
        `;
      var styles = `
        <!-- Inclua aqui os estilos necessários -->
      `;
    
      // Crie o conteúdo final com os scripts e estilos incluídos
      html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          ${head}
          ${styles}
        </head>
        <body>
          ${html}
          ${scripts}
        </body>
        </html>
      `;
    
      // Crie um novo Blob com o conteúdo HTML
      var blob = new Blob([html], { type: 'text/html' });
    
      // Crie um objeto URL a partir do Blob
      var url = URL.createObjectURL(blob);
    
      // Crie um link temporário
      var link = document.createElement('a');
      link.href = url;
      link.download = 'pagina.html'; // Nome do arquivo a ser baixado
    
      // Adicione o link ao corpo do documento
      document.body.appendChild(link);
    
      // Clique no link programaticamente para iniciar o download
      link.click();
    
      // Limpeza: remova o link e revogue o objeto URL
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      element.hidden = true
    }
  }
}
