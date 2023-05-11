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

  getQuestionById(id: string): Observable<Question | null>{
    return this.httpClient.get<any>(`api/questions/${id}`)
  }

  upvoteQuestion(questionId: string, userId: string): void {
    const url = `api/questions/${questionId}/upvote`;
    this.httpClient.put<any>(url, { userId });
  }

  downvoteQuestion(questionId: string, userId: string): void {
    const url = `api/questions/${questionId}/downvote`;
    this.httpClient.put<any>(url, { userId });
  }
}
