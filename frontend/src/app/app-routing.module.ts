// import componenets to be routed 
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/pages/home/home.component';
import { AskQuestionComponent } from './modules/questions/pages/ask-question/ask-question.component';
import { QuestionComponent } from './modules/questions/pages/question/question.component';
import { AllQuestionsComponent } from './modules/questions/pages/all-questions/all-questions.component';


//  path is the "url", used with <a routerLink= 
const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: 'ask-question', component: AskQuestionComponent},
  {path: 'questions', loadChildren: () => import("./modules/questions/questions.module").then(m => m.QuestionsModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
