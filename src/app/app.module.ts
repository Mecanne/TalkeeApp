import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { FeedComponent } from './components/feed/feed.component';
import { SearchComponent } from './components/search/search.component';
import { PostComponent } from './components/post/post.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingsComponent } from './components/profile/settings/settings.component';
import { LogoutComponent } from './components/logout/logout.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

import { ToastrModule } from 'ngx-toastr';
import { PostService } from './services/post.service';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';
import { FollowersComponent } from './components/followers/followers.component';
import { FollowsComponent } from './components/follows/follows.component';
import { RefreshSearchComponent } from './components/refresh-search/refresh-search.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    FeedComponent,
    SearchComponent,
    PostComponent,
    ProfileComponent,
    SettingsComponent,
    LogoutComponent,
    FooterComponent,
    NavbarComponent,
    ViewProfileComponent,
    FollowersComponent,
    FollowsComponent,
    RefreshSearchComponent,
    ProfileCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    ScrollingModule,
    InfiniteScrollModule
  ],
  providers: [
    AuthService,
    UserService,
    PostService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
