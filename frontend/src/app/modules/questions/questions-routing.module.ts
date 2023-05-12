import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllQuestionsComponent } from './pages/all-questions/all-questions.component';
import { SingleQuestionComponent } from './pages/single-question/single-question.component';

const routes: Routes = [
  {path: "", component: AllQuestionsComponent},
  {path: ":id", component: SingleQuestionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionsRoutingModule { }
