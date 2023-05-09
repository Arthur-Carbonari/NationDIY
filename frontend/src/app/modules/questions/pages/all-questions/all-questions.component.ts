// import core angular services
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClient, HttpParams } from "@angular/common/http";

// question interface import
import { Question } from "../../../../shared/question.interface"


@Component({
  selector: 'app-all-questions',
  templateUrl: './all-questions.component.html',
  styleUrls: ['./all-questions.component.scss']
})

export class AllQuestionsComponent implements OnInit {

  constructor(private http: HttpClient) { }

  // store questions in a array 
  questions: Question[] = []



  loading = false;

  // load life cycle 
  ngOnInit(): void {

    this.loadQuestions();

  }

  // @ViewChild(MatPaginator)
  // paginator: MatPaginator; 

  // load all questions 
  loadQuestions(): void {

    this.loading = true;

    this.http.get<any>('api/questions').subscribe(questions => (this.questions = questions)); 

  }



}
