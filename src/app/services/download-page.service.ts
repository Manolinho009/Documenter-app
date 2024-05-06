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
      var html = element.innerHTML
      // Inclua scripts e estilos necessários
      var head = document.head.innerHTML.replace('<link rel="stylesheet" href="styles.css">','').replace('<script type="module" src="/@vite/client"></script>','');
  
      var scripts = `
        <!-- Inclua aqui os scripts necessários, como Angular e scripts personalizados -->

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
            
            var buttons = document.querySelectorAll('a[aria-label]');
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
          <style>
            .inputEditTable{

              border-style: solid;
              border-width: 0.5px;
              border-color: #6b6b6b60;
              border-radius: 0.2rem;
              }
              .inputEditTable:focus-visible {
                  outline: none;
              }
              button{
                  border: none;
              }
        </style>

        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

        
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
        
      `;
    
      // Crie o conteúdo final com os scripts e estilos incluídos
      html = `
      <!doctype html>
        <html>
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
