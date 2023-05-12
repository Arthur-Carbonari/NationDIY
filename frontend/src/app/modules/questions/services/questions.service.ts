import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from 'src/app/shared/question.interface';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private httpClient: HttpClient) { }

  getQuestions(): Observable<Question[]>{
    return this.httpClient.get<any>('api/questions')
  }

  getQuestionById(questionId: string): Observable<Question| null>{
    return this.httpClient.get<any>(`api/questions/${questionId}`)
  }

  voteQuestion(questionId: string, value: number): void {
    this.httpClient.patch<any>(`api/questions/${questionId}/vote`, { value }).subscribe();
  }

  answerQuestion(questionId: string, answerBody: string){
    return this.httpClient.post<any>(`api/questions/${questionId}/answers`, { body: answerBody });
  }

  getQuestionAnswers(questionId: string){
    return this.httpClient.get<any[]>(`api/questions/${questionId}/answers`)
  }
}
