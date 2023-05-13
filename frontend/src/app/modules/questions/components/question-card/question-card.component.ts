import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Question } from 'src/app/shared/question.interface';
import { QuestionsService } from '../../services/questions.service';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss']
})
export class QuestionCardComponent implements OnInit {

  @Input() question!: Question;

  votes: number = 0
  currentVote: number = 0

  constructor(private route: ActivatedRoute, private questionsService: QuestionsService, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.votes = Object.keys(this.question.upvotes).length - Object.keys(this.question.downvotes).length

    this.currentVote = this.question.upvotes[this.authService.userId] ? 1 : (this.question.downvotes[this.authService.userId] ? -1 : 0)
  }

  /**
* Allows the user to upvote or downvote a question by providing a value of either 1 or -1.
* 
* @param value The value to add to the vote count. If positive, the user is upvoting the question, if negative the user is downvoting the question, if 0 the user the removing his vote
*/
  vote(value: number) {

    // Store the userId in a local variable
    const userId = this.authService.userId

    delete this.question.upvotes[userId]
    delete this.question.downvotes[userId]

    if (value > 0) this.question.upvotes[userId] = true
    if (value < -1) this.question.downvotes[userId] = true

    // Call the voteQuestion method on the question service to update the database
    this.currentVote = value
    this.questionsService.voteQuestion(this.question._id, value).subscribe()
  }
}
