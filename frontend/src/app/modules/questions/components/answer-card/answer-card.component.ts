import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Answer } from 'src/app/shared/answer.interface';
import { QuestionsService } from '../../services/questions.service';

@Component({
  selector: 'app-answer-card',
  templateUrl: './answer-card.component.html',
  styleUrls: ['./answer-card.component.scss']
})
export class AnswerCardComponent implements OnInit {
  @Input() answer!: Answer;
  votes: number = 0

  constructor(private questionsService: QuestionsService, private authService: AuthenticationService){}

  ngOnInit(): void {
    this.votes = Object.keys(this.answer.upvotes).length - Object.keys(this.answer.downvotes).length
  }

  /**
* Allows the user to upvote or downvote an answer by providing a value of either 1 or -1.
* 
* @param value The value to add to the vote count. If positive, the user is upvoting the answer, if negative the user is downvoting the answer.
*/
  vote(value: number) {

    // Return early if the user is not logged in
    if (!this.authService.isLoggedIn) return // change this later to display login form

    // Set the value to either 1 or -1 to represent an upvote or downvote respectively
    value = value > 0 ? 1 : -1

    // Store the userId in a local variable
    const userId = this.authService.userId

    // Select the appropriate vote list depending on whether the user is upvoting or downvoting
    const voteList = value > 0 ? this.answer.upvotes : this.answer.downvotes

    // Select the opposite vote list to potentially remove an opposite vote if one exists
    const oppositeVoteList = value < 0 ? this.answer.upvotes : this.answer.downvotes

    // Check to see if user is removing their vote instead of voting, and if he is we remove their vote
    if (userId in voteList) {
      delete voteList[userId]
      this.votes -= value
      this.questionsService.voteQuestion(this.answer._id, 0)
      return
    }

    // If the user has already voted the opposite way, remove their opposite vote and add their new vote
    if (userId in oppositeVoteList) {
      delete oppositeVoteList[userId]
      this.votes += value
    }

    // Add the user's vote to the appropriate vote list and update the vote count
    voteList[userId] = true
    this.votes += value

    // Call the voteQuestion method on the answer service to update the database
    this.questionsService.voteAnswer(this.answer._id, this.answer.question, value).subscribe()
  }
}
