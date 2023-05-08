import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';

// Angular material imports
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';;
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';


import { QuestionsRoutingModule } from './questions-routing.module';
import { QuestionComponent } from './pages/question/question.component';
import { AskQuestionComponent } from './pages/ask-question/ask-question.component';
import { TagsInputComponent } from './components/tags-input/tags-input.component';
import { AllQuestionsComponent } from './pages/all-questions/all-questions.component';


@NgModule({
  declarations: [
    QuestionComponent,
    AskQuestionComponent,
    TagsInputComponent,
    AllQuestionsComponent
  ],
  imports: [
    CommonModule,
    QuestionsRoutingModule,

    //tags input imports
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatIconModule,

    //Card
    MatCardModule,
  ]
})
export class QuestionsModule { }
