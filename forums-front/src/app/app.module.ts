import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';
import { ComposeComponent } from './compose/compose.component';
import { FeatureComponent } from './feature/feature.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './shared/services/auth.service';
import { UserComponent } from './user/user.component';
import { PostComponent } from './post/post.component';
import { CommentComponent } from './comment/comment.component';
import { ShortenPipe } from './shorten.pipe';
import { RecentComponent } from './recent/recent.component';
import { LikeComponent } from './like/like.component';
import { LikeButtonComponent } from './like-button/like-button.component';
import { FooterComponent } from './footer/footer.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { EditCommentComponent } from './edit-comment/edit-comment.component';
import { EditBioComponent } from './edit-bio/edit-bio.component';
import { Shorten2Pipe } from './shorten2.pipe'


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    AdminComponent,
    LoginComponent,
    RegisterComponent,
    SearchComponent,
    ComposeComponent,
    FeatureComponent,
    UserComponent,
    PostComponent,
    CommentComponent,
    ShortenPipe,
    RecentComponent,
    LikeComponent,
    LikeButtonComponent,
    FooterComponent,
    EditPostComponent,
    EditCommentComponent,
    EditBioComponent,
    Shorten2Pipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
