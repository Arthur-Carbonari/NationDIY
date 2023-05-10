import { Component, Input, OnInit } from '@angular/core';
import { Question } from 'src/app/shared/question.interface';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss']
})
export class QuestionCardComponent implements OnInit {
  
  @Input() question!: Question;

  totalVotes: number = 0
  totalAnswers: number = 0
  
  ngOnInit(): void {    

    for (let i = 0; i < this.question.votes.length; i++) {
      this.totalVotes += this.question.votes[i].value
    }
    this.totalAnswers = this.question.answers.length
    
  }
}
