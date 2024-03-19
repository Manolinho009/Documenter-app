import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDowloadDocumentation]'
})
export class DowloadDocumentationDirective {

  constructor(private el: ElementRef) { }

  getHtmlContent(): string {
    return this.el.nativeElement.outerHTML;
  }
}
