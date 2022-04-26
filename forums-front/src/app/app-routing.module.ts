import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ComposeComponent } from './compose/compose.component';
import { UserComponent } from './user/user.component';
import { PostComponent } from './post/post.component';
import { CommentComponent } from './comment/comment.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { EditBioComponent } from './edit-bio/edit-bio.component';
import { SearchComponent } from './search/search.component';
import { EditCommentComponent } from './edit-comment/edit-comment.component'

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'compose', component: ComposeComponent },
  { path: 'user/:user', component: UserComponent},
  { path: 'post/:id', component: PostComponent},
  { path: 'comment/:id', component: CommentComponent},
  { path: 'edit-post/:id', component: EditPostComponent},
  { path: 'search/:query', component: SearchComponent},
  { path: 'edit-comment/:id', component: EditCommentComponent },
  { path: 'edit-bio/:id', component: EditBioComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
