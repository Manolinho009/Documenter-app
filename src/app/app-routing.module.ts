import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewDocumentationComponent } from './components/documentation/new-documentation/new-documentation.component';
import { HomeComponent } from './components/home/home.component';
import { EditDocumentationComponent } from './components/documentation/edit-documentation/edit-documentation.component';
import { ViewDocumentationComponent } from './components/documentation/view-documentation/view-documentation.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login' , component: LoginComponent},
  { 
      path: 'documentation/new'
    , component: NewDocumentationComponent
    , canActivate: [AuthGuard]
  },
  { 
      path: 'documentation/edit'
    , component: EditDocumentationComponent
    , canActivate: [AuthGuard]
  },
  { 
      path: 'documentation/view'
    , component: ViewDocumentationComponent
    , canActivate: [AuthGuard]
  },
  { 
    path: '' 
    , component: HomeComponent
    , canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
