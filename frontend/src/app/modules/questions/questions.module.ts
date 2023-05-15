import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Angular material imports
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';


import { QuestionsRoutingModule } from './questions-routing.module';
import { AllQuestionsComponent } from './pages/all-questions/all-questions.component';
import { QuestionCardComponent } from './components/question-card/question-card.component';
import { NgxEditorModule } from 'ngx-editor';
import { SharedModule } from 'src/app/shared/shared.module';
import { PostAnswerFormComponent } from './components/post-answer-form/post-answer-form.component';
import { AnswerCardComponent } from './components/answer-card/answer-card.component';
import { QuestionPreviewComponent } from './components/question-preview/question-preview.component';
import { SingleQuestionComponent } from './pages/single-question/single-question.component';
import { VoteboxComponent } from './components/votebox/votebox.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { CoreModule } from 'src/app/core/core.module';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import { PostCommentExpansionComponent } from './components/post-comment-expansion/post-comment-expansion.component';
import { QuestionsTableComponent } from './components/questions-table/questions-table.component';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { Q } from '@angular/cdk/keycodes';


@NgModule({
  declarations: [
    AllQuestionsComponent,
    QuestionCardComponent,
    PostAnswerFormComponent,
    AnswerCardComponent,
    QuestionPreviewComponent,
    SingleQuestionComponent,
    VoteboxComponent,
    UserCardComponent,
    PostCommentExpansionComponent,
    QuestionsTableComponent
  ],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    SharedModule,
    CoreModule,

    //tags input imports
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatExpansionModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatSortModule,

    // Rich Text-Editor
    NgxEditorModule,

    //Card
    MatCardModule,

    //Paginatior 
    MatPaginatorModule
  ],
  exports: [
    QuestionPreviewComponent,
  ]
})
export class QuestionsModule { }
