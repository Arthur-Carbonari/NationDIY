// import componenets to be routed 
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { AskQuestionComponent } from './components/ask-question/ask-question.component';
import { QuestionComponent } from './components/question/question.component';

//  path is the "url", used with <a routerLink= 
const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: 'ask-question', component: AskQuestionComponent},
  {path: 'question', component: QuestionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
