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
import { ModalFormsModule } from './modules/modal-forms/modal-forms.module';
import { HomeModule } from './modules/home/home.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { FoundErrorComponent } from './layout/found-error/found-error.component';
import { ServerErrorComponent } from './layout/server-error/server-error.component';

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
    ModalFormsModule,
    HomeModule,
    QuestionsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
