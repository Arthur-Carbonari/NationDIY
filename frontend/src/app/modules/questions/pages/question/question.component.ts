import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Answer } from 'src/app/shared/answer.interface';
import { Question } from 'src/app/shared/question.interface';
import { QuestionsService } from '../../services/questions.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {

  question!: Question
  answers!: Observable<Answer[]>

  votes: number = 0

  constructor(private route: ActivatedRoute, private questionsService: QuestionsService, private authService: AuthenticationService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.questionsService.getQuestionById(id).subscribe(question => {

      if (!question) return

      this.question = question
      this.votes = Object.keys(question.upvotes).length - Object.keys(question.downvotes).length

      this.answers = this.questionsService.getQuestionAnswers(id)
    })
  }

  /**
 * Allows the user to upvote or downvote a question by providing a value of either 1 or -1.
 * 
 * @param value The value to add to the vote count. If positive, the user is upvoting the question, if negative the user is downvoting the question.
 */
  vote(value: number) {

    // Return early if the user is not logged in
    if (!this.authService.isLoggedIn) return // change this later to display login form

    // Return early if there is no question to vote on
    if (!this.question) return

    // Set the value to either 1 or -1 to represent an upvote or downvote respectively
    value = value > 0 ? 1 : -1

    // Store the userId in a local variable
    const userId = this.authService.userId

    // Select the appropriate vote list depending on whether the user is upvoting or downvoting
    const voteList = value > 0 ? this.question.upvotes : this.question.downvotes

    // Select the opposite vote list to potentially remove an opposite vote if one exists
    const oppositeVoteList = value < 0 ? this.question.upvotes : this.question.downvotes

    // Check to see if user is removing their vote instead of voting, and if he is we remove their vote
    if (userId in voteList) {
      delete voteList[userId]
      this.votes -= value
      this.questionsService.voteQuestion(this.question._id, 0).subscribe()
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

    // Call the voteQuestion method on the question service to update the database
    this.questionsService.voteQuestion(this.question._id, value).subscribe()
  }


  dateStringToLocale(dateString: string) {
    return new Date(dateString).toLocaleString()
  }

}
