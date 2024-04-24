import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewDocumentationComponent } from './components/documentation/new-documentation/new-documentation.component';
import { HomeComponent } from './components/home/home.component';
import { EditDocumentationComponent } from './components/documentation/edit-documentation/edit-documentation.component';
import { ViewDocumentationComponent } from './components/documentation/view-documentation/view-documentation.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: 'login' , component: LoginComponent},
  { path: 'documentation/new' , component: NewDocumentationComponent},
  { path: 'documentation/edit' , component: EditDocumentationComponent},
  { path: 'documentation/view' , component: ViewDocumentationComponent},
  { path: '' , component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
