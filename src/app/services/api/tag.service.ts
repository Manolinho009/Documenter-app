import { Injectable } from '@angular/core';
import { GlobalVariables } from '../../global-variables';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Tag } from '../../models/tag';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private apiUrl = GlobalVariables.BASE_API_URL+'/tag';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }


  createTag(tag:Tag){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.cookieService.get('token')
      })
    };
    
    return this.http.post<any>(this.apiUrl+'/create', tag, httpOptions);

  }
}
