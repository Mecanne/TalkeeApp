import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingsComponent } from './components/profile/settings/settings.component';
import { SearchComponent } from './components/search/search.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AuthService } from './services/auth.service';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';
import { FollowsComponent } from './components/follows/follows.component';
import { FollowersComponent } from './components/followers/followers.component';
import { TermsComponent } from './components/terms/terms.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthService]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthService] },
  { path: 'profile/:id', component: ViewProfileComponent, canActivate: [AuthService] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthService] },
  { path: 'followers/:id', component: FollowersComponent, canActivate: [AuthService] },
  { path: 'follows/:id', component: FollowsComponent, canActivate: [AuthService] },
  { path: 'search/:query', component: SearchComponent, canActivate: [AuthService] },
  { path: 'terms', component: TermsComponent},
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
