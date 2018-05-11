import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { MiganetService } from './Service/miganet.service';
import { Ng4LoadingSpinnerModule,Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { RouterModule, Router } from '@angular/router';
//import { Location } from '@angular/common';

//import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    //LoadingBarHttpClientModule,
     Ng4LoadingSpinnerModule.forRoot(),
    
    BrowserModule,FormsModule,
    HttpClientModule, HttpModule,RouterModule.forRoot([])
  ],
  providers: [MiganetService,Ng4LoadingSpinnerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
