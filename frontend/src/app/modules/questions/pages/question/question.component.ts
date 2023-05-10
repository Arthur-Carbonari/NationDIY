import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Question } from 'src/app/shared/question.interface';
import { QuestionsService } from '../../services/questions.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {

  question$!: Observable<Question | null>

  constructor(private route: ActivatedRoute, private questionsService: QuestionsService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.question$ = this.questionsService.getQuestionById(id);
  }

  dateStringToLocale(dateString: string){
    return new Date(dateString).toLocaleString()
  }

}
