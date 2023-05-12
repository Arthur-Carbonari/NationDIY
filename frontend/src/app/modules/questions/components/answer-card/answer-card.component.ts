import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-answer-card',
  templateUrl: './answer-card.component.html',
  styleUrls: ['./answer-card.component.scss']
})
export class AnswerCardComponent implements OnInit {
  @Input() answer!: any;

  votes: number = 0
  ngOnInit(): void {    
    this.votes = Object.keys(this.answer.upvotes).length - Object.keys(this.answer.downvotes).length
  }
}
