import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { DashboardComponent, DialogOverviewExampleDialog } from './dashboard/dashboard.component';
import { PostTilesComponent } from './post-tiles/post-tiles.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { AddImageDialog, SocialMediaShareLinks, StyleDialog, SyncTreeDataComponent, SyncTreeDataDialog, formDialog } from './sync-tree-data/sync-tree-data.component';
import { SyncTreeServicesService } from './Services/sync-tree-services.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AnalyticsComponent } from './analytics/analytics.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { HelloComponent, YoutubePlayerExample } from './sync-tree-data/hello.component';
import { YoutubeVidComponent } from './youtubevid/youtube-vid/youtube-vid.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { AboutMeComponent } from './about-me/about-me.component';
import { FormsDataComponent } from './forms-data/forms-data.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    LoginFormComponent,
    DashboardComponent,
    PostTilesComponent,
    DialogOverviewExampleDialog,
    SyncTreeDataComponent,
    SyncTreeDataDialog,
    SocialMediaShareLinks,
    AnalyticsComponent,
    formDialog,
    YoutubePlayerExample,
    HelloComponent,
    YoutubeVidComponent,
    AddImageDialog,
    StyleDialog,
    AboutMeComponent,
    FormsDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    HttpClientModule,
    NgxChartsModule,
    YouTubePlayerModule,
    CommonModule,
    DragDropModule
    
  ],
  entryComponents:[
    DialogOverviewExampleDialog,
    SyncTreeDataDialog,
    SocialMediaShareLinks,
    formDialog,
    AddImageDialog,
    StyleDialog
  ],
  providers: [SyncTreeServicesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
