import { Component, Input, OnInit } from '@angular/core';
import { Answer } from 'src/app/shared/answer.interface';

@Component({
  selector: 'app-answer-card',
  templateUrl: './answer-card.component.html',
  styleUrls: ['./answer-card.component.scss']
})
export class AnswerCardComponent implements OnInit {
  @Input() answer!: Answer;

  votes: number = 0
  ngOnInit(): void {    
    this.votes = Object.keys(this.answer.upvotes).length - Object.keys(this.answer.downvotes).length
  }
}
