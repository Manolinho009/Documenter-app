import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Documentation } from '../../components/documentation/documentation';
import { GlobalVariables } from '../../global-variables';

@Injectable({
  providedIn: 'root'
})
export class DocumentationService {
  private apiUrl = GlobalVariables.BASE_API_URL+'/documentation';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }


  updateDocumentation(documentation:Documentation){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.cookieService.get('token')
      })
    };

    return this.http.put<any>(this.apiUrl+'/update', documentation, httpOptions);

  }

  createDocumentation(documentation:Documentation){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.cookieService.get('token')
      })
    };
    
    return this.http.post<string>(this.apiUrl+'/create', documentation, httpOptions);

  }

  deleteDocumentation(documentation:Documentation){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.cookieService.get('token')
      })
    };
    
    return this.http.delete<string>(this.apiUrl+'/delete/'+documentation.titulo,httpOptions);

  }

  listDocumentations(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.cookieService.get('token')
      })
    };

    return this.http.post< any >(this.apiUrl+'/user/all',{"user":this.cookieService.get('user')}, httpOptions );
 
  }

  listTags(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.cookieService.get('token')
      })
    };

    return this.http.get< any >(this.apiUrl+'/tags/all', httpOptions );
 
  }

}
