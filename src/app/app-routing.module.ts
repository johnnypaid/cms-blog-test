import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogViewComponent } from './blog-view/blog-view.component';
import { BlogComponent } from './blog/blog.component';
import { LoginComponent } from './form/login/login.component';
import { ManageBlogComponent } from './form/manage-blog/manage-blog.component';
import{ HomeComponent } from './home/home.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './service/auth-guard.service';

const routes: Routes = [
  {path:'blog/manage', component: ManageBlogComponent, canActivate: [AuthGuard]},
  {path:'blog/title/:title', component: BlogViewComponent},
  {path: 'blog', component: BlogComponent},
  {path: 'login', component: LoginComponent},
  {path: '', component: HomeComponent},
  {path:'**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
