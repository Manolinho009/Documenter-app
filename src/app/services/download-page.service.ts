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

        <script
        src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
        integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
        crossorigin="anonymous"
        ></script>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js"
          integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy"
          crossorigin="anonymous"
        ></script>
        
        <script>
        function getRouteParam(paramName) {
          const urlParams = new URLSearchParams(window.location.search);
          return urlParams.get(paramName);
        }
        function scrollToId(id) {
          var element = document.getElementById(id);
          if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
          }
        }

        
        document.addEventListener('DOMContentLoaded', function() {
            
            var buttons = document.querySelectorAll('button[aria-label]');
            buttons.forEach(function(button) {
                button.addEventListener('click', function() {
                    scrollToElement(this);
                });
            });

            var goTo = getRouteParam('to')
            if(goTo){
              scrollToId(goTo)
            }
            
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
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossorigin="anonymous"
        />
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
