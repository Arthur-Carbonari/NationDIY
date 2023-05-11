import { Component, Input, OnInit } from '@angular/core';
import { Question } from 'src/app/shared/question.interface';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss']
})
export class QuestionCardComponent implements OnInit {
  
  @Input() question!: Question;

  votes: number = 0
  totalAnswers: number = 0
  
  ngOnInit(): void {    
    this.votes = Object.keys(this.question.upvotes).length - Object.keys(this.question.downvotes).length
    this.totalAnswers = this.question.answers.length
  }
}
