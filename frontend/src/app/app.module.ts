import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';

import { HttpClientModule } from '@angular/common/http';

import { MatToolbarModule } from '@angular/material/toolbar';

import { CoreModule } from './core/core.module';
import { HomeModule } from './modules/home/home.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { FoundErrorComponent } from './layout/found-error/found-error.component';
import { ServerErrorComponent } from './layout/server-error/server-error.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AuthInterceptorProvider } from './core/interceptors/auth.interceptor';
import { AuthenticationService } from './core/services/authentication.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    FoundErrorComponent,
    ServerErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,

    // core & shared module
    CoreModule,

    // my modules
    HomeModule,
    QuestionsModule

  ],
  providers: [
    AuthenticationService,
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    AuthInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
