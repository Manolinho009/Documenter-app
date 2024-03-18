import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewDocumentationComponent } from './components/documentation/new-documentation/new-documentation.component';
import { HomeComponent } from './components/home/home.component';
import { EditDocumentationComponent } from './components/documentation/edit-documentation/edit-documentation.component';

const routes: Routes = [
  { path: 'documentation/new' , component: NewDocumentationComponent},
  { path: 'documentation/edit' , component: EditDocumentationComponent},
  { path: '' , component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
