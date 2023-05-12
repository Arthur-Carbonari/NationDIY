// import core angular services
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

// question interface import
import { Question } from "../../../../shared/question.interface"
import { QuestionsService } from '../../services/questions.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-all-questions',
  templateUrl: './all-questions.component.html',
  styleUrls: ['./all-questions.component.scss']
})
export class AllQuestionsComponent implements AfterViewInit {

  questions!: Observable<Question[]>

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private questionsService: QuestionsService, private route: ActivatedRoute) { }
  
  ngAfterViewInit(): void {
    this.changePage()

    this.route.queryParams.subscribe(() => {
      this.changePage();
    });
  }

  changePage(){
    const pageNumber = this.paginator.pageIndex
    const pageSize = this.paginator.pageSize
    const tag = this.route.snapshot.queryParamMap.get('tag') || "";
    // const sort    
    
    this.questions = this.questionsService.queryQuestions(pageNumber, pageSize, tag)
  }


}
