import { Component, Input, OnInit } from '@angular/core';
import { Question } from 'src/app/shared/question.interface';

@Component({
  selector: 'app-question-preview',
  templateUrl: './question-preview.component.html',
  styleUrls: ['./question-preview.component.scss']
})
export class QuestionPreviewComponent implements OnInit {
  
  @Input() question!: Question;

  votes: number = 0
  totalAnswers: number = 0
  
  //  number based on the lenght of the array 
  ngOnInit(): void {    
    this.votes = Object.keys(this.question.upvotes).length - Object.keys(this.question.downvotes).length
    this.totalAnswers = this.question.answers.length
  }
}