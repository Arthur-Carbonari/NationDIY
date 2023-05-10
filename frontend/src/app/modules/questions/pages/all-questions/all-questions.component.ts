// import core angular services
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

// question interface import
import { Question } from "../../../../shared/question.interface"
import { QuestionsService } from '../../services/questions.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-all-questions',
  templateUrl: './all-questions.component.html',
  styleUrls: ['./all-questions.component.scss']
})
export class AllQuestionsComponent implements OnInit {

  questions!: Observable<Question[]>

  constructor(private questionsService: QuestionsService) { }


  /** Runs on init of component life cycle. */ 
  ngOnInit(): void {
    this.questions = this.questionsService.getQuestions();
  }

  // @ViewChild(MatPaginator)
  // paginator: MatPaginator; 
}
