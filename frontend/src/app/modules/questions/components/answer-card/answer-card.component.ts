import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Answer } from 'src/app/shared/answer.interface';
import { Comment } from 'src/app/shared/comment.interface';
import { QuestionsService } from '../../services/questions.service';

@Component({
  selector: 'app-answer-card',
  templateUrl: './answer-card.component.html',
  styleUrls: ['./answer-card.component.scss']
})
export class AnswerCardComponent implements OnInit {
  @Input() answer!: Answer;
  @Input() questionAuthor: string = ""
  @Input() isAcceptedAnswer: boolean = false

  @Output() deleted = new EventEmitter<string>();
  @Output() acceptedAsAnswer = new EventEmitter<string>();

  votes: number = 0
  currentVote: number = 0

  constructor(private questionsService: QuestionsService, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.votes = Object.keys(this.answer.upvotes).length - Object.keys(this.answer.downvotes).length
    this.currentVote = this.answer.upvotes[this.authService.userId] ? 1 : (this.answer.downvotes[this.authService.userId] ? -1 : 0)
  }

  /**
* Allows the user to upvote or downvote an answer by providing a value of either 1 or -1.
* 
* @param value The value to add to the vote count. If positive, the user is upvoting the answer, if negative the user is downvoting the answer.
*/
  vote(value: number) {

    // Store the userId in a local variable
    const userId = this.authService.userId

    delete this.answer.upvotes[userId]
    delete this.answer.downvotes[userId]

    if (value > 0) this.answer.upvotes[userId] = true
    if (value < -1) this.answer.downvotes[userId] = true

    // Call the voteQuestion method on the answer service to update the database
    this.currentVote = value

    // Call the voteQuestion method on the answer service to update the database
    this.questionsService.voteAnswer(this.answer._id, this.answer.question, value).subscribe()
  }

  acceptAsAnswer(){
    this.acceptedAsAnswer.emit(this.answer._id)
  }

  delete(){
    this.deleted.emit(this.answer._id)
  }


  addComment(comment: Comment){
    this.answer.comments.push(comment)
  }
}
