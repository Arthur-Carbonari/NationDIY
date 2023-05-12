import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Answer } from 'src/app/shared/answer.interface';
import { Question } from 'src/app/shared/question.interface';
import { QuestionsService } from '../../services/questions.service';

@Component({
  selector: 'app-single-question',
  templateUrl: './single-question.component.html',
  styleUrls: ['./single-question.component.scss']
})
export class SingleQuestionComponent {


  question!: Question
  answers!: Observable<Answer[]>

  constructor(private route: ActivatedRoute, private questionsService: QuestionsService, private authService: AuthenticationService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.questionsService.getQuestionById(id).subscribe(question => {

      if (!question) return

      this.question = question

      this.answers = this.questionsService.getQuestionAnswers(id)
    })
  }

  dateStringToLocale(dateString: string) {
    return new Date(dateString).toLocaleString()
  }



}
