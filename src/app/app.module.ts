import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
<<<<<<< HEAD
import { ListTasksComponent } from './pages/home/list-tasks/list-tasks.component';
import { HttpClientModule } from '@angular/common/http';
=======
import { ListTasksComponent } from './pages/home/task/list-tasks/list-tasks.component';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
>>>>>>> 051e33c10e96b76ba9b466eaf0e65fbe9ea15038

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
<<<<<<< HEAD
  imports: [BrowserModule, HttpClientModule, IonicModule.forRoot(), AppRoutingModule],
=======
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
>>>>>>> 051e33c10e96b76ba9b466eaf0e65fbe9ea15038
  providers: [
    StatusBar,
    SplashScreen,
    DatePipe,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
