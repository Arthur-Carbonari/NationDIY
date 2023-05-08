import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionsRoutingModule } from './questions-routing.module';
import { AllQuestionsComponent } from './pages/all-questions/all-questions.component';


@NgModule({
  declarations: [
    AllQuestionsComponent
  ],
  imports: [
    CommonModule,
    QuestionsRoutingModule
  ]
})
export class QuestionsModule { }
