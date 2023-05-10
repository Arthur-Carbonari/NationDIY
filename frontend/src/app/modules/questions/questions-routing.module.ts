import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllQuestionsComponent } from './pages/all-questions/all-questions.component';
import { QuestionComponent } from './pages/question/question.component';

const routes: Routes = [
  {path: "", component: AllQuestionsComponent},
  {path: ":id", component: QuestionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionsRoutingModule { }
