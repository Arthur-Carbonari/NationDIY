import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
import {MatPaginatorModule} from '@angular/material/paginator';


import { QuestionsRoutingModule } from './questions-routing.module';
import { AskQuestionComponent } from './pages/ask-question/ask-question.component';
import { TagsInputComponent } from './components/tags-input/tags-input.component';
import { AllQuestionsComponent } from './pages/all-questions/all-questions.component';
import { QuestionCardComponent } from './components/question-card/question-card.component';
import { NgxEditorModule } from 'ngx-editor';
import { SharedModule } from 'src/app/shared/shared.module';
import { PostAnswerFormComponent } from './components/post-answer-form/post-answer-form.component';
import { AnswerCardComponent } from './components/answer-card/answer-card.component';
import { QuestionPreviewComponent } from './components/question-preview/question-preview.component';
import { SingleQuestionComponent } from './pages/single-question/single-question.component';
import { VoteboxComponent } from './components/votebox/votebox.component';


@NgModule({
  declarations: [
    AskQuestionComponent,
    TagsInputComponent,
    AllQuestionsComponent,
    QuestionCardComponent,
    PostAnswerFormComponent,
    AnswerCardComponent,
    QuestionPreviewComponent,
    SingleQuestionComponent,
    VoteboxComponent
  ],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    SharedModule,

    //tags input imports
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatIconModule,

    // Rich Text-Editor
    NgxEditorModule,

    //Card
    MatCardModule,

    //Paginatior 
    MatPaginatorModule
  ]
})
export class QuestionsModule { }
