import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgxSummernoteModule } from 'ngx-summernote';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { NewDocumentationComponent } from './components/documentation/new-documentation/new-documentation.component';
import { EditDocumentationComponent } from './components/documentation/edit-documentation/edit-documentation.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewDocumentationComponent,
    EditDocumentationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSummernoteModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
