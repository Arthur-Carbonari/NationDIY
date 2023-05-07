import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import {MatButtonModule } from '@angular/material/button';
import { AskQuestionComponent } from './components/ask-question/ask-question.component';
import { QuestionComponent } from './components/question/question.component';

import { CoreModule } from './core/core.module';
import { ModalFormsModule } from './modules/modal-forms/modal-forms.module';
import { LoginModalComponent } from './modules/modal-forms/components/login-modal/login-modal.component';
import { SignupModalComponent } from './modules/modal-forms/components/signup-modal/signup-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginModalComponent,
    SignupModalComponent,
    AskQuestionComponent,
    QuestionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,

    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,

    // core & shared module
    CoreModule,

    ModalFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
