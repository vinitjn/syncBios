import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { PostTilesComponent } from './post-tiles/post-tiles.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SyncTreeDataComponent } from './sync-tree-data/sync-tree-data.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { YoutubeVidComponent } from './youtubevid/youtube-vid/youtube-vid.component';
import { AboutMeComponent } from './about-me/about-me.component';


const routes: Routes = [
  {path:"home", component: LoginComponent},
  {path:"login", component: HomeComponent},
  {path:'loginform', component: LoginFormComponent},
  {path:'posttiles', component: PostTilesComponent},
  {path:"dashboard", component:DashboardComponent},
  {path:"synctrees/:id", component: SyncTreeDataComponent},
  {path:"analytics", component: AnalyticsComponent},
  {path:"youtub", component: YoutubeVidComponent},
  {path:"aboutme", component: AboutMeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
